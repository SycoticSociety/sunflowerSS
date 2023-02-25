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

import { LevelInfo } from "./LevelInfo";

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

  if (!selected) {
    return (
      <div className="flex flex-col p-2">
        <span className="mb-4">Hungry?</span>
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
      panelContent={
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
      mainContent={
        <div className="flex flex-col">
          <div className="px-1">
            <LevelInfo
              bumpkin={state.bumpkin as Bumpkin}
              className="text-sm sm:text-base"
            />
            <p className="my-2">Food</p>
          </div>
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
