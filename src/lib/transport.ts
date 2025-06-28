// TODO: use enums for lines
const RER_LINES = ["A", "B", "C", "D", "E"];
const TRAM_LINES = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
  "T13",
];
const TRANSILIEN_LINES = ["H", "J", "K", "L", "N", "P", "R", "U"];

export enum Network {
  RER,
  Tram,
  Transilien,
}

export const getLineNetwork = (line: string): Network => {
  if (isRER(line)) {
    return Network.RER;
  }

  if (isTram(line)) {
    return Network.Tram;
  }

  if (isTransilien(line)) {
    return Network.Transilien;
  }

  throw new Error("Network for line could not be found");
};

export const isRER = (line: string): boolean => RER_LINES.includes(line);
export const isTransilien = (line: string): boolean =>
  TRANSILIEN_LINES.includes(line);
export const isTram = (line: string): boolean => TRAM_LINES.includes(line);
