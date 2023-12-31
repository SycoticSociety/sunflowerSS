import { Coordinates } from "features/game/expansion/components/MapPlacement";
export type RestrictedPositions = Record<number, Record<number, boolean>>;

const PLAZA_COORDS: Coordinates[] = [
  {
    x: 38,
    y: 21,
  },
  {
    x: 38,
    y: 22,
  },
  {
    x: 37,
    y: 22,
  },
  {
    x: 37,
    y: 23,
  },
  {
    x: 38,
    y: 23,
  },
  {
    x: 39,
    y: 23,
  },
  {
    x: 39,
    y: 22,
  },
  {
    x: 39,
    y: 21,
  },
  {
    x: 40,
    y: 21,
  },
  {
    x: 40,
    y: 22,
  },
  {
    x: 41,
    y: 22,
  },
  {
    x: 42,
    y: 22,
  },
  {
    x: 40,
    y: 23,
  },
  {
    x: 41,
    y: 23,
  },
  {
    x: 42,
    y: 23,
  },
  {
    x: 43,
    y: 23,
  },
  {
    x: 44,
    y: 24,
  },
  {
    x: 45,
    y: 24,
  },
  {
    x: 46,
    y: 24,
  },
  {
    x: 46,
    y: 23,
  },
  {
    x: 47,
    y: 23,
  },
  {
    x: 47,
    y: 24,
  },
  {
    x: 47,
    y: 25,
  },
  {
    x: 47,
    y: 26,
  },
  {
    x: 47,
    y: 27,
  },
  {
    x: 47,
    y: 28,
  },
  {
    x: 48,
    y: 28,
  },
  {
    x: 48,
    y: 27,
  },
  {
    x: 48,
    y: 29,
  },
  {
    x: 48,
    y: 30,
  },
  {
    x: 47,
    y: 31,
  },
  {
    x: 46,
    y: 31,
  },
  {
    x: 46,
    y: 30,
  },
  {
    x: 46,
    y: 29,
  },
  {
    x: 47,
    y: 29,
  },
  {
    x: 46,
    y: 28,
  },
  {
    x: 46,
    y: 27,
  },
  {
    x: 46,
    y: 26,
  },
  {
    x: 46,
    y: 25,
  },
  {
    x: 45,
    y: 25,
  },
  {
    x: 44,
    y: 25,
  },
  {
    x: 43,
    y: 24,
  },
  {
    x: 43,
    y: 25,
  },
  {
    x: 43,
    y: 26,
  },
  {
    x: 44,
    y: 26,
  },
  {
    x: 45,
    y: 26,
  },
  {
    x: 45,
    y: 27,
  },
  {
    x: 44,
    y: 27,
  },
  {
    x: 43,
    y: 27,
  },
  {
    x: 43,
    y: 28,
  },
  {
    x: 44,
    y: 28,
  },
  {
    x: 45,
    y: 28,
  },
  {
    x: 45,
    y: 29,
  },
  {
    x: 44,
    y: 29,
  },
  {
    x: 42,
    y: 29,
  },
  {
    x: 43,
    y: 29,
  },
  {
    x: 42,
    y: 28,
  },
  {
    x: 41,
    y: 28,
  },
  {
    x: 39,
    y: 28,
  },
  {
    x: 39,
    y: 29,
  },
  {
    x: 40,
    y: 29,
  },
  {
    x: 40,
    y: 28,
  },
  {
    x: 40,
    y: 27,
  },
  {
    x: 40,
    y: 26,
  },
  {
    x: 40,
    y: 25,
  },
  {
    x: 40,
    y: 24,
  },
  {
    x: 39,
    y: 24,
  },
  {
    x: 38,
    y: 24,
  },
  {
    x: 37,
    y: 24,
  },
  {
    x: 35,
    y: 25,
  },
  {
    x: 36,
    y: 25,
  },
  {
    x: 37,
    y: 25,
  },
  {
    x: 38,
    y: 25,
  },
  {
    x: 39,
    y: 25,
  },
  {
    x: 39,
    y: 26,
  },
  {
    x: 38,
    y: 26,
  },
  {
    x: 37,
    y: 26,
  },
  {
    x: 35,
    y: 26,
  },
  {
    x: 36,
    y: 26,
  },
  {
    x: 35,
    y: 27,
  },
  {
    x: 36,
    y: 27,
  },
  {
    x: 35,
    y: 28,
  },
  {
    x: 36,
    y: 28,
  },
  {
    x: 37,
    y: 28,
  },
  {
    x: 37,
    y: 27,
  },
  {
    x: 38,
    y: 27,
  },
  {
    x: 39,
    y: 27,
  },
  {
    x: 38,
    y: 28,
  },
  {
    x: 37,
    y: 29,
  },
  {
    x: 38,
    y: 29,
  },
  {
    x: 37,
    y: 30,
  },
  {
    x: 36,
    y: 31,
  },
  {
    x: 37,
    y: 31,
  },
  {
    x: 38,
    y: 31,
  },
  {
    x: 38,
    y: 30,
  },
  {
    x: 39,
    y: 30,
  },
  {
    x: 39,
    y: 31,
  },
  {
    x: 40,
    y: 31,
  },
  {
    x: 40,
    y: 30,
  },
  {
    x: 41,
    y: 29,
  },
  {
    x: 42,
    y: 30,
  },
  {
    x: 41,
    y: 30,
  },
  {
    x: 43,
    y: 30,
  },
  {
    x: 44,
    y: 30,
  },
  {
    x: 45,
    y: 30,
  },
  {
    x: 45,
    y: 31,
  },
  {
    x: 44,
    y: 31,
  },
  {
    x: 43,
    y: 31,
  },
  {
    x: 42,
    y: 31,
  },
  {
    x: 41,
    y: 31,
  },
  {
    x: 42,
    y: 32,
  },
  {
    x: 41,
    y: 32,
  },
  {
    x: 40,
    y: 32,
  },
  {
    x: 40,
    y: 33,
  },
  {
    x: 40,
    y: 34,
  },
  {
    x: 40,
    y: 35,
  },
  {
    x: 41,
    y: 35,
  },
  {
    x: 42,
    y: 35,
  },
];

