"use client";

import { useMemo } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

/**
 * A reusable 3D information stand.
 *
 * Used for study fields and general information points. The component loads a
 * GLB model, clones it so each stand can have independent materials, and shows
 * a floating interaction label only when the player is nearby.
 */
type InfoDeskProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  isNearby: boolean;
  onInteract: () => void;
  prompt?: string;
  modelUrl?: string;
  materialName?: string;
};

function formatPrompt(prompt: string) {
  return prompt.replace(/^E\s*/i, "").trim();
}

export default function InfoDesk({
  position,
  rotation,
  title,
  isNearby,
  onInteract,
  prompt = "Press E to open",
  modelUrl = "/models/Tabel.glb",
  materialName,
}: InfoDeskProps) {
  // Load the GLB and expose its named materials from Blender.
  const { scene, materials } = useGLTF(modelUrl);

  const clonedScene = useMemo(() => {
    // Clone the scene so material changes on one desk do not affect every desk.
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      // Clone mesh materials before editing them. GLB materials are shared by default.
      child.material = Array.isArray(child.material)
        ? child.material.map((mat) => mat.clone())
        : child.material.clone();

      // Study stands use the "computer" material slot as the replaceable panel.
      if (!modelUrl.includes("StudyStand") || !materialName) return;

      const replacementMaterial = materials[materialName];

      if (!replacementMaterial) {
        console.warn(
          `Material "${materialName}" not found. Available materials:`,
          Object.keys(materials)
        );
        return;
      }

      if (!Array.isArray(child.material) && child.material.name === "computer") {
        child.material = replacementMaterial.clone();
      }
    });

    return clone;
  }, [scene, materials, modelUrl, materialName]);

  return (
    <RigidBody type="fixed" colliders="trimesh" position={position}>
      <group rotation={rotation ?? [0, 0, 0]}>
        {/* The loaded 3D model users click to open the matching information panel. */}
        <primitive
          object={clonedScene}
          scale={1.9}
          onClick={(event: { stopPropagation: () => void }) => {
            event.stopPropagation();
            onInteract();
          }}
        />

        {/* Nearby prompt. Kept short so all 3D labels feel like the same UI system. */}
        {isNearby && (
          <Html position={[0, 3, 0]} center distanceFactor={10}>
            <div className="interaction-label active">
              <div className="interaction-label-title">{title}</div>
              <div className="interaction-label-prompt">
                <kbd>E</kbd>
                <span>{formatPrompt(prompt)}</span>
              </div>
            </div>
          </Html>
        )}
      </group>
    </RigidBody>
  );
}