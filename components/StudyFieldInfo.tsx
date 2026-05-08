"use client";

import { useEffect, useRef, useState } from "react";
import type { StudyField } from "../data/StudyField";

/**
 * Modal panel for one selected study programme.
 *
 * The panel shows the programme image, description, optional voice-over controls,
 * and a link to the official AAU programme page.
 */
type StudyFieldsInfoProps = {
  studyField: StudyField | null;
  onClose: () => void;
};

export default function StudyFieldsInfo({
  studyField,
  onClose,
}: StudyFieldsInfoProps) {
  const openAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isVoiceOverPlaying, setIsVoiceOverPlaying] = useState(false);

  useEffect(() => {
    setIsVoiceOverPlaying(false);

    if (!studyField) return;

    // Optional short sound when a study panel opens.
    if (studyField.openSound) {
      openAudioRef.current = new Audio(studyField.openSound);
      openAudioRef.current.volume = 0.35;
      openAudioRef.current.play().catch(() => undefined);
    }

    // Optional longer voice-over that the user can start manually.
    if (studyField.voiceOver) {
      voiceAudioRef.current = new Audio(studyField.voiceOver);
      voiceAudioRef.current.volume = 0.8;

      voiceAudioRef.current.onended = () => {
        setIsVoiceOverPlaying(false);
      };
    }

    // Stop all panel audio when the selected programme changes or closes.
    return () => {
      openAudioRef.current?.pause();
      voiceAudioRef.current?.pause();

      if (openAudioRef.current) openAudioRef.current.currentTime = 0;
      if (voiceAudioRef.current) voiceAudioRef.current.currentTime = 0;

      openAudioRef.current = null;
      voiceAudioRef.current = null;
      setIsVoiceOverPlaying(false);
    };
  }, [studyField]);

  if (!studyField) return null;

  const playVoiceOver = () => {
    if (!voiceAudioRef.current) return;

    voiceAudioRef.current.currentTime = 0;
    voiceAudioRef.current
      .play()
      .then(() => {
        setIsVoiceOverPlaying(true);
      })
      .catch(() => {
        setIsVoiceOverPlaying(false);
      });
  };

  const stopVoiceOver = () => {
    if (!voiceAudioRef.current) return;

    voiceAudioRef.current.pause();
    voiceAudioRef.current.currentTime = 0;
    setIsVoiceOverPlaying(false);
  };

  const toggleVoiceOver = () => {
    if (isVoiceOverPlaying) {
      stopVoiceOver();
    } else {
      playVoiceOver();
    }
  };

  const handleClose = () => {
    stopVoiceOver();
    onClose();
  };

  return (
    <div className="aau-modal-overlay">
      <article className="aau-modal-card">
        {/* Programme image from the study field data. */}
        {studyField.image && (
          <img
            className="aau-modal-media"
            src={studyField.image}
            alt={studyField.title}
          />
        )}

        {/* Programme title and description. */}
        <h2 className="aau-modal-title">{studyField.title}</h2>
        <p className="aau-modal-text">{studyField.description}</p>

        {/* User actions: audio playback, official programme page, and close. */}
        <div className="aau-modal-actions">
          {studyField.voiceOver && (
            <button className="aau-button-primary" onClick={toggleVoiceOver}>
              {isVoiceOverPlaying ? "Stop voice-over" : "Play voice-over"}
            </button>
          )}

          <button
            className="aau-button-primary"
            onClick={() => window.open(studyField.learnMoreUrl, "_blank")}
          >
            Learn more
          </button>

          <button className="aau-button-secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </article>
    </div>
  );
}

