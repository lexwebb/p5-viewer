// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { Sketches } from "../../dto/sketches";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sketches>
) {
  const fileNames =
    (process.env.P5_DIR && fs.readdirSync(process.env.P5_DIR)) || [];

  const filtered = fileNames.filter((fileName) => fileName.endsWith(".p5.js"));
  res.status(200).json({ files: filtered });
}
