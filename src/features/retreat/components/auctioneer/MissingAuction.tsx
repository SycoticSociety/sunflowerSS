import React, { useContext } from "react";

import { Button } from "components/ui/Button";

import { SUNNYSIDE } from "assets/sunnyside";
import { MachineInterpreter } from "features/game/lib/auctionMachine";
import { Context } from "features/game/GameProvider";

interface Props {
  auctionService: MachineInterpreter;
}
export const MissingAuction: React.FC<Props> = ({ auctionService }) => {
  const { gameService } = useContext(Context);

  const refund = () => {
    gameService.send("bid.refunded");
    auctionService.send("REFUND");
    gameService.send("SAVE");
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2">Auction no longer exists</p>
      <img src={SUNNYSIDE.icons.neutral} className="w-12 mb-2" />
      <Button className="mt-2" onClick={refund}>
        Refund
      </Button>
    </div>
  );
};
