import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#c8ff00",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#09090b",
          fontSize: 44,
          fontWeight: 900,
          fontFamily: "sans-serif",
        }}
      >
        J
      </div>
    ),
    { ...size }
  );
}
