"use client";

/**
 * Composes the open-day experience: loading, player control, interaction detection,
 * information panels, orbit inspection mode, map overlay, guide NPCs, and video screens.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import { studyFields } from "../data/StudyField";
import {
  studentLifeTables,
  type StudentLifeTable,
} from "../data/StandInfo";
import {
  generalInfoStands,
  type GeneralInfoStands,
} from "../data/GeneralInfoStands";
import { guideInfo } from "../data/GuideInfo";

import Room from "./Room";
import Player from "./PlayerInfo";
import OverlayUI from "./OverlayUI";
import CursorLook from "./CursorLook";
import InfoDesk from "./InfoDesk";
import InfoScreen, { MediaVideoOverlay } from "./InfoPanel";
import StudyFieldsInfo from "./StudyFieldInfo";
import StandTabelInfo from "./Stand";
import StudentClubStand from "./StudentClubStand";
import MapOverlay from "./MapOverlay";
import GeneralInfoPanel from "./GeneralInfoPanel";
import TourGuide from "./TourGuide";

type Vec3 = [number, number, number];


type MediaScreen = {
  id: string;
  title: string;
  position: Vec3;
  videoSrc: string;
};

type SceneContentProps = {
  playerEnabled: boolean;
  orbitEnabled: boolean;
  yawRef: React.MutableRefObject<number>;
  pitchRef: React.MutableRefObject<number>;
  playerPosition: Vec3;
  setPlayerPosition: React.Dispatch<React.SetStateAction<Vec3>>;
  nearbyDesk: (typeof studyFields)[number] | null;
  activeStudy: (typeof studyFields)[number] | null;
  nearbyStudentTable: StudentLifeTable | null;
  activeStudentTable: StudentLifeTable | null;
  nearbyGeneralTable: GeneralInfoStands | null;
  activeGeneralTable: GeneralInfoStands | null;
  nearbyGuide: (typeof guideInfo)[number] | null;
  orbitMode: boolean;
  setActiveStudyId: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveStudentTable: React.Dispatch<
    React.SetStateAction<StudentLifeTable | null>
  >;
  setActiveGeneralTable: React.Dispatch<
    React.SetStateAction<GeneralInfoStands | null>
  >;
  mediaScreens: MediaScreen[];
  nearbyMediaScreen: MediaScreen | null;
  openVideo: string | null;
  setOpenVideo: React.Dispatch<React.SetStateAction<string | null>>;
  teleportTarget: { id: number; position: Vec3 } | null;
};

function SceneContent({
  playerEnabled,
  orbitEnabled,
  yawRef,
  pitchRef,
  setPlayerPosition,
  nearbyDesk,
  activeStudy,
  nearbyStudentTable,
  activeStudentTable,
  nearbyGeneralTable,
  activeGeneralTable,
  nearbyGuide,
  orbitMode,
  setActiveStudyId,
  setActiveStudentTable,
  setActiveGeneralTable,
  mediaScreens,
  nearbyMediaScreen,
  openVideo,
  setOpenVideo,
  teleportTarget,
}: SceneContentProps) {
  const anyModalOpen = Boolean(
    activeStudy ||
      activeStudentTable ||
      activeGeneralTable ||
      orbitMode ||
      openVideo
  );

  return (
    <>
      <color attach="background" args={["#232323"]} />
      <fog attach="fog" args={["#d7f1ff", 90, 320]} />

      <ambientLight intensity={1.1} />
      <hemisphereLight intensity={1.3} color="#ffffff" groundColor="#7a6f63" />
      <directionalLight position={[40, 70, 40]} intensity={2} color="#ffe3b0" />

      <CursorLook enabled={playerEnabled} yawRef={yawRef} pitchRef={pitchRef} />

      <OrbitControls
        enabled={orbitEnabled}
        target={[10, 2, 0]}
        enablePan
        enableZoom
        enableRotate
      />

      <Physics>
        <Room orbitMode={orbitMode} />

        <Player
          enabled={playerEnabled}
          yawRef={yawRef}
          pitchRef={pitchRef}
          onPositionChange={setPlayerPosition}
          teleportTarget={teleportTarget}
        />

        <TourGuide nearbyGuideId={nearbyGuide?.id ?? null} />

        {studyFields.map((desk) => (
          <InfoDesk
            key={desk.id}
            position={desk.position}
            rotation={desk.rotation}
            title={desk.title}
            modelUrl="/models/StudyStand.glb"
            materialName={desk.materialName}
            isNearby={
              nearbyDesk?.id === desk.id &&
              !activeStudy &&
              !activeStudentTable &&
              !activeGeneralTable &&
              !orbitMode &&
              !openVideo
            }
            onInteract={() => setActiveStudyId(desk.id)}
            prompt="Press E to explore this study field"
          />
        ))}

        {studentLifeTables.map((table) => (
          <StudentClubStand
            key={table.id}
            position={table.position}
            title={table.title}
            category={table.category}
            isNearby={
              nearbyStudentTable?.id === table.id &&
              !activeStudy &&
              !activeStudentTable &&
              !activeGeneralTable &&
              !orbitMode &&
              !openVideo
            }
            onInteract={() => setActiveStudentTable(table)}
          />
        ))}

        {generalInfoStands.map((table) => (
          <InfoDesk
            key={table.id}
            position={table.position}
            title={table.title}
            modelUrl={table.modelUrl}
            isNearby={
              nearbyGeneralTable?.id === table.id &&
              !activeStudy &&
              !activeStudentTable &&
              !activeGeneralTable &&
              !orbitMode &&
              !openVideo
            }
            onInteract={() => setActiveGeneralTable(table)}
            prompt="Press E to open information"
          />
        ))}

        {mediaScreens.map((screen) => (
          <InfoScreen
            key={screen.id}
            position={screen.position}
            title={screen.title}
            videoSrc={screen.videoSrc}
            isNearby={nearbyMediaScreen?.id === screen.id && !anyModalOpen}
            hideLabel={Boolean(openVideo)}
            onOpenVideo={setOpenVideo}
          />
        ))}
      </Physics>
    </>
  );
}

const INTERACTION_DISTANCE = 3;
const MEDIA_INTERACTION_DISTANCE = 5;
const GUIDE_INTERACTION_DISTANCE = 4;

export default function OpenDayScene() {
  const [started, setStarted] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [orbitMode, setOrbitMode] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [teleportTarget, setTeleportTarget] = useState<{
    id: number;
    position: Vec3;
  } | null>(null);

  const [playerPosition, setPlayerPosition] = useState<Vec3>([0, 6, 0]);

  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [activeStudentTable, setActiveStudentTable] =
    useState<StudentLifeTable | null>(null);
  const [activeGeneralTable, setActiveGeneralTable] =
    useState<GeneralInfoStands | null>(null);

  const yawRef = useRef(-Math.PI / 2);
  const pitchRef = useRef(0);

  const { progress, active } = useProgress();
  const assetsLoaded = !active && progress >= 100;

  const mediaScreens = useMemo<MediaScreen[]>(
    () => [
      {
        id: "campus-video-1",
        title: "Women in IT",
        position: [1, 5, 11],
        videoSrc: "/videos/VID_20260430_024738_692.mp4",
      },
      {
        id: "campus-video-2",
        title: "AAU Open Day 2026",
        position: [-2, 5, 11],
        videoSrc: "/videos/VID_20260430_024816_604.mp4",
      },
      {
        id: "campus-video-3",
        title: "More of this in 2026",
        position: [-5, 5, 11],
        videoSrc: "/videos/VID_20260430_024832_298.mp4",
      },
      {
        id: "campus-video-4",
        title: "POV: you asked the universe for a sign",
        position: [-8, 5, 11],
        videoSrc: "/videos/VID_20260430_024944_491.mp4",
      },
    ],
    []
  );

  const nearbyDesk = useMemo(() => {
    let closest = null as (typeof studyFields)[number] | null;
    let closestDistance = Infinity;

    for (const desk of studyFields) {
      const dx = playerPosition[0] - desk.position[0];
      const dz = playerPosition[2] - desk.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < INTERACTION_DISTANCE && distance < closestDistance) {
        closest = desk;
        closestDistance = distance;
      }
    }

    return closest;
  }, [playerPosition]);

  const nearbyGuide = useMemo(() => {
    let closest = null as (typeof guideInfo)[number] | null;
    let closestDistance = Infinity;

    for (const guide of guideInfo) {
      const dx = playerPosition[0] - guide.position[0];
      const dz = playerPosition[2] - guide.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < GUIDE_INTERACTION_DISTANCE && distance < closestDistance) {
        closest = guide;
        closestDistance = distance;
      }
    }

    return closest;
  }, [playerPosition]);

  const nearbyStudentTable = useMemo(() => {
    let closest = null as StudentLifeTable | null;
    let closestDistance = Infinity;

    for (const table of studentLifeTables) {
      const dx = playerPosition[0] - table.position[0];
      const dz = playerPosition[2] - table.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < INTERACTION_DISTANCE && distance < closestDistance) {
        closest = table;
        closestDistance = distance;
      }
    }

    return closest;
  }, [playerPosition]);

  const nearbyGeneralTable = useMemo(() => {
    let closest = null as GeneralInfoStands | null;
    let closestDistance = Infinity;

    for (const table of generalInfoStands) {
      const dx = playerPosition[0] - table.position[0];
      const dz = playerPosition[2] - table.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < INTERACTION_DISTANCE && distance < closestDistance) {
        closest = table;
        closestDistance = distance;
      }
    }

    return closest;
  }, [playerPosition]);

  const nearbyMediaScreen = useMemo(() => {
    let closest: MediaScreen | null = null;
    let closestDistance = Infinity;

    for (const screen of mediaScreens) {
      const dx = playerPosition[0] - screen.position[0];
      const dz = playerPosition[2] - screen.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < MEDIA_INTERACTION_DISTANCE && distance < closestDistance) {
        closest = screen;
        closestDistance = distance;
      }
    }

    return closest;
  }, [mediaScreens, playerPosition]);

  const activeStudy = useMemo(
    () => studyFields.find((desk) => desk.id === activeStudyId) ?? null,
    [activeStudyId]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (!started || !assetsLoaded) return;

      if (key === "escape") {
        setActiveStudyId(null);
        setActiveStudentTable(null);
        setActiveGeneralTable(null);
        setShowMap(false);
        setOpenVideo(null);
        return;
      }

      if (
        key === "o" &&
        !showUI &&
        !activeStudy &&
        !activeStudentTable &&
        !activeGeneralTable &&
        !showMap &&
        !openVideo
      ) {
        setOrbitMode((prev) => !prev);
        return;
      }

      if (
        key === "m" &&
        !showUI &&
        !activeStudy &&
        !activeStudentTable &&
        !activeGeneralTable &&
        !openVideo
      ) {
        setShowMap((prev) => !prev);
        return;
      }

      if (!showUI && !orbitMode && !showMap && !openVideo && key === "e") {
        if (nearbyDesk) {
          setActiveStudyId(nearbyDesk.id);
          return;
        }

        if (nearbyStudentTable) {
          setActiveStudentTable(nearbyStudentTable);
          return;
        }

        if (nearbyGeneralTable) {
          setActiveGeneralTable(nearbyGeneralTable);
          return;
        }

        if (nearbyMediaScreen) {
          setOpenVideo(nearbyMediaScreen.videoSrc);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    nearbyDesk,
    nearbyStudentTable,
    nearbyGeneralTable,
    nearbyMediaScreen,
    started,
    showUI,
    activeStudy,
    activeStudentTable,
    activeGeneralTable,
    orbitMode,
    assetsLoaded,
    showMap,
    openVideo,
  ]);

  const playerEnabled =
    started &&
    assetsLoaded &&
    !showUI &&
    !activeStudy &&
    !activeStudentTable &&
    !activeGeneralTable &&
    !orbitMode &&
    !showMap &&
    !openVideo;

  const orbitEnabled =
    started &&
    assetsLoaded &&
    !showUI &&
    !activeStudy &&
    !activeStudentTable &&
    !activeGeneralTable &&
    orbitMode &&
    !showMap &&
    !openVideo;

  const handleTeleport = (position: Vec3) => {
    setTeleportTarget({
      id: Date.now(),
      position,
    });

    setPlayerPosition(position);
    setShowMap(false);
    setOrbitMode(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <OverlayUI
        started={started}
        showUI={showUI}
        setStarted={setStarted}
        setShowUI={setShowUI}
        loadingProgress={progress}
        assetsLoaded={assetsLoaded}
        showMap={showMap}
        setShowMap={setShowMap}
        orbitMode={orbitMode}
        setOrbitMode={setOrbitMode}
      />

      <MapOverlay
        visible={showMap}
        onClose={() => setShowMap(false)}
        playerPosition={playerPosition}
        onTeleport={handleTeleport}
      />

      <StudyFieldsInfo
        studyField={activeStudy}
        onClose={() => setActiveStudyId(null)}
      />

      <StandTabelInfo
        table={activeStudentTable}
        onClose={() => setActiveStudentTable(null)}
      />

      <GeneralInfoPanel
        table={activeGeneralTable}
        onClose={() => setActiveGeneralTable(null)}
      />

      <MediaVideoOverlay
        videoSrc={openVideo}
        onClose={() => setOpenVideo(null)}
      />

      <Canvas
        camera={{ position: [0, 1.6+6, 0], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0b263b");
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            playerEnabled={playerEnabled}
            orbitEnabled={orbitEnabled}
            yawRef={yawRef}
            pitchRef={pitchRef}
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            nearbyDesk={nearbyDesk}
            activeStudy={activeStudy}
            nearbyStudentTable={nearbyStudentTable}
            activeStudentTable={activeStudentTable}
            nearbyGeneralTable={nearbyGeneralTable}
            activeGeneralTable={activeGeneralTable}
            nearbyGuide={nearbyGuide}
            orbitMode={orbitMode}
            setActiveStudyId={setActiveStudyId}
            setActiveStudentTable={setActiveStudentTable}
            setActiveGeneralTable={setActiveGeneralTable}
            mediaScreens={mediaScreens}
            nearbyMediaScreen={nearbyMediaScreen}
            openVideo={openVideo}
            setOpenVideo={setOpenVideo}
            teleportTarget={teleportTarget}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}