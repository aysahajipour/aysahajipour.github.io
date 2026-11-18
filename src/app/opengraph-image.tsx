import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AYSA DEV — web design and development";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#14213b", color: "#f8f8ff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 82px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, letterSpacing: 5 }}><div style={{ width: 57, height: 57, borderRadius: 3, border: "2px solid #27e6f5", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30 }}>A<span style={{ color: "#62f5a5" }}>.</span></div>AYSA / DEV</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 86, lineHeight: 1.08, fontWeight: 700, letterSpacing: -4 }}><span>Websites that</span><span style={{ color: "#ad5cff" }}>work beautifully.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 4, color: "#b4c2e5" }}><span>DESIGN • DEVELOPMENT • SEO</span><span>AYSAHAJIPOUR</span></div>
    </div>,
    size,
  );
}
