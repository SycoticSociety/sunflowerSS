import React, { useContext } from "react";

import { Label } from "components/ui/Label";
import { Button } from "components/ui/Button";

import {
  AuctionResults,
  MachineInterpreter,
} from "features/game/lib/auctionMachine";
import { Context } from "features/game/GameProvider";
import {
  AuctionLeaderboardTable,
  toOrdinalSuffix,
} from "./AuctionLeaderboardTable";

interface Props {
  auctionService: MachineInterpreter;
  results: AuctionResults;
  farmId: number;
}

export const TieBreaker: React.FC<Props> = ({
  farmId,
  auctionService,
  results,
}) => {
  const { gameService } = useContext(Context);

  const refund = () => {
    gameService.send("bid.refunded");
    auctionService.send("REFUND");
    gameService.send("SAVE");
  };

  return (
    <div className="flex flex-col items-center">
      <AuctionLeaderboardTable
        farmId={farmId}
        leaderboard={results.leaderboard}
        showHeader
        status="tiebreaker"
      />
      <div className="my-2">
        <Label type="warning">Tiebreaker</Label>
      </div>
      <p className="text-xs mb-2 text-center px-2">
        {`So close! You bid the exact same resources as the ${toOrdinalSuffix(
          results.supply
        )} bid.`}{" "}
        A tie breaker is chosen by whichever Bumpkin has more experience.
        Unfortunately you lost.
      </p>
      <p className="text-xs  mb-1 text-center px-2">
        Time to eat some more cakes! Better luck next time.
      </p>
      <a
        className="underline hover:text-blue-500 text-xxs text-center"
        href="https://docs.sunflower-land.com/player-guides/auctions#tie-breaker"
        target="_blank"
        rel="noreferrer"
      >
        Read more
      </a>
      <Button className="mt-2" onClick={refund}>
        Refund resources
      </Button>
    </div>
  );
};
