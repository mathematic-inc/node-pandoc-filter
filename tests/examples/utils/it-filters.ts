import { execSync, spawnSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { extname, join, resolve } from "path";
import { Document, filter } from "../../../src";
import { Visitor } from "../../../src/types/visitor";

function getFileFormat(filePath: string) {
  const ext = extname(filePath);

  switch (ext) {
    case ".md":
      return "markdown";
    case ".tex":
      return "latex";
    default:
      throw new Error(`Extension ${ext} is not supported`);
  }
}

export default function itFilters(name: string, folder: string, visitor: Visitor): void {
  describe(`${name} tests`, () => {
    const astPath = resolve(folder, "source.ast");

    let sourcePath = "";
    let sourceFormat = "";
    let compiledDocument: Document;

    it(`should verify initially compiled AST has not changed`, () => {
      if (!process.env.JEST_CI) {
        sourcePath = join(
          folder,
          execSync(`ls -a ${folder} | grep "source.[^a]"`, { encoding: "utf-8" }).trim()
        );
        sourceFormat = getFileFormat(sourcePath);
        compiledDocument = JSON.parse(
          execSync(`pandoc -f ${sourceFormat} -t json ${sourcePath}`).toString()
        );

        if (!existsSync(astPath)) {
          writeFileSync(astPath, JSON.stringify(compiledDocument));
        }
      } else {
        compiledDocument = JSON.parse(readFileSync(astPath, { encoding: "utf-8" }));
      }

      expect(compiledDocument).toMatchSnapshot();
    });

    let document: Document;

    it(`should verify ${name} filter is valid`, async () => {
      document = await filter(compiledDocument, visitor);
      expect(document).toMatchSnapshot();
    });

    it(`should compile the transformed document without error`, async () => {
      let stderr = "";

      if (!process.env.JEST_CI) {
        stderr = spawnSync(
          "pandoc",
          ["-f", "json", "-t", sourceFormat, "-o", resolve(folder, "target.md")],
          {
            input: JSON.stringify(document),
            encoding: "utf-8",
          }
        ).stderr;
      }

      expect(stderr).toBe("");
    });
  });
}
