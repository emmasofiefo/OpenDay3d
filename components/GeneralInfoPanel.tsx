"use client";

import type { GeneralInfoStands } from "../data/GeneralInfoStands";

/**
 * Modal panel for general campus information.
 *
 * It can show either an embedded map or an image, followed by the information
 * text and an optional external link.
 */

type Props = {
  table: GeneralInfoStands | null;
  onClose: () => void;
};

export default function GeneralInfoPanel({ table, onClose }: Props) {
  if (!table) return null;

  return (
    <div className="aau-modal-overlay">
      <article className="aau-modal-card aau-modal-card-wide">
        {table.mapEmbedUrl ? (
          <iframe
            className="aau-modal-media"
            src={table.mapEmbedUrl}
            title={table.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : table.image ? (
          <img className="aau-modal-media" src={table.image} alt={table.title} />
        ) : null}

        <div className="aau-modal-content">

          <h2 className="aau-modal-title">{table.title}</h2>

          <p className="aau-modal-intro">{table.intro}</p>

          {table.sections && (
            <div className="aau-info-grid">
              {table.sections.map((section) => (
                <section className="aau-info-section" key={section.heading}>
                  <h3>{section.heading}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}

          {table.outro && <p className="aau-modal-outro">{table.outro}</p>}

          <div className="aau-modal-actions">
            {table.linkUrl && (
              <a
                className="aau-button-primary"
                href={table.linkUrl}
                target="_blank"
                rel="noreferrer"
              >
                {table.linkLabel ?? "Open link"}
              </a>
            )}

            <button className="aau-button-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
