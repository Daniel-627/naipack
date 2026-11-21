/**
 * The Sanity Studio, embedded in the site at /studio.
 * Every route under /studio is handled by this one catch-all page.
 */
import { NextStudio } from "next-sanity/studio";
import { hasSanity } from "@/sanity/env";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!hasSanity) return <SetupNotice />;
  return <NextStudio config={config} />;
}

function SetupNotice() {
  const box = { maxWidth: 640, margin: "12vh auto", padding: "0 24px", fontFamily: "system-ui, sans-serif", lineHeight: 1.6 };
  const code = { background: "#eef3f1", padding: "2px 6px", borderRadius: 4 };
  return (
    <main style={box}>
      <h1 style={{ marginBottom: 8 }}>Connect Sanity to open the Studio</h1>
      <p>The site runs on its built-in content until a Sanity project is connected. To start editing:</p>
      <ol>
        <li>
          Create a free project at <a href="https://www.sanity.io/manage">sanity.io/manage</a> and copy its Project ID.
        </li>
        <li>
          Copy <code style={code}>.env.example</code> to <code style={code}>.env.local</code> and paste the ID after{" "}
          <code style={code}>NEXT_PUBLIC_SANITY_PROJECT_ID=</code>.
        </li>
        <li>
          Restart <code style={code}>npm run dev</code> and reload this page.
        </li>
        <li>
          In the Sanity project settings, add <code style={code}>http://localhost:3000</code> as a CORS origin
          (allow credentials).
        </li>
      </ol>
      <p>
        Then run <code style={code}>npm run seed</code> once to load the current products, questions and settings into
        the Studio.
      </p>
    </main>
  );
}
