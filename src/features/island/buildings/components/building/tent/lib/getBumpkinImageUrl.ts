import { Bumpkin } from "features/game/types/game";
import { CONFIG } from "lib/config";
import { tokenUriBuilder } from "lib/utils/tokenUriBuilder";

const URL =
  CONFIG.NETWORK === "mainnet"
    ? "https://images.bumpkins.io/nfts"
    : "https://testnet-images.bumpkins.io/nfts";

export const getBumpkinUrl = (bumpkin: Bumpkin) => {
  const tokenUri = tokenUriBuilder(bumpkin.equipped);
  const size = 100;

  return `${URL}/${tokenUri}x${size}.png`;
};
