import React from "react";
import ocean from "assets/decorations/ocean.webp";
import { CONFIG } from "lib/config";
import { PIXEL_SCALE } from "features/game/lib/constants";

const releaseVersion = CONFIG.RELEASE_VERSION as string;

export const Ocean: React.FC = ({ children }) => {
  return (
    <div
      className="bg-blue-600 w-full h-full flex relative items-center justify-center"
      style={{
        backgroundImage: `url(${ocean})`,
        backgroundSize: "cover",
        imageRendering: "pixelated",
        width: "100%",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
};
