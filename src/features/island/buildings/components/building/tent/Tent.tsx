import React, { useState } from "react";

import tent from "assets/buildings/tent.png";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { BuildingProps } from "../Building";
import { BuildingImageWrapper } from "../BuildingImageWrapper";
import Modal from "react-bootstrap/esm/Modal";
import { TentModal } from "./TentModal";

export const Tent: React.FC<BuildingProps> = ({ isBuilt, onRemove }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (onRemove) {
      onRemove();
      return;
    }

    if (isBuilt) {
      setShowModal(true);
      return;
    }
  };

  return (
    <>
      <BuildingImageWrapper onClick={handleClick} nonInteractible={!onRemove}>
        <img
          src={tent}
          className="absolute pointer-events-none"
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
