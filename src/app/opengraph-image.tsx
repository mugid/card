import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bek Slambek - Design Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101010",
          color: "#ededed",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(237,237,237,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(237,237,237,0.055) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 72,
            width: 132,
            height: 132,
            border: "1px solid rgba(255,243,176,0.55)",
            transform: "rotate(8deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 102,
            top: 104,
            width: 132,
            height: 132,
            border: "1px solid rgba(237,237,237,0.16)",
            transform: "rotate(-7deg)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "rgba(237,237,237,0.62)",
              fontSize: 28,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                background: "#fff3b0",
                display: "block",
              }}
            />
            bekslambek.com
          </div>
          <h1
            style={{
              margin: 0,
              color: "#fff3b0",
              fontSize: 96,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              maxWidth: 780,
            }}
          >
            Bek Slambek
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(237,237,237,0.76)",
              fontSize: 34,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              maxWidth: 760,
            }}
          >
            Design engineer exploring AI capabilities through product interfaces,
            hiring workflows, games, and creative web experiments.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            color: "#101010",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {["AI products", "Hireke", "Frontend", "Design systems"].map(
            (item) => (
              <span
                key={item}
                style={{
                  background: "#ededed",
                  padding: "10px 16px",
                }}
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
