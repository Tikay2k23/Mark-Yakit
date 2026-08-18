import { ImageResponse } from "next/og";

export const alt =
  "Mark Yakit — GoHighLevel Systems Builder, CRM & Automation Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141413",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{ width: "56px", height: "6px", backgroundColor: "#ef7c00" }}
          />
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "4px",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "128px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            MARK YAKIT
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "38px",
              lineHeight: 1.3,
              color: "#ef7c00",
            }}
          >
            GoHighLevel Systems Builder
          </div>
        </div>

        <div
          style={{
            fontSize: "30px",
            color: "rgba(255,255,255,0.66)",
          }}
        >
          CRM &amp; Automation · API Integrations · Full-Stack Development
        </div>
      </div>
    ),
    size,
  );
}