const BEACH_COORDS: Coordinates[] = [
  {
    x: 43,
    y: 25,
  },
  {
    x: 44,
    y: 25,
  },
  {
    x: 45,
    y: 25,
  },
  {
    x: 45,
    y: 24,
  },
  {
    x: 45,
    y: 23,
  },
  {
    x: 44,
    y: 24,
  },
  {
    x: 43,
    y: 24,
  },
  {
    x: 42,
    y: 24,
  },
  {
    x: 41,
    y: 24,
  },
  {
    x: 42,
    y: 23,
  },
  {
    x: 42,
    y: 22,
  },
  {
    x: 40,
    y: 24,
  },
  {
    x: 39,
    y: 24,
  },
  {
    x: 39,
    y: 25,
  },
  {
    x: 40,
    y: 25,
  },
  {
    x: 42,
    y: 25,
  },
  {
    x: 41,
    y: 25,
  },
  {
    x: 41,
    y: 26,
  },
  {
    x: 41,
    y: 27,
  },
  {
    x: 41,
    y: 28,
  },
  {
    x: 40,
    y: 26,
  },
  {
    x: 39,
    y: 26,
  },
  {
    x: 38,
    y: 26,
  },
  {
    x: 37,
    y: 26,
  },
  {
    x: 36,
    y: 26,
  },
  {
    x: 36,
    y: 27,
  },
  {
    x: 37,
    y: 27,
  },
  {
    x: 38,
    y: 27,
  },
  {
    x: 38,
    y: 28,
  },
  {
    x: 37,
    y: 28,
  },
  {
    x: 36,
    y: 28,
  },
  {
    x: 35,
    y: 27,
  },
  {
    x: 34,
    y: 27,
  },
  {
    x: 35,
    y: 28,
  },
  {
    x: 35,
    y: 29,
  },
  {
    x: 36,
    y: 29,
  },
  {
    x: 37,
    y: 29,
  },
  {
    x: 38,
    y: 29,
  },
  {
    x: 39,
    y: 29,
  },
  {
    x: 40,
    y: 29,
  },
  {
    x: 42,
    y: 29,
  },
  {
    x: 41,
    y: 29,
  },
  {
    x: 43,
    y: 29,
  },
  {
    x: 44,
    y: 29,
  },
  {
    x: 44,
    y: 28,
  },
  {
    x: 44,
    y: 27,
  },
  {
    x: 44,
    y: 26,
  },
  {
    x: 45,
    y: 26,
  },
  {
    x: 46,
    y: 26,
  },
  {
    x: 46,
    y: 25,
  },
  {
    x: 47,
    y: 25,
  },
  {
    x: 48,
    y: 25,
  },
  {
    x: 47,
    y: 26,
  },
  {
    x: 48,
    y: 26,
  },
  {
    x: 49,
    y: 26,
  },
  {
    x: 49,
    y: 27,
  },
  {
    x: 47,
    y: 27,
  },
  {
    x: 47,
    y: 28,
  },
  {
    x: 47,
    y: 29,
  },
  {
    x: 48,
    y: 29,
  },
  {
    x: 49,
    y: 28,
  },
  {
    x: 48,
    y: 30,
  },
  {
    x: 47,
    y: 30,
  },
  {
    x: 46,
    y: 30,
  },
  {
    x: 46,
    y: 28,
  },
  {
    x: 46,
    y: 27,
  },
  {
    x: 45,
    y: 27,
  },
  {
    x: 45,
    y: 28,
  },
  {
    x: 45,
    y: 29,
  },
  {
    x: 46,
    y: 29,
  },
  {
    x: 45,
    y: 30,
  },
  {
    x: 44,
    y: 30,
  },
  {
    x: 43,
    y: 30,
  },
  {
    x: 42,
    y: 30,
  },
  {
    x: 41,
    y: 30,
  },
  {
    x: 39,
    y: 30,
  },
  {
    x: 40,
    y: 30,
  },
  {
    x: 38,
    y: 30,
  },
  {
    x: 36,
    y: 30,
  },
  {
    x: 37,
    y: 30,
  },
  {
    x: 35,
    y: 30,
  },
  {
    x: 36,
    y: 31,
  },
  {
    x: 37,
    y: 31,
  },
  {
    x: 38,
    y: 31,
  },
  {
    x: 39,
    y: 31,
  },
  {
    x: 40,
    y: 31,
  },
  {
    x: 41,
    y: 31,
  },
  {
    x: 43,
    y: 31,
  },
  {
    x: 42,
    y: 31,
  },
  {
    x: 44,
    y: 31,
  },
  {
    x: 46,
    y: 31,
  },
  {
    x: 45,
    y: 31,
  },
  {
    x: 45,
    y: 32,
  },
  {
    x: 44,
    y: 32,
  },
  {
    x: 46,
    y: 32,
  },
  {
    x: 41,
    y: 32,
  },
  {
    x: 41,
    y: 33,
  },
  {
    x: 40,
    y: 34,
  },
  {
    x: 41,
    y: 34,
  },
  {
    x: 41,
    y: 35,
  },
  {
    x: 42,
    y: 35,
  },
  {
    x: 42,
    y: 28,
  },
  {
    x: 43,
    y: 28,
  },
  {
    x: 42,
    y: 26,
  },
  {
    x: 43,
    y: 26,
  },
  {
    x: 39,
    y: 27,
  },
  {
    x: 40,
    y: 27,
  },
  {
    x: 48,
    y: 28,
  },
  {
    x: 38,
    y: 32,
  },
];

