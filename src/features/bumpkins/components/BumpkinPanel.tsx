import { useActor } from "@xstate/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "features/game/GameProvider";
import { OuterPanel } from "components/ui/Panel";

import { Achievements } from "./Achievements";
import { AchievementBadges } from "./AchievementBadges";
import { Skills } from "features/bumpkins/components/Skills";
import { CONFIG } from "lib/config";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { SkillBadges } from "./SkillBadges";
import { getAvailableBumpkinSkillPoints } from "features/game/events/landExpansion/pickSkill";
import { Bumpkin } from "features/game/types/game";
import { SUNNYSIDE } from "assets/sunnyside";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import seedSpecialist from "assets/skills/seed_specialist.png";
import foodIcon from "src/assets/food/chicken_drumstick.png";
import { getUnclaimedAchievementNames } from "features/game/events/landExpansion/claimAchievement";
import { SquareIcon } from "components/ui/SquareIcon";
import {
  acknowledgeAchievements,
  hasUnacknowledgedAchievements,
} from "features/island/bumpkin/lib/achievementStorage";
import {
  acknowledgeSkillPoints,
  hasUnacknowledgedSkillPoints,
} from "features/island/bumpkin/lib/skillPointStorage";
import { Feed } from "features/bumpkins/components/Feed";
import { getEntries } from "features/game/types/craftables";
import { CONSUMABLES } from "features/game/types/consumables";

export type TabView = "home" | "achievements" | "skills";

interface Props {
  initialView?: TabView;
  onClose: () => void;
}

export const BumpkinPanel: React.FC<Props> = ({
  initialView = "home",
  onClose,
}) => {
  const [view, setView] = useState<TabView>(initialView);
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const { state } = gameState.context;
  const isVisiting = gameState.matches("visiting");

  const getVisitBumpkinUrl = () => {
    if (isVisiting) {
      const baseUrl =
        CONFIG.NETWORK === "mainnet"
          ? `https://opensea.io/assets/matic`
          : `https://testnets.opensea.io/assets/mumbai`;

      return `${baseUrl}/${CONFIG.BUMPKIN_CONTRACT}/${state.bumpkin?.id}`;
    }

    const baseUrl =
      CONFIG.NETWORK === "mainnet"
        ? `https://bumpkins.io/#/bumpkins`
        : `https://testnet.bumpkins.io/#/bumpkins`;

    return `${baseUrl}/${state.bumpkin?.id}`;
  };

  useEffect(() => {
    if (isVisiting) return;

    if (view === "skills" && hasUnacknowledgedSkillPoints(state)) {
      acknowledgeSkillPoints(state);
    } else if (
      view === "achievements" &&
      hasUnacknowledgedAchievements(state)
    ) {
      acknowledgeAchievements(state);
    }
  }, [view]);

  const hasAvailableSkillPoints =
    getAvailableBumpkinSkillPoints(state.bumpkin) > 0;
  const hasAvailableAchievements =
    getUnclaimedAchievementNames(state).length > 0;

  const availableFood = getEntries(CONSUMABLES)
    .filter(([name, _]) => !!state.inventory[name]?.gt(0))
    .map(([_, consumable]) => consumable);

  const visitBumpkinLink = () => (
    <div className="flex flex-col justify-start sm:justify-center">
      <a
        href={getVisitBumpkinUrl()}
        target="_blank"
        className="underline text-xxs pb-1 pt-0.5 hover:text-blue-500"
        rel="noreferrer"
      >
        Visit Bumpkin
      </a>
    </div>
  );

  const badgeContainer = (title: "Skills" | "Achievements") => (
    <OuterPanel
      className="cursor-pointer hover:bg-brown-200"
      onClick={() => setView(title === "Skills" ? "skills" : "achievements")}
      style={{
        paddingTop: `${PIXEL_SCALE * 2}px`,
        paddingLeft: `${PIXEL_SCALE * 2}px`,
      }}
    >
      <div className="flex items-center mb-1 justify-between">
        <div className="flex items-center">
          <span className="text-xs mx-1">{title}</span>
          {(title === "Skills"
            ? hasAvailableSkillPoints
            : hasAvailableAchievements) &&
            !isVisiting && (
              <SquareIcon icon={SUNNYSIDE.icons.expression_alerted} width={7} />
            )}
        </div>
      </div>
      {title === "Skills" ? (
        <SkillBadges
          inventory={state.inventory}
          bumpkin={state.bumpkin as Bumpkin}
        />
      ) : (
        <AchievementBadges achievements={state.bumpkin?.achievements} />
      )}
    </OuterPanel>
  );

  return (
    <CloseButtonPanel<TabView>
      bumpkinParts={state.bumpkin?.equipped}
      onClose={onClose}
      tabs={[
        { icon: foodIcon, name: "Feed", view: "home" },
        { icon: seedSpecialist, name: "Skills", view: "skills" },
        {
          icon: SUNNYSIDE.icons.player,
          name: "Achievements",
          view: "achievements",
        },
      ]}
      currentTab={view}
      setCurrentTab={(e) => setView(e)}
    >
      {view === "home" && <Feed food={availableFood} />}
      {view === "skills" && (
        <Skills onBack={() => setView("home")} readonly={isVisiting} />
      )}
      {view === "achievements" && (
        <Achievements onBack={() => setView("home")} readonly={isVisiting} />
      )}
    </CloseButtonPanel>
  );
};
