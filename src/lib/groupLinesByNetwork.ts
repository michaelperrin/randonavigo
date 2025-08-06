import { getLineNetwork, Network } from "./transport";

export const groupLinesByNetwork = (
  lines: string[]
): Record<Network, string[]> => {
  const result: Record<Network, string[]> = {
    [Network.RER]: [],
    [Network.Tram]: [],
    [Network.Transilien]: [],
  };

  lines.forEach((line: string) => {
    const network = getLineNetwork(line);
    result[network].push(line);
  });

  return result;
};