const HQ_COORDS = [
  {
    x: 46,
    y: 34,
  },
  {
    x: 47,
    y: 34,
  },
  {
    x: 44,
    y: 34,
  },
  {
    x: 43,
    y: 34,
  },
  {
    x: 42,
    y: 34,
  },
  {
    x: 41,
    y: 34,
  },
  {
    x: 39,
    y: 34,
  },
  {
    x: 38,
    y: 33,
  },
  {
    x: 37,
    y: 33,
  },
  {
    x: 37,
    y: 31,
  },
  {
    x: 38,
    y: 31,
  },
  {
    x: 39,
    y: 31,
  },
  {
    x: 40,
    y: 31,
  },
  {
    x: 41,
    y: 31,
  },
  {
    x: 43,
    y: 31,
  },
  {
    x: 44,
    y: 31,
  },
  {
    x: 42,
    y: 31,
  },
  {
    x: 46,
    y: 31,
  },
  {
    x: 45,
    y: 31,
  },
  {
    x: 47,
    y: 31,
  },
  {
    x: 47,
    y: 32,
  },
  {
    x: 46,
    y: 32,
  },
  {
    x: 45,
    y: 32,
  },
  {
    x: 44,
    y: 32,
  },
  {
    x: 43,
    y: 32,
  },
  {
    x: 42,
    y: 32,
  },
  {
    x: 41,
    y: 32,
  },
  {
    x: 40,
    y: 32,
  },
  {
    x: 36,
    y: 30,
  },
  {
    x: 37,
    y: 30,
  },
  {
    x: 38,
    y: 30,
  },
  {
    x: 39,
    y: 30,
  },
  {
    x: 40,
    y: 30,
  },
  {
    x: 42,
    y: 30,
  },
  {
    x: 41,
    y: 30,
  },
  {
    x: 43,
    y: 30,
  },
  {
    x: 44,
    y: 30,
  },
  {
    x: 46,
    y: 30,
  },
  {
    x: 45,
    y: 30,
  },
  {
    x: 47,
    y: 30,
  },
  {
    x: 47,
    y: 29,
  },
  {
    x: 47,
    y: 28,
  },
  {
    x: 46,
    y: 27,
  },
  {
    x: 45,
    y: 27,
  },
  {
    x: 44,
    y: 27,
  },
  {
    x: 43,
    y: 27,
  },
  {
    x: 42,
    y: 27,
  },
  {
    x: 41,
    y: 27,
  },
  {
    x: 43,
    y: 28,
  },
  {
    x: 44,
    y: 28,
  },
  {
    x: 46,
    y: 28,
  },
  {
    x: 45,
    y: 28,
  },
  {
    x: 46,
    y: 29,
  },
  {
    x: 47,
    y: 27,
  },
  {
    x: 44,
    y: 29,
  },
  {
    x: 43,
    y: 29,
  },
  {
    x: 41,
    y: 29,
  },
  {
    x: 42,
    y: 28,
  },
  {
    x: 41,
    y: 28,
  },
  {
    x: 42,
    y: 29,
  },
  {
    x: 40,
    y: 29,
  },
  {
    x: 39,
    y: 29,
  },
  {
    x: 38,
    y: 29,
  },
  {
    x: 36,
    y: 29,
  },
  {
    x: 37,
    y: 29,
  },
  {
    x: 36,
    y: 28,
  },
  {
    x: 37,
    y: 28,
  },
  {
    x: 38,
    y: 28,
  },
  {
    x: 39,
    y: 28,
  },
  {
    x: 40,
    y: 28,
  },
  {
    x: 38,
    y: 26,
  },
  {
    x: 39,
    y: 26,
  },
  {
    x: 41,
    y: 25,
  },
  {
    x: 42,
    y: 25,
  },
  {
    x: 43,
    y: 25,
  },
  {
    x: 44,
    y: 25,
  },
  {
    x: 44,
    y: 24,
  },
  {
    x: 44,
    y: 23,
  },
  {
    x: 44,
    y: 22,
  },
  {
    x: 43,
    y: 22,
  },
  {
    x: 42,
    y: 22,
  },
  {
    x: 41,
    y: 22,
  },
  {
    x: 41,
    y: 23,
  },
  {
    x: 42,
    y: 23,
  },
  {
    x: 43,
    y: 23,
  },
  {
    x: 43,
    y: 24,
  },
  {
    x: 42,
    y: 24,
  },
  {
    x: 41,
    y: 24,
  },
  {
    x: 39,
    y: 23,
  },
  {
    x: 39,
    y: 24,
  },
  {
    x: 39,
    y: 22,
  },
  {
    x: 40,
    y: 20,
  },
  {
    x: 41,
    y: 20,
  },
  {
    x: 42,
    y: 20,
  },
  {
    x: 44,
    y: 20,
  },
  {
    x: 45,
    y: 20,
  },
  {
    x: 46,
    y: 20,
  },
  {
    x: 47,
    y: 25,
  },
  {
    x: 36,
    y: 26,
  },
  {
    x: 35,
    y: 26,
  },
];

