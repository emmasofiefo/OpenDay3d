"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { StudentLifeTable } from "../data/StandInfo";

/**
 * Modal panel for student-life categories and their individual clubs.
 *
 * The first screen lists all clubs in the selected category. Selecting a club
 * opens a detail view with description, optional image, optional voice-over,
 * and an optional external link.
 */
type StandTableInfoProps = {
  table: StudentLifeTable | null;
  onClose: () => void;
};

export default function StandTabelInfo({
  table,
  onClose,
}: StandTableInfoProps) {
  const [selectedStandId, setSelectedStandId] = useState<string | null>(null);

  const openAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!table) {
      setSelectedStandId(null);
      return;
    }

    // Always start at the list view when a new student-life category opens.
    setSelectedStandId(null);

    return () => {
      openAudioRef.current?.pause();
      voiceAudioRef.current?.pause();

      if (openAudioRef.current) openAudioRef.current.currentTime = 0;
      if (voiceAudioRef.current) voiceAudioRef.current.currentTime = 0;
    };
  }, [table]);

  const selectedStand = useMemo(() => {
    if (!table || !selectedStandId) return null;
    return table.stands.find((stand) => stand.id === selectedStandId) ?? null;
  }, [table, selectedStandId]);

  useEffect(() => {
    if (!selectedStand) return;

    // Stop previous audio before preparing the new club audio.
    openAudioRef.current?.pause();
    voiceAudioRef.current?.pause();

    if (openAudioRef.current) openAudioRef.current.currentTime = 0;
    if (voiceAudioRef.current) voiceAudioRef.current.currentTime = 0;

    if (selectedStand.openSound) {
      openAudioRef.current = new Audio(selectedStand.openSound);
      openAudioRef.current.volume = 0.35;
      openAudioRef.current.play().catch(() => undefined);
    }

    if (selectedStand.voiceOver) {
      voiceAudioRef.current = new Audio(selectedStand.voiceOver);
      voiceAudioRef.current.volume = 0.8;
    }
  }, [selectedStand]);

  if (!table) return null;

  const playVoiceOver = () => {
    if (!voiceAudioRef.current) return;
    voiceAudioRef.current.currentTime = 0;
    voiceAudioRef.current.play().catch(() => undefined);
  };

  const stopVoiceOver = () => {
    if (!voiceAudioRef.current) return;
    voiceAudioRef.current.pause();
    voiceAudioRef.current.currentTime = 0;
  };

  return (
    <div className="aau-modal-overlay">
      <article className="aau-modal-card aau-modal-card-wide">
        {/* List view: shows all clubs in the selected student-life category. */}
        {!selectedStand ? (
          <>
            <button
              className="aau-icon-button"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>

            <p className="aau-modal-eyebrow">Student clubs</p>
            <h2 className="aau-modal-title">{table.title}</h2>
            <p className="aau-modal-text">
              Choose a club to explore what student life in this category can
              look like.
            </p>

            <div className="aau-card-grid">
              {table.stands.map((stand) => (
                <button
                  key={stand.id}
                  className="aau-card-button"
                  onClick={() => setSelectedStandId(stand.id)}
                >
                  <strong>{stand.title}</strong>
                  <span>{stand.description}</span>
                  <em>Open details →</em>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Detail view: shows one selected club from the category. */}
            <button
              className="aau-icon-button"
              onClick={() => setSelectedStandId(null)}
              aria-label="Back"
            >
              ←
            </button>

            {selectedStand.image && (
              <img
                className="aau-modal-media"
                src={selectedStand.image}
                alt={selectedStand.title}
              />
            )}

            <p className="aau-modal-eyebrow">{table.title}</p>
            <h2 className="aau-modal-title">{selectedStand.title}</h2>
            <p className="aau-modal-text">{selectedStand.description}</p>

            <div className="aau-modal-actions">
              {selectedStand.voiceOver && (
                <>
                  <button className="aau-button-primary" onClick={playVoiceOver}>
                    Play voice-over
                  </button>
                  <button className="aau-button-secondary" onClick={stopVoiceOver}>
                    Stop audio
                  </button>
                </>
              )}

              {selectedStand.learnMoreUrl && (
                <button
                  className="aau-button-primary"
                  onClick={() => window.open(selectedStand.learnMoreUrl, "_blank")}
                >
                  Learn more
                </button>
              )}

              <button className="aau-button-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}
      </article>
    </div>
  );
}