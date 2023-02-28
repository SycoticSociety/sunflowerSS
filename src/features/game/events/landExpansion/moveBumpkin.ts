import { Coordinates } from "features/game/expansion/components/MapPlacement";
import { getKeys } from "features/game/types/craftables";
import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type MoveBumpkinAction = {
  type: "bumpkin.moved";
  id: number;
  coordinates: Coordinates;
};

type Options = {
  state: Readonly<GameState>;
  action: MoveBumpkinAction;
  createdAt?: number;
};

export const moveBumpkin = ({ state, action }: Options) => {
  const stateCopy = cloneDeep(state);

  if (!stateCopy.bumpkins || getKeys(stateCopy.bumpkins?.wallet).length === 0) {
    throw new Error("You do not have a Bumpkin.");
  }

  const bumpkinToBeMoved = stateCopy.bumpkins.wallet[action.id];

  if (!bumpkinToBeMoved) {
    throw new Error("This Bumpkin does not exist in your wallet");
  }

  const placedBumpkins = [
    stateCopy.bumpkins.farming.primary.id,
    ...stateCopy.bumpkins.farming.others.map(
      (placedBumpkin) => placedBumpkin.id
    ),
  ];

  if (!placedBumpkins.includes(action.id)) {
    throw new Error("This Bumpkin is not placed");
  }

  const isPrimaryBumpkin = stateCopy.bumpkins.farming.primary.id === action.id;

  if (isPrimaryBumpkin) {
    stateCopy.bumpkins.farming.primary.coordinates = action.coordinates;

    return stateCopy;
  }

  const placedBumpkinToBeMovedIndex =
    stateCopy.bumpkins.farming.others.findIndex(
      (bumpkin) => bumpkin.id === action.id
    );

  stateCopy.bumpkins.farming.others[placedBumpkinToBeMovedIndex].coordinates =
    action.coordinates;

  return stateCopy;
};
