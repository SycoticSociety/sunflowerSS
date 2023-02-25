import React, { useContext, useState } from "react";

import { SUNNYSIDE } from "assets/sunnyside";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Bumpkin } from "features/game/types/game";
import { BumpkinStats } from "./BumpkinStats";
import { BumpkinTrade } from "./BumpkinTrade";
import { BumpkinModerate } from "./BumpkinModerate";
import { useActor } from "@xstate/react";
import * as AuthProvider from "features/auth/lib/Provider";

type TabView = "stats" | "trade" | "moderate";

interface Props {
  bumpkin: Bumpkin;
  accountId: number;
  onClose: () => void;
}

export const BumpkinFriend: React.FC<Props> = ({
  bumpkin,
  accountId,
  onClose,
}) => {
  const [tab, setTab] = useState<TabView>("stats");
  const { authService } = useContext(AuthProvider.Context);
  const [authState] = useActor(authService);
  const isAdmin = authState.context.token?.userAccess.admin;

  return (
    <CloseButtonPanel<TabView>
      currentTab={tab}
      setCurrentTab={setTab}
      tabs={[
        {
          icon: SUNNYSIDE.icons.player,
          name: "Player",
          view: "stats",
        },
        {
          icon: SUNNYSIDE.icons.treasure,
          name: "Shop",
          view: "trade",
        },
        ...(isAdmin
          ? [
              {
                icon: SUNNYSIDE.icons.death,
                name: "Mod",
                view: "moderate" as TabView,
              },
            ]
          : []),
      ]}
      bumpkinParts={bumpkin.equipped}
      onClose={onClose}
    >
      {tab === "stats" && <BumpkinStats bumpkin={bumpkin} />}
      {tab === "trade" && <BumpkinTrade accountId={accountId} />}
      {tab === "moderate" && <BumpkinModerate accountId={accountId} />}
    </CloseButtonPanel>
  );
};
