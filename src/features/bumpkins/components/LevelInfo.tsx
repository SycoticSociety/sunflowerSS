import React from "react";
import { ResizableBar } from "components/ui/ProgressBar";
import { SquareIcon } from "components/ui/SquareIcon";
import {
  getBumpkinLevel,
  getExperienceToNextLevel,
  isMaxLevel,
} from "features/game/lib/level";
import { Bumpkin } from "features/game/types/game";
import levelIcon from "assets/icons/level_up.png";
import classNames from "classnames";

interface Props {
  bumpkin: Bumpkin;
  className?: string;
}

export const LevelInfo: React.FC<Props> = ({ bumpkin, className }) => {
  const experience = bumpkin.experience ?? 0;
  const level = getBumpkinLevel(experience);
  const maxLevel = isMaxLevel(experience);
  const { currentExperienceProgress, experienceToNextLevel } =
    getExperienceToNextLevel(experience);

  return (
    <div className={classNames("flex flex-col items-start", className)}>
      <p className="whitespace-nowrap">{`Level ${level}${
        maxLevel ? " (Max)" : ""
      }`}</p>
      <div className="flex flex-row items-center my-1">
        <SquareIcon icon={levelIcon} width={7} />
        <p className="text-xxs ml-1">
          {`${Math.floor(currentExperienceProgress)}/${
            maxLevel ? " -" : Math.floor(experienceToNextLevel)
          } XP`}
        </p>
      </div>
      <ResizableBar
        percentage={(currentExperienceProgress / experienceToNextLevel) * 100}
        type={"progress"}
        outerDimensions={{ width: 48, height: 7 }}
      />
    </div>
  );
};
