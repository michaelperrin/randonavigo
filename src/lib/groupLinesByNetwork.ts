import { getLineNetwork } from "./transport";

export const groupLinesByNetwork = (lines: string[]): string[][] => {
  return lines.reduce((current: string[][], line: string) => {
    const network = getLineNetwork(line);

    if (!current[network]) {
      current[network] = [];
    }
    current[network].push(line);

    return current;
  }, []);
};
