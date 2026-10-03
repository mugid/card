import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Bek Slambek — design engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(path.join(process.cwd(), "public/logo.svg"));
  const logoUrl = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fffdf8",
          color: "#000000",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        <img src={logoUrl} alt="" width={124} height={96} />
        <div style={{ marginTop: 52, fontSize: 40, lineHeight: 1.2 }}>
          hi, i&apos;m Bek
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 32,
            maxWidth: 1030,
            fontSize: 32,
            lineHeight: 1.2,
          }}
        >
          <span>
            a design engineer. currently, building Hireke to make some cash.
          </span>
          <span>
            i’m also studying computer science at Nazarbayev University.
          </span>
        </div>
        <div style={{ marginTop: "auto", fontSize: 24 }}>
          x / github / linkedin
        </div>
      </div>
    ),
    size,
  );
}
