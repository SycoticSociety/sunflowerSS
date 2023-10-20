import React from "react";
import ocean from "assets/decorations/ocean.webp";
import { CONFIG } from "lib/config";
import { PIXEL_SCALE } from "features/game/lib/constants";

const releaseVersion = CONFIG.RELEASE_VERSION as string;

export const Ocean: React.FC = ({ children }) => {
  const oceanStyle = {
    background: `url(${ocean}) center center / cover no-repeat`,
    imageRendering: "pixelated",
    width: "100%",
    height: "100vh",
  };

  return (
    <div
      className="bg-blue-600 w-full h-full flex relative items-center justify-center"
      style={oceanStyle}
    >
      {children}
    </div>
  );
};
