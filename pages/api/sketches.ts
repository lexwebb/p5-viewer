// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises, readdirSync } from "fs";
import { Sketches } from "../../dto/sketches";
import { resolve } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sketches>
) {
  const dir = process.env.P5_DIR;

  if (!dir) {
    res.statusCode = 500;
    throw new Error("Missing root directory configuration");
  }

  const fileNames = makeRelative(dir, await getFiles(dir));

  const filtered = fileNames.filter((fileName) => fileName.endsWith(".p5.js"));
  res.status(200).json({ files: filtered });
}

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

function makeRelative(root: string, files: string[]) {
  const resolvedRoot = resolve(root);
  return files.map((file) => file.replace(resolvedRoot + "\\", ""));
}
