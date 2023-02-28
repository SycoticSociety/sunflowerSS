import { DEFAULT_BUMPKIN_POSITION } from "features/island/bumpkin/types/character";
import { INITIAL_BUMPKIN, TEST_FARM } from "../../lib/constants";
import { Bumpkins, GameState } from "../../types/game";
import { removeBumpkin } from "./removeBumpkin";

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
describe("removeBumpkin", () => {
  it("requires you have a single bumpkin in your wallet", () => {
    expect(() =>
      removeBumpkin({
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
          type: "bumpkin.removed",
        },
      })
    ).toThrow("You do not have a Bumpkin");
  });

  it("throws an error if the bumpkin does not exist in your wallet", () => {
    expect(() =>
      removeBumpkin({
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
          type: "bumpkin.removed",
        },
      })
    ).toThrow("This Bumpkin does not exist in your wallet");
  });

  it("throws an error if the bumpkin is not currently placed", () => {
    expect(() =>
      removeBumpkin({
        state: {
          ...GAME_STATE,
          bumpkins: {
            wallet: WALLET_BUMPKINS,
            farming: {
              primary: {
                id: 1,
                coordinates: DEFAULT_BUMPKIN_POSITION,
                readyAt: 0,
                createdAt: 0,
              },
              others: [
                {
                  id: 3,
                  coordinates: DEFAULT_BUMPKIN_POSITION,
                  readyAt: 0,
                  createdAt: 0,
                },
              ],
            },
          },
        },
        action: {
          id: 2,
          type: "bumpkin.removed",
        },
      })
    ).toThrow("This Bumpkin is not placed");
  });

  it("throws an error if you try to remove your primary bumpkin when no other bumpkins are placed", () => {
    expect(() =>
      removeBumpkin({
        state: {
          ...GAME_STATE,
          bumpkins: {
            wallet: WALLET_BUMPKINS,
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
          id: 1,
          type: "bumpkin.removed",
        },
      })
    ).toThrow("You cannot remove your only farming Bumpkin");
  });

  it("removes a non primary bumpkin from the farm", () => {
    const state = removeBumpkin({
      state: {
        ...GAME_STATE,
        bumpkins: {
          wallet: WALLET_BUMPKINS,
          farming: {
            primary: {
              id: 1,
              coordinates: DEFAULT_BUMPKIN_POSITION,
              readyAt: 0,
              createdAt: 0,
            },
            others: [
              {
                id: 3,
                coordinates: {
                  x: 1,
                  y: 1,
                },
                readyAt: 0,
                createdAt: 0,
              },
            ],
          },
        },
      },
      action: {
        id: 3,
        type: "bumpkin.removed",
      },
    });

    expect(state.bumpkins?.farming.others).toHaveLength(0);
  });

  it("removes a non primary bumpkin from the farm and reassigns the primary position to the first other farming bumpkin", () => {
    const state = removeBumpkin({
      state: {
        ...GAME_STATE,
        bumpkins: {
          wallet: WALLET_BUMPKINS,
          farming: {
            primary: {
              id: 1,
              coordinates: DEFAULT_BUMPKIN_POSITION,
              readyAt: 0,
              createdAt: 0,
            },
            others: [
              {
                id: 3,
                coordinates: {
                  x: 1,
                  y: 1,
                },
                readyAt: 0,
                createdAt: 0,
              },
            ],
          },
        },
      },
      action: {
        id: 1,
        type: "bumpkin.removed",
      },
    });

    expect(state.bumpkins?.farming.primary).toEqual({
      id: 3,
      coordinates: {
        x: 1,
        y: 1,
      },
      readyAt: 0,
      createdAt: 0,
    });
    expect(state.bumpkins?.farming.others).toHaveLength(0);
  });
});
