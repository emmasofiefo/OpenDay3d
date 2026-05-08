"use client";

/**
 * Implements the physics-based first-person player controller.
 * Movement is handled through Rapier velocity updates, while camera orientation is
 * read from shared refs to keep continuous input responsive.
 */

import { RefObject, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import * as THREE from "three";

const SPEED = 5;
const SPAWN: [number, number, number] = [-14, 7, 0];

type PlayerProps = {
  enabled?: boolean;
  yawRef: RefObject<number>;
  pitchRef: RefObject<number>;
  onPositionChange?: (position: [number, number, number]) => void;
  teleportTarget?: { id: number; position: [number, number, number] } | null;
};

export default function Player({
  enabled = true,
  yawRef,
  pitchRef,
  onPositionChange,
  teleportTarget,
}: PlayerProps) {
  const { camera } = useThree();
  const body = useRef<RapierRigidBody | null>(null);

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
  });



  useEffect(() => {
    if (!teleportTarget || !body.current) return;

    const [x, y, z] = teleportTarget.position;

    body.current.setTranslation({ x, y, z }, true);
    body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    camera.position.set(x, y + 1.8, z);
    onPositionChange?.([x, y, z]);
  }, [teleportTarget, camera, onPositionChange]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key in keys.current) {
        keys.current[key as keyof typeof keys.current] = true;
      }

      if (key === "r" && body.current) {
        body.current.setTranslation(
          { x: SPAWN[0], y: SPAWN[1], z: SPAWN[2] },
          true
        );
        body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      }
    };

    const up = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key in keys.current) {
        keys.current[key as keyof typeof keys.current] = false;
      }
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    if (!enabled || !body.current) return;

    const position = body.current.translation();
    const yaw = yawRef.current;

    camera.position.set(position.x, position.y + 1.8, position.z);
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitchRef.current;

    onPositionChange?.([position.x, position.y, position.z]);

    const forward = new THREE.Vector3(
      -Math.sin(yaw),
      0,
      -Math.cos(yaw)
    ).normalize();

    const right = new THREE.Vector3()
      .crossVectors(forward, new THREE.Vector3(0, 1, 0))
      .normalize();

    const move = new THREE.Vector3();

    if (keys.current.w || keys.current.arrowup) move.add(forward);
    if (keys.current.s || keys.current.arrowdown) move.sub(forward);
    if (keys.current.a || keys.current.arrowleft) move.sub(right);
    if (keys.current.d || keys.current.arrowright) move.add(right);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(SPEED);
    }

    const vel = body.current.linvel();

    body.current.setLinvel(
      {
        x: move.x,
        y: vel.y,
        z: move.z,
      },
      true
    );
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      type="dynamic"
      position={SPAWN}
      enabledRotations={[false, false, false]}
      canSleep={false}
    >
      <CapsuleCollider args={[0.9, 0.4]} />
    </RigidBody>
  );
}