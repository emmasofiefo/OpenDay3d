"use client";

import { Html, useGLTF } from "@react-three/drei";
import { guideInfo } from "../data/GuideInfo";

type Props = {
  nearbyGuideId: string | null;
};

export default function TourGuide({ nearbyGuideId }: Props) {
  const { scene } = useGLTF("/models/guy.glb");

  return (
    <>
      {guideInfo.map((guide) => {
        const isNearby = nearbyGuideId === guide.id;

        return (
          <group
            key={guide.id}
            position={guide.position}
            rotation={guide.rotation || [0, 0, 0]}
            scale={1.15}
          >
            <primitive object={scene.clone()} />

            {isNearby && (
              <Html
                position={[0, 2.5, 0]}
                center
                distanceFactor={8}
              >
                <div className="tour-guide-popup">
                  <div className="tour-guide-title">
                    {guide.title}
                  </div>

                  <div className="tour-guide-description">
                    {guide.description}
                  </div>

                  <div className="tour-guide-key">
                    Press <kbd>E</kbd>
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}

useGLTF.preload("/models/Guy.glb");
