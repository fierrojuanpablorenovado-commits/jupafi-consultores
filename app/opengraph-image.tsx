import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JuPaFi Consultores — Productos digitales que escalan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: 300,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(200,255,0,0.18), transparent 60%)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#c8ff00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#09090b",
              fontSize: 44,
              fontWeight: 900,
            }}
          >
            J
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ color: "#fafafa", fontSize: 36, fontWeight: 700 }}>
              JuPaFi
            </span>
            <span style={{ color: "#a1a1aa", fontSize: 28 }}>Consultores</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Productos digitales</span>
            <span style={{ display: "flex", gap: 24 }}>
              <span>que</span>
              <span style={{ color: "#c8ff00" }}>escalan.</span>
            </span>
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#a1a1aa",
              fontSize: 30,
              display: "flex",
            }}
          >
            SaaS · Apps con IA · Automatizaciones — en semanas, no trimestres.
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: 28,
          }}
        >
          <span style={{ color: "#71717a", fontSize: 24 }}>
            13 productos en producción · Guadalajara, México
          </span>
          <span style={{ color: "#c8ff00", fontSize: 24, fontWeight: 600 }}>
            jupaficonsultores.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
