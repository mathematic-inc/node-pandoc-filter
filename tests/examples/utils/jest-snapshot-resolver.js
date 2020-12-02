// eslint-disable-next-line @typescript-eslint/no-var-requires
const { basename, format, extname, dirname, join } = require("path");

function extname2(path, ext) {
  return extname(basename(path, ext));
}

exports.resolveSnapshotPath = (testPath, snapshotExtension) =>
  format({
    name: basename(testPath, `.test${extname(testPath)}`),
    dir: dirname(testPath),
    ext: `.baseline${extname(testPath)}${snapshotExtension}`,
  });

exports.resolveTestPath = (snapshotFilePath, snapshotExtension) =>
  format({
    name: basename(
      snapshotFilePath,
      `.baseline${extname2(snapshotFilePath, snapshotExtension)}${snapshotExtension}`
    ),
    dir: dirname(snapshotFilePath),
    ext: `.test${extname2(snapshotFilePath, snapshotExtension)}`,
  });

exports.testPathForConsistencyCheck = join("tests", "example.test.ts");
