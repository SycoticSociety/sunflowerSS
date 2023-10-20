import React from "react";

import GothicBg from "assets/decorations/GothicBg.png";
import { CONFIG } from "lib/config";
import { PIXEL_SCALE } from "features/game/lib/constants";

const releaseVersion = CONFIG.RELEASE_VERSION as string;

export const GothicBg: React.FC = ({ children }) => {
  return (
    <div
      className="bg-Black-600 w-full bg-repeat h-full flex relative items-center justify-center"
      style={{
        backgroundImage: `url(${GothicBg})`,
        backgroundSize: `${64 * PIXEL_SCALE}px`,
        imageRendering: "pixelated",
      }}
    >
      {children}
    </div>
  );
};
