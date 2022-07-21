#! /usr/bin/env node

import { Command } from "commander";
const program = new Command();
import { exec } from "child_process";
import open from "open";
import { version } from "./package.json";

program
  .name("p5-viewer")
  .description("CLI to view p5 sketches locally")
  .version(version);

program
  .command("start")
  .description("start the server")
  .option("-d, --dir <dir>", "the directory to look for sketches in")
  .action((params: { dir: string }) => {
    const resolvedDir = params.dir ? params.dir : __dirname;
    console.log(resolvedDir);

    exec(
      "npm run start",
      { env: { ...process.env, P5_DIR: resolvedDir } },
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    console.log("Opening browser window, please wait...");
    open(`http://localhost:3000`);
    console.log("Opened browser window");
  });

program.parse();