const STONE_HAVEN_COORDS = [
  {
    x: 43,
    y: 18,
  },
  {
    x: 44,
    y: 19,
  },
  {
    x: 45,
    y: 19,
  },
  {
    x: 46,
    y: 19,
  },
  {
    x: 44,
    y: 20,
  },
  {
    x: 45,
    y: 20,
  },
  {
    x: 46,
    y: 20,
  },
  {
    x: 44,
    y: 21,
  },
  {
    x: 45,
    y: 21,
  },
  {
    x: 46,
    y: 21,
  },
  {
    x: 47,
    y: 21,
  },
  {
    x: 37,
    y: 23,
  },
  {
    x: 36,
    y: 23,
  },
  {
    x: 35,
    y: 23,
  },
  {
    x: 35,
    y: 24,
  },
  {
    x: 37,
    y: 24,
  },
  {
    x: 34,
    y: 24,
  },
  {
    x: 34,
    y: 23,
  },
  {
    x: 45,
    y: 24,
  },
  {
    x: 46,
    y: 24,
  },
  {
    x: 45,
    y: 25,
  },
  {
    x: 46,
    y: 25,
  },
  {
    x: 44,
    y: 25,
  },
  {
    x: 44,
    y: 26,
  },
  {
    x: 45,
    y: 26,
  },
  {
    x: 46,
    y: 26,
  },
  {
    x: 46,
    y: 27,
  },
  {
    x: 47,
    y: 27,
  },
  {
    x: 47,
    y: 28,
  },
  {
    x: 46,
    y: 28,
  },
  {
    x: 45,
    y: 28,
  },
  {
    x: 44,
    y: 28,
  },
  {
    x: 43,
    y: 28,
  },
  {
    x: 42,
    y: 28,
  },
  {
    x: 41,
    y: 28,
  },
  {
    x: 40,
    y: 28,
  },
  {
    x: 39,
    y: 28,
  },
  {
    x: 40,
    y: 27,
  },
  {
    x: 42,
    y: 27,
  },
  {
    x: 41,
    y: 27,
  },
  {
    x: 43,
    y: 27,
  },
  {
    x: 44,
    y: 27,
  },
  {
    x: 45,
    y: 27,
  },
  {
    x: 46,
    y: 29,
  },
  {
    x: 45,
    y: 29,
  },
  {
    x: 44,
    y: 29,
  },
  {
    x: 42,
    y: 29,
  },
  {
    x: 41,
    y: 29,
  },
  {
    x: 40,
    y: 29,
  },
  {
    x: 43,
    y: 29,
  },
  {
    x: 43,
    y: 30,
  },
  {
    x: 44,
    y: 30,
  },
  {
    x: 45,
    y: 30,
  },
  {
    x: 45,
    y: 31,
  },
  {
    x: 44,
    y: 31,
  },
  {
    x: 43,
    y: 31,
  },
  {
    x: 43,
    y: 32,
  },
  {
    x: 44,
    y: 32,
  },
  {
    x: 45,
    y: 32,
  },
  {
    x: 42,
    y: 32,
  },
  {
    x: 41,
    y: 32,
  },
  {
    x: 39,
    y: 31,
  },
  {
    x: 40,
    y: 31,
  },
  {
    x: 40,
    y: 30,
  },
  {
    x: 41,
    y: 33,
  },
  {
    x: 42,
    y: 33,
  },
  {
    x: 43,
    y: 33,
  },
  {
    x: 44,
    y: 33,
  },
  {
    x: 41,
    y: 34,
  },
  {
    x: 42,
    y: 34,
  },
  {
    x: 43,
    y: 34,
  },
  {
    x: 42,
    y: 35,
  },
  {
    x: 41,
    y: 36,
  },
  {
    x: 42,
    y: 36,
  },
  {
    x: 43,
    y: 36,
  },
  {
    x: 43,
    y: 35,
  },
  {
    x: 41,
    y: 40,
  },
  {
    x: 42,
    y: 40,
  },
  {
    x: 43,
    y: 40,
  },
  {
    x: 44,
    y: 40,
  },
  {
    x: 36,
    y: 35,
  },
  {
    x: 36,
    y: 33,
  },
  {
    x: 35,
    y: 33,
  },
  {
    x: 49,
    y: 30,
  },
  {
    x: 48,
    y: 30,
  },
  {
    x: 49,
    y: 31,
  },
  {
    x: 48,
    y: 33,
  },
  {
    x: 48,
    y: 34,
  },
  {
    x: 44,
    y: 34,
  },
  {
    x: 44,
    y: 35,
  },
  {
    x: 45,
    y: 34,
  },
  {
    x: 45,
    y: 35,
  },
];
/**
 * Easily accessible { 1: { 2: true, 3: true}}
 * x: 1, y: 2 & x: 1 & y: 3
 */
