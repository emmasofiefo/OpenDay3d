"use client";

/**
 * Loads the main room geometry and attaches a fixed triangle-mesh collider.
 * This makes the imported environment both visible and physically navigable.
 */

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

type RoomProps = {
  orbitMode: boolean;
};

export default function Room({ orbitMode }: RoomProps) {
  const { scene } = useGLTF("/models/backup.glb");

  useEffect(() => {
    const roof = scene.getObjectByName("roof");

    if (roof) {
      roof.visible = !orbitMode;
    } else {
      console.warn("Roof Plane.003 not found");
    }
  }, [scene, orbitMode]);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene} scale={1.5} />
    </RigidBody>
  );
}

useGLTF.preload("/models/backup.glb");