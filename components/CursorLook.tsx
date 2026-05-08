"use client";

/**
 * Implements camera rotation driven by cursor position for the 3D walkthrough.
 * Yaw and pitch are stored in refs so continuous camera updates do not trigger
 * React re-renders on every animation frame.
 */

import { RefObject, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

type CursorLookProps = {
  enabled?: boolean;
  yawRef: RefObject<number>;
  pitchRef: RefObject<number>;
};

export default function CursorLook({
  enabled = true,
  yawRef,
  pitchRef,
}: CursorLookProps) {
  const { camera, size } = useThree();

  // Mouse position is frame data; a ref avoids unnecessary React updates.
  const mouse = useRef({
    x: size.width / 2,
    y: size.height / 2,
  });

  const lastMouseMoveTime = useRef(0);
  const currentTurnSpeed = useRef(0);

  const maxTurnSpeed = 0.015;
  const verticalSensitivity = 0.0003;
  const maxPitch = 0.3;

  const safeZoneWidth = 180;
  const safeZoneHeight = 100;

  const spinDamping = 0.985;
  const stopThreshold = 0.000002;
  const inactivityDelay = 850;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!enabled) return;

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lastMouseMoveTime.current = performance.now();

      pitchRef.current -= e.movementY * verticalSensitivity;
      pitchRef.current = Math.max(
        -maxPitch,
        Math.min(maxPitch, pitchRef.current)
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled, pitchRef]);

  useEffect(() => {
    mouse.current.x = size.width / 2;
    mouse.current.y = size.height / 2;
    currentTurnSpeed.current = 0;
  }, [size.width, size.height]);

  useEffect(() => {
    if (!enabled) {
      mouse.current.x = size.width / 2;
      mouse.current.y = size.height / 2;
      currentTurnSpeed.current = 0;
    }
  }, [enabled, size.width, size.height]);

  // Apply camera rotation in the render loop for smooth, frame-rate independent motion.
  useFrame((_, delta) => {
    if (!enabled) return;

    const x = mouse.current.x;
    const y = mouse.current.y;

    const inTopLeftSafeZone = x <= safeZoneWidth && y <= safeZoneHeight;
    const inTopRightSafeZone =
      x >= size.width - safeZoneWidth && y <= safeZoneHeight;
    const inBottomLeftSafeZone =
      x <= safeZoneWidth && y >= size.height - safeZoneHeight;
    const inBottomRightSafeZone =
      x >= size.width - safeZoneWidth && y >= size.height - safeZoneHeight;

    const inAnySafeZone =
      inTopLeftSafeZone ||
      inTopRightSafeZone ||
      inBottomLeftSafeZone ||
      inBottomRightSafeZone;

    const recentlyMoved =
      performance.now() - lastMouseMoveTime.current < inactivityDelay;

    const centerX = size.width / 2;

    if (!inAnySafeZone && recentlyMoved) {
      const normalized = (x - centerX) / centerX;
      const targetSpeed = Math.pow(Math.abs(normalized), 2) * maxTurnSpeed;

      if (normalized < 0) {
        currentTurnSpeed.current = targetSpeed;
      } else if (normalized > 0) {
        currentTurnSpeed.current = -targetSpeed;
      } else {
        currentTurnSpeed.current = 0;
      }
    } else {
      currentTurnSpeed.current *= Math.pow(spinDamping, delta * 60);

      if (Math.abs(currentTurnSpeed.current) < stopThreshold) {
        currentTurnSpeed.current = 0;
      }
    }

    yawRef.current += currentTurnSpeed.current;

    camera.rotation.order = "YXZ";
    camera.rotation.y = yawRef.current;
    camera.rotation.x = pitchRef.current;
  });

  return null;
}