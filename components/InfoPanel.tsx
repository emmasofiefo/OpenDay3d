"use client";

import { useEffect, useMemo, useState } from "react";
import { Text, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

type Vec3 = [number, number, number];

type InfoScreenProps = {
  position: Vec3;
  videoSrc: string;
  rotation?: Vec3;
  isNearby?: boolean;
  title?: string;
  onOpenVideo?: (videoSrc: string) => void;
  hideLabel?: boolean;
};

const CARD_WIDTH = 1.5;
const CARD_HEIGHT = 2.6;

// These control the simple media card position on top of Screen.glb.
// Tweak only these if the card is slightly off.
const CARD_POSITION: Vec3 = [-0.355, 1.355, 0.405];
const CARD_ROTATION: Vec3 = [0, Math.PI, 0];

function MediaCard({
  title = "AAU video",
  isNearby = false,
  onOpen,
  hideLabel = false,
}: {
  title?: string;
  isNearby?: boolean;
  onOpen: () => void;
  hideLabel?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = isNearby || hovered;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  return (
    <group position={CARD_POSITION} rotation={CARD_ROTATION}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHovered(false);
        }}
      >
        <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
        <meshBasicMaterial
          color={active ? "#ffffff" : "#000000"}
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {!hideLabel && (
        <group position={[0, 0, 0.018]}>

          {/* Play icon */}
          <Text
            position={[0, 0.58, 0.012]}
            fontSize={0.22}
            color="#003b7a"
            anchorX="center"
            anchorY="middle"
            depthOffset={-10}
          >
            ▶
          </Text>

          {/* Title */}
          <Text
            position={[0, 0.18, 0.012]}
            fontSize={0.105}
            maxWidth={0.78}
            lineHeight={1.1}
            textAlign="center"
            color="#003b7a"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            depthOffset={-10}
          >
            {title}
          </Text>

          {/* Button badge background */}
          <mesh position={[0, -0.48, 0.01]}>
            <planeGeometry args={[0.78, 0.22]} />
            <meshBasicMaterial
              color={isNearby ? "#003b7a" : "#003b7a"}
              toneMapped={false}
              side={THREE.FrontSide}
            />
          </mesh>

          {/* Button badge text */}
          <Text
            position={[0, -0.48, 0.025]}
            fontSize={0.07}
            color={isNearby ? "#ffffff" : "#ffffff"}
            anchorX="center"
            anchorY="middle"
            depthOffset={-10}
          >
            {isNearby ? "PRESS E" : "WALK CLOSER"}
          </Text>
        </group>
      )}
    </group>
  );
}

export function MediaVideoOverlay({
  videoSrc,
  onClose,
}: {
  videoSrc: string | null;
  onClose: () => void;
}) {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    setCanPlay(false);
  }, [videoSrc]);

  if (!videoSrc) return null;

  return (
    <div className="aau-video-overlay" style={{ zIndex: 9999 }}>
      <div className="aau-video-card">
        <button
          onClick={onClose}
          className="aau-icon-button"
          aria-label="Close video"
        >
          ×
        </button>

        <div className="aau-video-frame">
          <video
            key={videoSrc}
            src={videoSrc}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onCanPlay={() => setCanPlay(true)}
            style={{ aspectRatio: "9 / 16", maxHeight: "70vh" }}
          />
        </div>

        {!canPlay && (
          <p className="aau-video-text" style={{ marginTop: 16 }}>
            Loading video…
          </p>
        )}

        <div className="aau-video-content">
          <p className="aau-video-text">
            Watch highlights from AAU Copenhagen and explore student life, study
            programmes, and the campus experience.
          </p>

          <div className="aau-video-actions">
            <a
              href="https://www.instagram.com/aaucph/"
              target="_blank"
              rel="noopener noreferrer"
              className="aau-video-instagram"
            >
              AAU Instagram
            </a>

            <button onClick={onClose} className="aau-video-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InfoScreen({
  position,
  videoSrc,
  rotation = [0, 0, 0],
  isNearby = false,
  title = "AAU video",
  onOpenVideo,
  hideLabel = false,
}: InfoScreenProps) {
  const { scene } = useGLTF("/models/Screen.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      position={position}
      rotation={rotation}
    >
      <primitive object={clonedScene} scale={1.9} />

      <MediaCard
        title={title}
        isNearby={isNearby}
        onOpen={() => onOpenVideo?.(videoSrc)}
        hideLabel={hideLabel}
      />
    </RigidBody>
  );
}