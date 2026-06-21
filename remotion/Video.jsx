import { AbsoluteFill } from "remotion";

export const ShortVideo = ({ scriptText }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1220",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 48,
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {scriptText}
      </div>
    </AbsoluteFill>
  );
};