import fs from "fs";
import glob from "glob";
import { serialize } from "next-mdx-remote/serialize";
import html from "remark-html";
import matter from "gray-matter";
import path from "path";
import remark from "remark";
import { format } from "date-fns";
import { Hike } from "./types";

type HikePathParams = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export const getHikePathParams = (hike: Hike): HikePathParams => {
  const date = new Date(hike.publication_date);

  return {
    year: format(date, "yyyy"),
    month: format(date, "MM"),
    day: format(date, "dd"),
    slug: hike.slug,
  };
};

const hikesDirectory = path.join(process.cwd(), "hikes");

export const getSortedHikesData = (): Hike[] => {
  const fileNames = glob.sync("*.md", { cwd: hikesDirectory });

  const allHikesData = fileNames.map((fileName: string): Hike => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(hikesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the hike metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      ...matterResult.data,
    } as Hike;
  });

  // Sort hikes by date
  const sortedHikes = allHikesData.sort(
    ({ publication_date: a }, { publication_date: b }) => {
      const dateA = new Date(a);
      const dateB = new Date(b);

      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    }
  );

  return sortedHikes.filter((hike: Hike) => hike.hidden !== true);
};

export const getHikesForTransportLine = (line: string): Hike[] => {
  const allHikes = getSortedHikesData();
  const hasLine = (hike: Hike, line: string): boolean => {
    if (
      hike.starting_point.line === line ||
      hike.starting_point.line.includes(line)
    ) {
      return true;
    }

    if (
      hike.ending_point?.line === line ||
      hike.ending_point?.line.includes(line)
    ) {
      return true;
    }

    return false;
  };

  const hikesForLine = allHikes.filter((hike) => hasLine(hike, line));

  return hikesForLine;
};

export const getAllHikePaths = async () => {
  const hikes = await getSortedHikesData();

  return hikes.map((hike) => ({ params: getHikePathParams(hike) }));
};

export const getHikeData = async (slug: string) => {
  const fullPath = path.join(hikesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the hike metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content)

  return {
    slug,
    mdxSource: await serialize(matterResult.content),
    ...matterResult.data,
  };
};
