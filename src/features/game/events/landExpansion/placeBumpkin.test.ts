import { DEFAULT_BUMPKIN_POSITION } from "features/island/bumpkin/types/character";
import { INITIAL_BUMPKIN, TEST_FARM } from "../../lib/constants";
import { Bumpkins, GameState } from "../../types/game";
import { BUMPKIN_COOLDOWN, placeBumpkin } from "./placeBumpkin";

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
describe("placeBumpkin", () => {
  it("requires you have a single bumpkin in your wallet", () => {
    expect(() =>
      placeBumpkin({
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
          type: "bumpkin.placed",
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
      placeBumpkin({
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
          type: "bumpkin.placed",
          coordinates: {
            x: 2,
            y: 0,
          },
        },
      })
    ).toThrow("This Bumpkin does not exist in your wallet");
  });

  it("throws an error if the bumpkin is already placed", () => {
    expect(() =>
      placeBumpkin({
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
          id: 3,
          type: "bumpkin.placed",
          coordinates: {
            x: 2,
            y: 0,
          },
        },
      })
    ).toThrow("This Bumpkin is already placed");
  });

  it("throws an error if you do not have a placed tent", () => {
    expect(() =>
      placeBumpkin({
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
          id: 3,
          type: "bumpkin.placed",
          coordinates: {
            x: 2,
            y: 0,
          },
        },
      })
    ).toThrow("You do not have a placed tent");
  });

  it("throws an error if you already have the max number of bumpkins allowed", () => {
    expect(() =>
      placeBumpkin({
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
                  id: 2,
                  coordinates: DEFAULT_BUMPKIN_POSITION,
                  readyAt: 0,
                  createdAt: 0,
                },
                {
                  id: 3,
                  coordinates: DEFAULT_BUMPKIN_POSITION,
                  readyAt: 0,
                  createdAt: 0,
                },
              ],
            },
          },
          buildings: {
            Tent: [
              {
                id: "12345",
                readyAt: 0,
                createdAt: 0,
                coordinates: {
                  x: 0,
                  y: 0,
                },
              },
              {
                id: "678",
                readyAt: 0,
                createdAt: 0,
                coordinates: {
                  x: 0,
                  y: 0,
                },
              },
            ],
          },
        },
        action: {
          id: 4,
          type: "bumpkin.placed",
          coordinates: {
            x: 2,
            y: 0,
          },
        },
      })
    ).toThrow("You have exceeded your Bumpkin capacity");
  });

  it("places a bumpkin", () => {
    const dateNow = Date.now();

    const state = placeBumpkin({
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
        buildings: {
          Tent: [
            {
              id: "12345",
              readyAt: 0,
              createdAt: 0,
              coordinates: {
                x: 0,
                y: 0,
              },
            },
          ],
        },
      },
      action: {
        id: 4,
        type: "bumpkin.placed",
        coordinates: {
          x: 2,
          y: 0,
        },
      },
      createdAt: dateNow,
    });

    expect(state.bumpkins?.farming.others).toEqual([
      {
        id: 4,
        coordinates: { x: 2, y: 0 },
        createdAt: dateNow,
        readyAt: dateNow + BUMPKIN_COOLDOWN,
      },
    ]);
  });
});
