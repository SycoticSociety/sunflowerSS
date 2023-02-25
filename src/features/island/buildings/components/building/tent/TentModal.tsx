import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { SUNNYSIDE } from "assets/sunnyside";
import { SplitScreenView } from "components/ui/SplitScreenView";
import { Context } from "features/game/GameProvider";
import { useActor } from "@xstate/react";
import { Bumpkins, GameState } from "features/game/types/game";
import { getEntries, getKeys } from "features/game/types/craftables";
import { LevelInfo } from "features/bumpkins/components/LevelInfo";
import { BumpkinBox, EmptyBumpkinBox } from "./BumpkinBox";
import { getBumpkinUrl } from "./lib/getBumpkinImageUrl";
import { Button } from "components/ui/Button";
import { getNonFarmingBumpkins } from "./lib/getNonFarmingBumpkins";

interface Props {
  onClose: () => void;
}

type TabView = "bumpkins";

const DEFAULT_BUMPKIN_ALLOWANCE = 1;

const getInitialSelectedBumpkinId = (state: GameState) => {
  const {
    farming: { primary, others },
  } = state.bumpkins as Bumpkins;
  const farmingBumpkins = [primary, ...others];
  const nonFarmingBumpkins = getNonFarmingBumpkins(state.bumpkins as Bumpkins);

  if (getKeys(nonFarmingBumpkins).length === 0) return primary;

  const placedTents = (state.buildings.Tent || []).length;
  const allowedBumpkins = placedTents + DEFAULT_BUMPKIN_ALLOWANCE;
  const emptySlots = allowedBumpkins - farmingBumpkins.length;

  if (emptySlots > 0) {
    const firstNonFarmingBumpkinId = getKeys(nonFarmingBumpkins)[0];

    return firstNonFarmingBumpkinId;
  }

  return primary;
};

export const TentModal: React.FC<Props> = ({ onClose }) => {
  const { gameService } = useContext(Context);
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  console.log(getInitialSelectedBumpkinId(state));

  const [selectedBumpkinId, setSelectedBumpkinId] = useState<number>(
    getInitialSelectedBumpkinId(state)
  );

  if (!state.bumpkins) return null;

  const { bumpkins } = state;
  const farmingBumpkinIds = [
    bumpkins.farming.primary,
    ...bumpkins.farming.others,
  ];
  const nonFarmingBumpkins = getNonFarmingBumpkins(bumpkins);
  const placedTents = (state.buildings.Tent || []).length;
  const allowedBumpkins = placedTents + DEFAULT_BUMPKIN_ALLOWANCE;
  const farmingBumpkinCount = farmingBumpkinIds.length;
  const emptySlots = allowedBumpkins - farmingBumpkinIds.length;

  const Actions = () => {
    const selectedIsFarming = farmingBumpkinIds.includes(selectedBumpkinId);

    if (!selectedIsFarming) return <Button>Place</Button>;

    if (selectedIsFarming && farmingBumpkinCount > 1) {
      return (
        <div className="flex space-x-1 sm:flex-col sm:space-x-0 sm:space-y-1">
          <Button>Move</Button>
          <Button>Remove</Button>
        </div>
      );
    }

    return <Button>Move</Button>;
  };

  const { wallet } = bumpkins;

  const MainContent = () => (
    <div className="flex flex-col space-y-4">
      <div>
        <p className="text-sm mb-1">Farming</p>
        <div className="flex">
          {farmingBumpkinIds.map((id) => (
            <BumpkinBox
              key={id}
              bumpkin={wallet[id]}
              selectedId={selectedBumpkinId}
              onSelect={(tokenId: number) => setSelectedBumpkinId(tokenId)}
            />
          ))}
          {emptySlots > 0 &&
            new Array(emptySlots)
              .fill(uuidv4())
              .map((uuid) => <EmptyBumpkinBox key={uuid} />)}
        </div>
      </div>
      <div>
        <p className="text-sm mb-1">Not Farming</p>
        <div className="flex">
          {getEntries(nonFarmingBumpkins).map(([tokenId, bumpkin]) => (
            <BumpkinBox
              key={tokenId}
              bumpkin={bumpkin}
              selectedId={selectedBumpkinId}
              onSelect={(tokenId: number) => setSelectedBumpkinId(tokenId)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const PanelContent = () => (
    <div className="flex flex-col sm:flex-col space-y-2">
      <div className="flex space-x-2 sm:flex-col">
        <div className="rounded overflow-hidden w-32 sm:w-full relative">
          <img
            src={getBumpkinUrl(wallet[selectedBumpkinId])}
            alt="Selected bumpkin"
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-xs sm:text-center sm:mt-1">{`Bumpkin #${selectedBumpkinId}`}</p>
          <LevelInfo
            bumpkin={wallet[selectedBumpkinId]}
            className="sm:text-sm sm:items-center"
          />
        </div>
      </div>
      {Actions()}
    </div>
  );

  return (
    <CloseButtonPanel<TabView>
      tabs={[
        { name: "Bumpkins", icon: SUNNYSIDE.icons.player, view: "bumpkins" },
      ]}
      currentTab="bumpkins"
      onClose={onClose}
    >
      <SplitScreenView
        mainContent={MainContent()}
        panelContent={PanelContent()}
        contentScrollable={false}
      ></SplitScreenView>
    </CloseButtonPanel>
  );
};
