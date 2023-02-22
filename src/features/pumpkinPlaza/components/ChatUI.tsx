import React, { useState } from "react";

import { ChatText } from "./ChatText";
import { ChatReactions } from "./ChatReactions";
import { GameState } from "features/game/types/game";
import { ReactionName } from "../lib/reactions";
import { SUNNYSIDE } from "assets/sunnyside";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";

type TabView = "chat" | "reactions";

interface Props {
  game: GameState;
  onMessage: (content: { text?: string; reaction?: ReactionName }) => void;
}

export const ChatUI: React.FC<Props> = ({ onMessage, game }) => {
  const [tab, setTab] = useState<TabView>("chat");

  return (
    <div
      className="w-full flex justify-center fixed bottom-14 md:bottom-4 pl-2 pr-[73.5px] md:pr-2 z-40"
      onClick={console.log}
    >
      <CloseButtonPanel<TabView>
        className="w-full sm:w-[30rem]"
        tabs={[
          { icon: SUNNYSIDE.icons.expression_chat, name: "Chat", view: "chat" },
          { icon: SUNNYSIDE.icons.heart, name: "Reactions", view: "reactions" },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      >
        {tab === "chat" && (
          <ChatText onMessage={(text) => onMessage({ text })} />
        )}
        {tab === "reactions" && (
          <ChatReactions
            onReact={(reaction) => onMessage({ reaction })}
            game={game}
          />
        )}
      </CloseButtonPanel>
    </div>
  );
};
