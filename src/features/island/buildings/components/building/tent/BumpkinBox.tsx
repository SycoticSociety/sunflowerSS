import React, { useRef, useState } from "react";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { Bumpkin } from "features/game/types/game";
import { pixelDarkBorderStyle } from "features/game/lib/style";
import { SelectBox } from "components/ui/SelectBox";
import { getBumpkinUrl } from "./lib/getBumpkinImageUrl";
import { v4 as uuidv4 } from "uuid";

interface BumpkinBoxProps {
  bumpkin: Bumpkin;
  selectedId: number;
  onSelect: (tokenId: number) => void;
}

const INNER_CANVAS_WIDTH = 20;

export const BumpkinBox = ({
  bumpkin,
  selectedId,
  onSelect,
}: BumpkinBoxProps) => {
  const [isHover, setIsHover] = useState(false);
  const imageUrl = useRef(getBumpkinUrl(bumpkin));

  return (
    <div
      key={bumpkin.id}
      className="relative"
      onClick={() => onSelect(bumpkin.id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="bg-brown-600 cursor-pointer relative"
        style={{
          width: `${PIXEL_SCALE * (INNER_CANVAS_WIDTH + 4)}px`,
          height: `${PIXEL_SCALE * (INNER_CANVAS_WIDTH + 4)}px`,
          marginTop: `${PIXEL_SCALE * 3}px`,
          marginBottom: `${PIXEL_SCALE * 2}px`,
          marginLeft: `${PIXEL_SCALE * 2}px`,
          marginRight: `${PIXEL_SCALE * 3}px`,
          ...pixelDarkBorderStyle,
        }}
      >
        {imageUrl && <img src={imageUrl.current} alt="Bumpkin" />}
      </div>
      {(Number(selectedId) === bumpkin.id || isHover) && (
        <SelectBox innerCanvasWidth={INNER_CANVAS_WIDTH} />
      )}
    </div>
  );
};

export const EmptyBumpkinBox = () => {
  return (
    <div
      key={uuidv4()}
      className="bg-brown-600"
      style={{
        width: `${PIXEL_SCALE * (INNER_CANVAS_WIDTH + 4)}px`,
        height: `${PIXEL_SCALE * (INNER_CANVAS_WIDTH + 4)}px`,
        marginTop: `${PIXEL_SCALE * 3}px`,
        marginBottom: `${PIXEL_SCALE * 2}px`,
        marginLeft: `${PIXEL_SCALE * 2}px`,
        marginRight: `${PIXEL_SCALE * 3}px`,
        ...pixelDarkBorderStyle,
      }}
    />
  );
};
