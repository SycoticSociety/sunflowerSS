import React, { useContext } from "react";
import { OuterPanel } from "components/ui/Panel";
import {
  BumpkinSkillTree,
  getSkills,
  SKILL_TREE_CATEGORIES,
} from "features/game/types/bumpkinSkills";

import { Label } from "components/ui/Label";
import { getKeys } from "features/game/types/craftables";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { PIXEL_SCALE } from "features/game/lib/constants";

import animals from "assets/skills/land/skill-tree-icon/animals.png";
import cooking from "assets/skills/land/skill-tree-icon/cooking.png";
import crops from "assets/skills/land/skill-tree-icon/crops.png";
import rocks from "assets/skills/land/skill-tree-icon/rocks.png";
import trees from "assets/skills/land/skill-tree-icon/trees.png";
import { SquareIcon } from "components/ui/SquareIcon";
import { SkillBadges } from "./SkillBadges";
import { Bumpkin } from "features/game/types/game";

const iconList = {
  Crops: crops,
  Trees: trees,
  Rocks: rocks,
  Cooking: cooking,
  Animals: animals,
};

interface Props {
  onClick: (category: BumpkinSkillTree) => void;
  backNavigationView?: JSX.Element;
}

const CONTENT_HEIGHT = 380;

export const SkillCategoryList: React.FC<Props> = ({
  onClick,
  backNavigationView,
}) => {
  const { gameService } = useContext(Context);
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  const { bumpkin } = state;
  const hasSkills = getKeys(bumpkin?.skills || {}).length > 0;

  return (
    <div
      className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-2 overflow-y-auto scrollable"
      style={{ maxHeight: CONTENT_HEIGHT }}
    >
      <div className="flex flex-col flex-1 mr-1">
        <div className="h-8 flex items-center">{backNavigationView}</div>
        {SKILL_TREE_CATEGORIES.map((category) => {
          const skills = getSkills(category);
          const icon = iconList[skills[0].tree];
          const skillsAcquiredInCategoryCount = getKeys({
            ...bumpkin?.skills,
          }).filter((acquiredSkillName) =>
            skills.find((skill) => skill.name === acquiredSkillName)
          ).length;

          return (
            <div key={category} onClick={() => onClick(category)}>
              <OuterPanel
                className="flex relative items-center cursor-pointer hover:bg-brown-200"
                style={{
                  marginTop: `${PIXEL_SCALE * 2}px`,
                }}
              >
                <div className="flex justify-center items-center">
                  <SquareIcon icon={icon} width={14} />
                  <span className="text-sm ml-1">{category}</span>
                </div>
                <Label
                  type="pixelated"
                  className="absolute pointer-events-none"
                  style={{
                    top: `${PIXEL_SCALE * -5}px`,
                    right: `${PIXEL_SCALE * -3}px`,
                  }}
                >
                  {`${skillsAcquiredInCategoryCount}/${skills.length}`}
                </Label>
              </OuterPanel>
            </div>
          );
        })}
      </div>
      {hasSkills && (
        <div className="flex flex-col sm:w-2/6 mr-1">
          <div className="h-8 flex items-center">
            <span className="text-sm">My Skills</span>
          </div>
          <OuterPanel
            className="h-full"
            style={{
              paddingTop: `${PIXEL_SCALE * 2}px`,
              paddingLeft: `${PIXEL_SCALE * 2}px`,
              marginTop: `${PIXEL_SCALE * 2}px`,
            }}
          >
            <SkillBadges
              inventory={state.inventory}
              bumpkin={state.bumpkin as Bumpkin}
            />
          </OuterPanel>
        </div>
      )}
    </div>
  );
};
