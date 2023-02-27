import { getKeys } from "features/game/types/craftables";
import { Bumpkin, Bumpkins } from "features/game/types/game";

export const getNonFarmingBumpkins = (bumpkins: Bumpkins) => {
  const {
    wallet,
    farming: { primary, others },
  } = bumpkins;
  const farmingBumpkins = [primary.id, ...others.map(({ id }) => id)];

  return getKeys(wallet).reduce((acc, id) => {
    const isFarming = farmingBumpkins.includes(Number(id));

    if (!isFarming) {
      acc[id] = wallet[id];
    }

    return acc;
  }, {} as Record<number, Bumpkin>);
};
