"use client";

import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { HelpCircle, Map as MapIcon, Eye, Rotate3d } from "lucide-react";

type Props = {
  started: boolean;
  showUI: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
  setShowUI: Dispatch<SetStateAction<boolean>>;
  loadingProgress: number;
  assetsLoaded: boolean;
  showMap: boolean;
  setShowMap: Dispatch<SetStateAction<boolean>>;
  orbitMode: boolean;
  setOrbitMode: Dispatch<SetStateAction<boolean>>;
};

const buttonStyle: React.CSSProperties = {
  zIndex: 10,
  padding: "0.9rem 1.6rem",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.35)",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 700,
  background: "rgba(255,255,255,0.96)",
  color: "#003B7A",
  boxShadow: "0 10px 24px rgba(0, 32, 78, 0.22)",
  fontFamily: "Barlow, Arial, sans-serif",
};

export default function OverlayUI({
  started,
  showUI,
  setStarted,
  setShowUI,
  loadingProgress,
  assetsLoaded,
  showMap,
  setShowMap,
  orbitMode,
  setOrbitMode,
}: Props) {
  const progressValue = Math.min(100, Math.round(loadingProgress));
  const isHelpScreen = started;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!started || showUI || showMap) return;

      if (event.key.toLowerCase() === "h") setShowUI(true);
      if (event.key.toLowerCase() === "m") setShowMap(true);
      if (event.key.toLowerCase() === "o") {
        setOrbitMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started, showUI, showMap, setShowUI, setShowMap, setOrbitMode]);

  return (
    <>
      {showUI && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            overflow: "hidden",
            fontFamily: "Barlow, Arial, sans-serif",
          }}
        >
          {!isHelpScreen ? (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "url('/pictures/_2WB3706.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  animation: "slowZoom 14s ease-in-out infinite alternate",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0, 38, 84, 0.52), rgba(0, 32, 78, 0.82))",
                }}
              />
            </>
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0, 38, 84, 0.96), rgba(20, 62, 120, 0.94))",
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/pictures/AAU_BOELGER_RGB-06.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: isHelpScreen ? 0.08 : 0.12,
              mixBlendMode: "screen",
              animation: "waveDrift 18s ease-in-out infinite alternate",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 21,
              width: isHelpScreen ? "min(92vw, 520px)" : "min(92vw, 580px)",
              color: "white",
              textAlign: "center",
              padding: isHelpScreen ? "2rem 1.8rem" : "2.2rem 2rem",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.24)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 48px rgba(0,0,0,0.28)",
              animation: "fadeInCard 0.8s ease",
              overflow: "hidden",
            }}
          >
            <img
              src="/pictures/__AAU_CENTER_WHITE_UK.png"
              alt="AAU Logo"
              style={{
                width: isHelpScreen ? "96px" : "120px",
                height: isHelpScreen ? "96px" : "120px",
                objectFit: "contain",
                display: "block", 
                margin: `0 auto ${isHelpScreen ? "1rem" : "1.2rem"} auto`,
                animation: "floatLogo 3.4s ease-in-out infinite",
              }}
            />

            <h1
              style={{
                fontSize: isHelpScreen ? "2rem" : "2.5rem",
                fontWeight: 800,
                marginBottom: "0.8rem",
              }}
            >
              {isHelpScreen
                ? "How to explore the hall"
                : "AAU Open Day Experience"}
            </h1>

            <p
              style={{
                fontSize: isHelpScreen ? "1rem" : "1.08rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.92)",
                maxWidth: "46ch",
                margin: "0 auto",
              }}
            >
              {isHelpScreen
                ? "Move with WASD, look around with the mouse, and press E near stands to open information. Use Map to see where you are, or View to switch between first-person and orbit view."
                : "Step into an interactive 3D hall and explore study fields, student clubs, media areas, and more."}
            </p>

            {isHelpScreen && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.7rem",
                  marginTop: "1.4rem",
                }}
              >
                {["H = Help", "M = Map", "O = View"].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "0.7rem",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      fontWeight: 700,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            {!isHelpScreen && (
              <div style={{ marginTop: "1.8rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: 10,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.18)",
                    overflow: "hidden",
                    marginBottom: "1rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${progressValue}%`,
                      height: "100%",
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(170,210,255,0.95))",
                      transition: "width 0.25s ease",
                    }}
                  />
                </div>

                <p
                  style={{
                    fontSize: "0.96rem",
                    marginBottom: "1.3rem",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {assetsLoaded
                    ? "Everything is ready."
                    : `Loading experience... ${progressValue}%`}
                </p>
              </div>
            )}

            {!isHelpScreen ? (
              <button
                style={{
                  ...buttonStyle,
                  marginTop: "1rem",
                  opacity: assetsLoaded ? 1 : 0.75,
                  cursor: assetsLoaded ? "pointer" : "not-allowed",
                }}
                disabled={!assetsLoaded}
                onClick={() => {
                  if (!assetsLoaded) return;
                  setStarted(true);
                  setShowUI(true);
                }}
              >
                Enter Experience
              </button>
            ) : (
              <button
                style={{ ...buttonStyle, marginTop: "1.6rem" }}
                onClick={() => setShowUI(false)}
              >
                Start Exploring
              </button>
            )}
          </div>
        </div>
      )}

      {started && !showUI && !showMap && (
        <div className="ui-controls" aria-label="Main controls">
          <button
            className="ui-button"
            onClick={() => setShowUI(true)}
            title="Open help"
          >
            <HelpCircle />
            <span>Help</span>
          </button>

          <button
            className="ui-button ui-button-view"
            onClick={() => setOrbitMode((prev) => !prev)}
            title={orbitMode ? "Switch to first person" : "Switch to orbit view"}
          >
            {orbitMode ? <Eye /> : <Rotate3d />}
            <span>{orbitMode ? "First Person" : "Orbit View"}</span>
          </button>

          <button
            className="ui-button"
            onClick={() => setShowMap(true)}
            title="Open map"
          >
            <MapIcon />
            <span>Map</span>
          </button>
        </div>
      )}
    </>
  );
}