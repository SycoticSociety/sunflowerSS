import { getKeys } from "features/game/types/craftables";
import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type RemoveBumpkinAction = {
  type: "bumpkin.removed";
  id: number;
};

type Options = {
  state: Readonly<GameState>;
  action: RemoveBumpkinAction;
  createdAt?: number;
};

export const removeBumpkin = ({ state, action }: Options): GameState => {
  const stateCopy = cloneDeep(state);

  if (!stateCopy.bumpkins || getKeys(stateCopy.bumpkins?.wallet).length === 0) {
    throw new Error("You do not have a Bumpkin.");
  }

  const bumpkinToBeRemoved = stateCopy.bumpkins.wallet[action.id];

  if (!bumpkinToBeRemoved) {
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

  if (placedBumpkins.length - 1 <= 0) {
    throw new Error("You cannot remove your only farming Bumpkin");
  }

  const isPrimaryBumpkin = stateCopy.bumpkins.farming.primary.id === action.id;

  if (!isPrimaryBumpkin) {
    stateCopy.bumpkins.farming.others =
      stateCopy.bumpkins.farming.others.filter(
        (bumpkin) => bumpkin.id !== action.id
      );

    return stateCopy;
  }

  stateCopy.bumpkins.farming.primary = stateCopy.bumpkins.farming.others[0];
  stateCopy.bumpkins.farming.others =
    stateCopy.bumpkins.farming.others.slice(1);

  return stateCopy;
};