export const ALLOWED_PLAZA_AREA: RestrictedPositions = PLAZA_COORDS.reduce(
  (acc, coords) => {
    const xPositions = acc[coords.x] ?? {};

    return {
      ...acc,
      [coords.x]: {
        ...xPositions,
        [coords.y]: true,
      },
    };
  },
  {} as RestrictedPositions
);

export const ALLOWED_BEACH_AREA: RestrictedPositions = BEACH_COORDS.reduce(
  (acc, coords) => {
    const xPositions = acc[coords.x] ?? {};

    return {
      ...acc,
      [coords.x]: {
        ...xPositions,
        [coords.y]: true,
      },
    };
  },
  {} as RestrictedPositions
);

export const ALLOWED_HQ_AREA: RestrictedPositions = HQ_COORDS.reduce(
  (acc, coords) => {
    const xPositions = acc[coords.x] ?? {};

    return {
      ...acc,
      [coords.x]: {
        ...xPositions,
        [coords.y]: true,
      },
    };
  },
  {} as RestrictedPositions
);

export const ALLOWED_STONE_HAVEN_AREA: RestrictedPositions =
  STONE_HAVEN_COORDS.reduce((acc, coords) => {
    const xPositions = acc[coords.x] ?? {};

    return {
      ...acc,
      [coords.x]: {
        ...xPositions,
        [coords.y]: true,
      },
    };
  }, {} as RestrictedPositions);
