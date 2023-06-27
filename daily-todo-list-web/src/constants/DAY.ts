export const DAY = {
  MON: "MON",
  TUE: "TUE",
  WED: "WED",
  THR: "THR",
  FRI: "FRI",
  SAT: "SAT",
  SUN: "SUN",
} as const;

export const DAYS = [
  DAY.MON,
  DAY.TUE,
  DAY.WED,
  DAY.THR,
  DAY.FRI,
  DAY.SAT,
  DAY.SUN,
] as const;

export type Day = keyof typeof DAY;
