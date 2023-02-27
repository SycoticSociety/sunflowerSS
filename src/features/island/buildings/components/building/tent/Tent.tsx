import React, { useState } from "react";

import tent from "assets/buildings/tent.png";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { BuildingProps } from "../Building";
import { BuildingImageWrapper } from "../BuildingImageWrapper";
import Modal from "react-bootstrap/esm/Modal";
import { TentModal } from "./TentModal";
import { hasFeatureAccess } from "lib/flags";
import { Inventory } from "features/game/types/game";
import classNames from "classnames";

export const Tent: React.FC<BuildingProps> = ({ isBuilt, onRemove }) => {
  const [showModal, setShowModal] = useState(false);

  const hasMultipleBumpkinAccess = hasFeatureAccess(
    {} as Inventory,
    "MULTIPLE_BUMPKINS"
  );

  const handleClick = () => {
    if (onRemove) {
      onRemove();
      return;
    }

    if (isBuilt) {
      hasMultipleBumpkinAccess && setShowModal(true);
      return;
    }
  };

  return (
    <>
      <BuildingImageWrapper onClick={handleClick} nonInteractible={!onRemove}>
        <img
          src={tent}
          className={classNames("absolute", {
            "cursor-pointer": hasMultipleBumpkinAccess,
            "pointer-events-none": !hasMultipleBumpkinAccess,
          })}
          style={{
            width: `${PIXEL_SCALE * 46}px`,
            bottom: `${PIXEL_SCALE * 0}px`,
            left: `${PIXEL_SCALE * 1}px`,
          }}
        />
      </BuildingImageWrapper>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <TentModal onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};
