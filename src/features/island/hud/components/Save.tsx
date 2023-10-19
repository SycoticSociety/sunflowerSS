import React, { useContext, useEffect, useState } from "react";
import { PIXEL_SCALE } from "features/game/lib/constants";
import saveIcon from "assets/icons/save.webp";
import loadingIcon from "assets/icons/timer.gif";
import { Context } from "features/game/GameProvider";
import { useActor } from "@xstate/react";
import classNames from "classnames";
import { SUNNYSIDE } from "assets/sunnyside";
import { saveGameState, loadGameState } from "../localStorageUtils"; // Import the utility functions

type ButtonState = "unsaved" | "inProgress" | "saved";

export const Save: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const playing =
    gameState.matches("playingGuestGame") ||
    gameState.matches("playingFullGame");
  const autoSaving = gameState.matches("autosaving");
  const hasUnsavedProgress = gameState.context.actions.length > 0;
  const savedWithoutError = playing && !hasUnsavedProgress;

  const [enableButton, setEnableButton] = useState<boolean>(false);
  const [disableSaveButtonTimer, setDisableSaveButtonTimer] = useState<number>();

  const showSaved = savedWithoutError && enableButton;
  const buttonState: ButtonState = autoSaving
    ? "inProgress"
    : showSaved
    ? "saved"
    : "unsaved";

  useEffect(() => {
    // show button when there are unsaved progress
    if (hasUnsavedProgress) {
      setEnableButton(true);
      setDisableSaveButtonTimer(
        clearTimeout(disableSaveButtonTimer) as undefined
      );
    }

    // hide button after 2 seconds when changes are saved
    if (showSaved) {
      setDisableSaveButtonTimer(
        window.setTimeout(() => setEnableButton(false), 2000)
      );
    }

    return () => clearTimeout(disableSaveButtonTimer);
  }, [playing && !hasUnsavedProgress]);

  // Function to save the game state
  const saveGame = (gameStateToSave) => {
    const serializedState = JSON.stringify(gameStateToSave);
    localStorage.setItem('gameState', serializedState);
  };

  // Function to load the saved game state
  const loadGame = () => {
    const serializedState = localStorage.getItem('gameState');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
    return null;
  };

  // Handle the save button click
  const save = () => {
    gameService.send("SAVE");

    // Get the current game state from your context or component state
    const currentGameState = gameState.context; // Modify this to get your game state

    // Save the game state
    saveGame(currentGameState);
  };

  // Handle the load button click
  const loadSavedGame = () => {
    const loadedGameState = loadGame();

    if (loadedGameState) {
      // Update the game state with the loaded data (replace this with your logic)
      gameService.send({ type: "LOAD_SAVED_GAME", loadedGameState });
    }
  };

  return (
    <div
      onClick={enableButton ? save : undefined}
      className={classNames({
        "cursor-pointer hover:img-highlight":
          enableButton && buttonState === "unsaved",
      })}
      style={{
        // right: `${PIXEL_SCALE * 3}px`,
        bottom: `${PIXEL_SCALE * 52}px`,
        width: `${PIXEL_SCALE * 22}px`,
      }}
    >
      {/* ... (existing code) */}

      {/* Add a load button in your game interface */}
      <button onClick={loadSavedGame}>Load Saved Game</button>
    </div>
  );
};
