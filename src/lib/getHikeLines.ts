const getHikeLines = ({
  startingPointLines,
  endingPointLines,
}: {
  startingPointLines: string | string[];
  endingPointLines?: string | string[];
}): string[] => {
  let lines: string[] = [];

  if (Array.isArray(startingPointLines)) {
    lines.push(...startingPointLines);
  } else {
    lines.push(startingPointLines);
  }

  if (endingPointLines) {
    if (Array.isArray(endingPointLines)) {
      lines.push(...endingPointLines);
    } else {
      lines.push(endingPointLines);
    }
  }

  lines = Array.from(new Set(lines));
  lines = lines.sort();

  return lines;
};

export default getHikeLines;
