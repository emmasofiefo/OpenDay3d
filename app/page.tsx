"use client";

import dynamic from "next/dynamic";

const OpenDayScene = dynamic(() => import("@/components/OpenDayScene"), {
  ssr: false,
  loading: () => (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(to bottom, #5fb8ff, #cfefff)",
        color: "#003b7a",
        fontFamily: "system-ui, sans-serif",
        fontWeight: 800,
      }}
    >
      Loading AAU Open Day...
    </main>
  ),
});

export default function Home() {
  return <OpenDayScene />;
}