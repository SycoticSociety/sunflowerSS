import React, { useContext, useEffect, useState } from "react";
import { useActor } from "@xstate/react";

import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { ToastContext } from "features/game/toast/ToastQueueProvider";
import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";
import { Consumable, isJuice } from "features/game/types/consumables";
import { getFoodExpBoost } from "features/game/expansion/lib/boosts";

import levelIcon from "assets/icons/level_up.png";
import firePit from "src/assets/buildings/fire_pit.png";
import { Bumpkin } from "features/game/types/game";
import { SplitScreenView } from "components/ui/SplitScreenView";
import { FeedBumpkinDetails } from "components/ui/layouts/FeedBumpkinDetails";
import Decimal from "decimal.js-light";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { SquareIcon } from "components/ui/SquareIcon";
import { ResizableBar } from "components/ui/ProgressBar";
import {
  getBumpkinLevel,
  getExperienceToNextLevel,
  isMaxLevel,
} from "features/game/lib/level";

interface Props {
  food: Consumable[];
}

export const Feed: React.FC<Props> = ({ food }) => {
  const [selected, setSelected] = useState<Consumable | undefined>(food[0]);
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);

  const [
    {
      context: { state },
    },
  ] = useActor(gameService);
  const inventory = state.inventory;
  const experience = state.bumpkin?.experience ?? 0;
  const level = getBumpkinLevel(experience);
  const maxLevel = isMaxLevel(experience);
  const { currentExperienceProgress, experienceToNextLevel } =
    getExperienceToNextLevel(experience);

  useEffect(() => {
    if (food.length) {
      setSelected(food[0]);
    } else {
      setSelected(undefined);
    }
  }, [food.length]);

  const feed = (food: Consumable) => {
    console.log("feedcalled");
    gameService.send("bumpkin.feed", { food: food.name });

    setToast({
      icon: levelIcon,
      content: `+${getFoodExpBoost(
        food,
        state.bumpkin as Bumpkin,
        state.collectibles
      )}`,
    });
    setToast({
      icon: ITEM_DETAILS[food.name].image,
      content: `-1`,
    });

    shortcutItem(food.name);
  };

  const levelInfo = () => (
    <div className="flex flex-col items-start mb-3 mt-1 px-1">
      {/* Level */}
      <p className="text-base">{`Level ${level}${maxLevel ? " (Max)" : ""}`}</p>

      <div className="flex flex-row items-center my-1">
        {/* Level icon */}
        <SquareIcon icon={levelIcon} width={7} />

        {/* XP */}
        <p className="text-xxs ml-1">
          {`${Math.floor(currentExperienceProgress)}/${
            maxLevel ? "-" : Math.floor(experienceToNextLevel)
          } XP`}
        </p>
      </div>

      {/* XP bar */}
      <ResizableBar
        percentage={(currentExperienceProgress / experienceToNextLevel) * 100}
        type={"progress"}
        outerDimensions={{ width: 48, height: 7 }}
      />
    </div>
  );

  if (!selected) {
    return (
      <div className="flex flex-col items-center p-2">
        <span className="text-base text-center mb-4">Hungry?</span>
        <span className="w-full text-sm mb-3">
          You have no food in your inventory.
        </span>
        <span className="w-full text-sm mb-2">
          You will need to cook food in order to feed your Bumpkin.
        </span>
        <img
          src={firePit}
          className="my-2"
          alt={"Fire Pit"}
          style={{
            width: `${PIXEL_SCALE * 47}px`,
          }}
        />
      </div>
    );
  }

  return (
    <SplitScreenView
      header={
        <FeedBumpkinDetails
          details={{
            item: selected.name,
          }}
          properties={{
            xp: new Decimal(
              getFoodExpBoost(
                selected,
                state.bumpkin as Bumpkin,
                state.collectibles
              )
            ),
          }}
          actionView={
            <Button
              disabled={!inventory[selected.name]?.gt(0)}
              onClick={() => feed(selected)}
            >
              {isJuice(selected.name) ? "Drink 1" : "Eat 1"}
            </Button>
          }
        />
      }
      content={
        <div className="flex flex-col">
          {levelInfo()}
          <div className="flex flex-wrap">
            {food.map((item) => (
              <Box
                isSelected={selected.name === item.name}
                key={item.name}
                onClick={() => setSelected(item)}
                image={ITEM_DETAILS[item.name].image}
                count={inventory[item.name]}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};
