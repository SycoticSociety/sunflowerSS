import cloneDeep from "lodash.clonedeep";
import { Coordinates } from "features/game/expansion/components/MapPlacement";
import { getKeys } from "features/game/types/craftables";
import { GameState } from "features/game/types/game";

export type PlaceBumpkinAction = {
  type: "bumpkin.placed";
  id: number;
  coordinates: Coordinates;
};

type Options = {
  state: Readonly<GameState>;
  action: PlaceBumpkinAction;
  createdAt?: number;
};

export const BUMPKIN_COOLDOWN = 1000 * 60 * 60 * 24;

const DEFAULT_BUMPKIN_ALLOWANCE = 1;

export const placeBumpkin = ({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState => {
  const stateCopy = cloneDeep(state);
  const placedTents = (stateCopy.buildings.Tent || []).length;

  if (!stateCopy.bumpkins || getKeys(stateCopy.bumpkins?.wallet).length === 0) {
    throw new Error("You do not have a Bumpkin.");
  }

  const bumpkinToBePlaced = stateCopy.bumpkins.wallet[action.id];

  if (!bumpkinToBePlaced) {
    throw new Error("This Bumpkin does not exist in your wallet");
  }

  const placedBumpkins = [
    stateCopy.bumpkins.farming.primary,
    ...stateCopy.bumpkins.farming.others.map(
      (placedBumpkin) => placedBumpkin.id
    ),
  ];

  if (placedBumpkins.includes(action.id)) {
    throw new Error("This Bumpkin is already placed");
  }

  if (placedTents === 0) {
    throw new Error("You do not have a placed tent");
  }

  const bumpkinCapacity = DEFAULT_BUMPKIN_ALLOWANCE + placedTents;

  if (placedBumpkins.length + 1 > bumpkinCapacity) {
    throw new Error("You have exceeded your Bumpkin capacity");
  }

  stateCopy.bumpkins.farming.others.push({
    id: action.id,
    coordinates: action.coordinates,
    readyAt: createdAt + BUMPKIN_COOLDOWN,
    createdAt,
  });

  return stateCopy;
};
