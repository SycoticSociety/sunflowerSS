import React from "react";

import obie from "assets/sfts/obie.gif";
import shadow from "assets/npcs/shadow.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const Obie: React.FC = () => {
  return (
    <>
      <img
        src={shadow}
        className="absolute pointer-events-none"
        style={{
          width: `${PIXEL_SCALE * 15}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
      />
      <img
        src={obie}
        className="absolute pointer-events-none"
        style={{
          width: `${PIXEL_SCALE * 15}px`,
          bottom: `${PIXEL_SCALE * 2}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        alt="Obie"
      />
    </>
  );
};
