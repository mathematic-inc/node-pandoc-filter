#!/usr/bin/env ts-node-script

import { copyFileSync, readFileSync, writeFileSync } from "fs";

copyFileSync("README.md", "lib/README.md");
copyFileSync("LICENSE", "lib/LICENSE");

const pkg = JSON.parse(readFileSync("package.json", { encoding: "utf-8" }));

delete pkg.directories;
delete pkg.private;
delete pkg.workspaces;
pkg.main = "index.js";

writeFileSync("lib/package.json", JSON.stringify(pkg));
