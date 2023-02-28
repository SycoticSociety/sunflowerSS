import { INITIAL_BUMPKIN, TEST_FARM } from "features/game/lib/constants";
import { Bumpkins, GameState } from "features/game/types/game";
import { DEFAULT_BUMPKIN_POSITION } from "features/island/bumpkin/types/character";
import { moveBumpkin } from "./moveBumpkin";

const WALLET_BUMPKINS: Bumpkins["wallet"] = {
  1: INITIAL_BUMPKIN,
  2: {
    ...INITIAL_BUMPKIN,
    id: 2,
  },
  3: {
    ...INITIAL_BUMPKIN,
    id: 3,
  },
  4: {
    ...INITIAL_BUMPKIN,
    id: 4,
  },
};

const GAME_STATE: GameState = TEST_FARM;

describe("moveBumpkin", () => {
  it("requires you have a single bumpkin in your wallet", () => {
    expect(() =>
      moveBumpkin({
        state: {
          ...GAME_STATE,
          bumpkins: {
            wallet: {},
            farming: {
              primary: {
                id: 1,
                coordinates: DEFAULT_BUMPKIN_POSITION,
                readyAt: 0,
                createdAt: 0,
              },
              others: [],
            },
          },
        },
        action: {
          id: 3,
          type: "bumpkin.moved",
          coordinates: {
            x: 2,
            y: 0,
          },
        },
      })
    ).toThrow("You do not have a Bumpkin");
  });

  it("throws an error if the bumpkin does not exist in your wallet", () => {
    expect(() =>
      moveBumpkin({
        state: {
          ...GAME_STATE,
          bumpkins: {
            wallet: WALLET_BUMPKINS,
            farming: {
              primary: {
                id: 1,
                coordinates: DEFAULT_BUMPKIN_POSITION,
                createdAt: 0,
                readyAt: 0,
              },
              others: [],
            },
          },
        },
        action: {
          id: 3345,
          type: "bumpkin.moved",
          coordinates: {
            x: 2,
            y: 0,
          },
        },
      })
    ).toThrow("This Bumpkin does not exist in your wallet");
  });

  it("throws and error if the bumpkin is not placed", () => {
    expect(() =>
      moveBumpkin({
        state: {
          ...GAME_STATE,
          bumpkins: {
            wallet: WALLET_BUMPKINS,
            farming: {
              primary: {
                id: 1,
                coordinates: DEFAULT_BUMPKIN_POSITION,
                createdAt: 0,
                readyAt: 0,
              },
              others: [],
            },
          },
        },
        action: {
          id: 3,
          type: "bumpkin.moved",
          coordinates: {
            x: 2,
            y: 0,
          },
        },
      })
    ).toThrow("This Bumpkin is not placed");
  });

  it("moves the primary bumpkin to the new coordinates", () => {
    const newCoordinates = {
      x: 2,
      y: 0,
    };

    const state: GameState = moveBumpkin({
      state: {
        ...GAME_STATE,
        bumpkins: {
          wallet: WALLET_BUMPKINS,
          farming: {
            primary: {
              id: 1,
              coordinates: DEFAULT_BUMPKIN_POSITION,
              createdAt: 0,
              readyAt: 0,
            },
            others: [
              {
                id: 2,
                coordinates: {
                  x: 1,
                  y: 3,
                },
                createdAt: 0,
                readyAt: 0,
              },
            ],
          },
        },
      },
      action: {
        id: 1,
        type: "bumpkin.moved",
        coordinates: newCoordinates,
      },
    });

    expect(state.bumpkins?.farming.primary.coordinates).toEqual(newCoordinates);
  });

  it("moves a non primary bumpkin to the new coordinates", () => {
    const newCoordinates = {
      x: 2,
      y: 0,
    };

    const state: GameState = moveBumpkin({
      state: {
        ...GAME_STATE,
        bumpkins: {
          wallet: WALLET_BUMPKINS,
          farming: {
            primary: {
              id: 1,
              coordinates: DEFAULT_BUMPKIN_POSITION,
              createdAt: 0,
              readyAt: 0,
            },
            others: [
              {
                id: 2,
                coordinates: {
                  x: 1,
                  y: 3,
                },
                createdAt: 0,
                readyAt: 0,
              },
            ],
          },
        },
      },
      action: {
        id: 2,
        type: "bumpkin.moved",
        coordinates: newCoordinates,
      },
    });

    const movedBumpkin = state.bumpkins?.farming.others.find(
      (bumpkin) => bumpkin.id === 2
    );

    expect(movedBumpkin?.coordinates).toEqual(newCoordinates);
  });
});
