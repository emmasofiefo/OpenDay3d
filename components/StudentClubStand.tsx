"use client";

import { useMemo } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

/**
 * A 3D stand for student-life categories.
 *
 * Every stand uses the same StudentAs.glb model. The material named "Event" is
 * treated as the changeable display surface and is replaced with the material
 * that matches the category: events, hobbies, sport, or academic.
 */
type StudentClubStandProps = {
  position: [number, number, number];
  title: string;
  category: "events" | "hobbies" | "sport" | "academic";
  isNearby: boolean;
  onInteract: () => void;
};

const categoryMaterialMap = {
  events: "Event",
  hobbies: "Hobbies",
  sport: "Sport",
  academic: "Academic",
} as const;

export default function StudentClubStand({
  position,
  title,
  category,
  isNearby,
  onInteract,
}: StudentClubStandProps) {
  // Load the shared student association stand model.
  const { scene, materials } = useGLTF("/models/StudentAs.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const targetMaterialName = categoryMaterialMap[category];
    const replacementMaterial = materials[targetMaterialName];

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      // Clone all materials so each stand can have its own category colour.
      child.material = Array.isArray(child.material)
        ? child.material.map((mat) => mat.clone())
        : child.material.clone();

      if (!replacementMaterial) {
        console.warn(
          `Material "${targetMaterialName}" not found. Available materials:`,
          Object.keys(materials)
        );
        return;
      }

      // Replace only the display material named "Event"; keep wood/plastic intact.
      if (Array.isArray(child.material)) {
        child.material = child.material.map((mat) =>
          mat.name === "Event" ? replacementMaterial.clone() : mat
        );
      } else if (child.material.name === "Event") {
        child.material = replacementMaterial.clone();
      }
    });

    return clone;
  }, [scene, materials, category]);

  return (
    <RigidBody type="fixed" colliders="trimesh" position={position}>
      <group
        rotation={[0, Math.PI, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onInteract();
        }}
      >
        {/* Student association stand model. */}
        <primitive object={clonedScene} scale={1.9} />

        {/* Interaction prompt shown only when this stand is the closest valid target. */}
        {isNearby && (
          <Html position={[0, 3, 0]} center distanceFactor={8}>
            <div className="interaction-label active">
              <div className="interaction-label-title">{title}</div>
              <div className="interaction-label-prompt">
                <kbd>E</kbd>
                <span>Press E to explore student associations</span>
              </div>
            </div>
          </Html>
        )}
      </group>
    </RigidBody>
  );
}