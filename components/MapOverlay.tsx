"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  GraduationCap,
  Users,
  PlayCircle,
  Building,
  BookOpen,
  MapPin,
  DoorOpen,
  UserStar,
  Signpost,
  Lock,
} from "lucide-react";

type Vec3 = [number, number, number];

type Zone = {
  id: string;
  label: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  worldPosition: Vec3;
  comingSoon?: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  playerPosition: Vec3;
  onTeleport: (position: Vec3) => void;
};

const zones: Zone[] = [
  {
    id: "education-programmes",
    label: "Education Programmes",
    description: "Explore study programmes and find the stands related to your interests.",
    icon: GraduationCap,
    worldPosition: [15, 7, 0],
  },
  {
    id: "student-associations",
    label: "Student Associations",
    description: "Meet student clubs, associations, and communities at AAU.",
    icon: Users,
    worldPosition: [7, 7, 19],
  },
  {
    id: "media-zone",
    label: "Media Zone",
    description: "Watch videos and media content about AAU Copenhagen.",
    icon: PlayCircle,
    worldPosition: [-3, 7, 8],
  },
  {
    id: "faculty-pbl",
    label: "Faculty PBL",
    description: "Learn about problem-based learning and faculty information.",
    icon: Building,
    worldPosition: [-3, 7, -8],
  },
  {
    id: "how-to-use",
    label: "How To Use",
    description: "Get guidance on how to move around and use the 3D open day.",
    icon: BookOpen,
    worldPosition: [-12, 7, 0],
  },
  {
    id: "find-us",
    label: "Find Us",
    description: "Find AAU Copenhagen and open the location in Google Maps.",
    icon: MapPin,
    worldPosition: [-6, 7, 0],
  },
  {
    id: "admissions",
    label: "Admissions",
    description: "Read about admission requirements, deadlines, and applications.",
    icon: DoorOpen,
    worldPosition: [-22, 7, 0],
  },
  {
    id: "student-life",
    label: "Student Life",
    description: "Student stories and campus life activities will be added here.",
    icon: UserStar,
    worldPosition: [-18, 7, -14],
    comingSoon: true,
  },
  {
    id: "classroom-tour",
    label: "Classroom Tour",
    description: "A guided classroom and learning-space tour will be added here.",
    icon: Signpost,
    worldPosition: [-32, 7, 25],
    comingSoon: true,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const MAP_CENTER_X = 50;
const MAP_CENTER_Y = 47;
const Z_TO_MAP_X = 1.3;
const X_TO_MAP_Y = 1.2;

function worldToMap(position: Vec3) {
  const [x, , z] = position;

  return {
    left: `${clamp(MAP_CENTER_X + z * Z_TO_MAP_X, 8, 92)}%`,
    top: `${clamp(MAP_CENTER_Y - x * X_TO_MAP_Y, 8, 92)}%`,
  };
}

export default function MapOverlay({
  visible,
  onClose,
  playerPosition,
  onTeleport,
}: Props) {
  const [active, setActive] = useState<string>("education-programmes");
  const [message, setMessage] = useState<string | null>(null);

  const activeZone = zones.find((zone) => zone.id === active) ?? zones[0];
  const ActiveIcon = activeZone.icon;

  const playerMarker = useMemo(
    () => worldToMap(playerPosition),
    [playerPosition]
  );

  useEffect(() => {
    if (!message) return;

    const timeout = window.setTimeout(() => setMessage(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [message]);

  if (!visible) return null;

  const selectZone = (zone: Zone) => {
    setActive(zone.id);

    if (zone.comingSoon) {
      setMessage(`${zone.label} is coming soon`);
    }
  };

  const teleportToActiveZone = () => {
    if (activeZone.comingSoon) {
      setMessage(`${activeZone.label} is coming soon`);
      return;
    }

    onTeleport(activeZone.worldPosition);
    onClose();
  };

  return (
    <div className="map-overlay">
      <div className="map-container">
        <div className="map-image">
          <div className="map-stage">
            <img
              src="/pictures/Sprite/Map.png"
              alt="Map of the open day hall"
            />

            {zones.map((zone) => {
              const Icon = zone.icon;

              return (
                <button
                  key={zone.id}
                  className={`map-pin ${
                    active === zone.id ? "is-active" : ""
                  } ${zone.comingSoon ? "is-locked" : ""}`}
                  style={worldToMap(zone.worldPosition)}
                  onClick={() => selectZone(zone)}
                  aria-label={zone.label}
                  title={zone.label}
                >
                  <Icon size={18} />

                  {zone.comingSoon && (
                    <span className="map-lock-badge" aria-hidden="true">
                      <Lock size={10} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}

            <div className="player-marker" style={playerMarker}>
              <span />
            </div>

            {message && <div className="map-toast">{message}</div>}
          </div>
        </div>

        <div className="map-sidebar">
          {zones.map((zone) => {
            const Icon = zone.icon;

            return (
              <button
                key={zone.id}
                onClick={() => selectZone(zone)}
                className={`map-zone-button ${
                  active === zone.id ? "is-active" : ""
                } ${zone.comingSoon ? "is-disabled" : ""}`}
              >
                <div className="map-zone-content">
                  <Icon className="map-zone-icon" />
                  <span className="map-zone-label">{zone.label}</span>
                </div>

                {zone.comingSoon ? (
                  <span className="map-zone-status">
                    <Lock size={13} />
                  </span>
                ) : (
                  <span className="map-zone-arrow">›</span>
                )}
              </button>
            );
          })}

          <div className="map-preview-card">
            <div className="map-preview-header">
              <div className="map-preview-icon">
                {activeZone.comingSoon ? (
                  <Lock size={22} />
                ) : (
                  <ActiveIcon size={22} />
                )}
              </div>

              <div>
                <h3>{activeZone.label}</h3>
                <p>{activeZone.comingSoon ? "Coming soon" : "Available location"}</p>
              </div>
            </div>

            <p className="map-preview-description">{activeZone.description}</p>

            <button
              className={`map-teleport-button ${
                activeZone.comingSoon ? "is-disabled" : ""
              }`}
              onClick={teleportToActiveZone}
            >
              {activeZone.comingSoon
                ? "Coming Soon"
                : `Teleport to ${activeZone.label}`}
            </button>
          </div>
        </div>

        <button className="map-close" onClick={onClose} aria-label="Close map">
          ×
        </button>
      </div>
    </div>
  );
}