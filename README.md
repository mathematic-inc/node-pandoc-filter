# Node.js Pandoc Filters

![CI](https://github.com/mu-io/node-pandoc-filter/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/mu-io/node-pandoc-filter/branch/main/graph/badge.svg?token=IKqBrTyEPs)](https://codecov.io/gh/mu-io/node-pandoc-filter)

> A Node.js framework for building
> [Pandoc filters](https://pandoc.org/filters.html#but-i-dont-want-to-learn-haskell)

- [Background](#background)
- [Documentation](#documentation)
- [Install](#install)
- [Getting Started](#getting-started)
- [Examples](#examples)
  - [JavaScript](#javascript)
  - [TypeScript](#typescript)
- [Compatibility](#compatibility)
- [License](#license)

## Background

Pandoc filters are executable scripts that Pandoc executes after compiling a document to Pandoc's
proprietary AST. The pathway is as follows:

1. Pandoc compiles the source document to an AST written in JSON.
2. Pandoc streams (via `stdin`) the AST to each filter sequentially.
3. Each filter outputs (via `stdout`) an augmented AST for Pandoc to read.
4. Pandoc compiles the AST to the targeted format.

## Documentation

Documentation is located [here](https://mu-io.github.io/node-pandoc-filter/).

## Install

You should install `node-pandoc-filter` globally for `pandoc` to execute Node.js-based filters:

```bash
npm install -g node-pandoc-filter
```

## Getting Started

This package comes with two entry points:

- [`node-pandoc-filter/nodes`](https://mu-io.github.io/node-pandoc-filter/modules/_nodes_index_.html):
  This is where all nodes (e.g. `Str`) and node-like creators (e.g. `Attr`) are imported from.
- [`node-pandoc-filter`](https://mu-io.github.io/node-pandoc-filter/modules/_index_.html): Everything else.

> The `Math` node is renamed to `Formula` as to not conflict with the internal `Math` object in JavaScript.

As stated previously, Pandoc filters are executable scripts, so you must use a
[hashbang](https://github.com/tc39/proposal-hashbang) at the top of each filter, targeting the
specific method of execution. For example, `#!/usr/bin/env node`.

> For TypeScript, you can use [`ts-node`](https://github.com/TypeStrong/ts-node) via it's
> `ts-node-script` executable rather than pre-compiling and using `node`. _If you are compiling many
> document_, this is **NOT RECOMMENDED**.

## Examples

### JavaScript

```javascript
#!/usr/bin/env node
const { Str } = require("node-pandoc-filter/nodes");
const { toJSONFilter } = require("node-pandoc-filter");
const requestPromise = require("request-promise-native");

toJSONFilter({
  async Str(value) {
    const data = await requestPromise({ uri: value, json: true });
    return Str(data.places[0]["post code"]);
  },
});
```

### TypeScript

```typescript
#!/usr/bin/env ts-node-script
import { Str } from "node-pandoc-filter/nodes";
import { toJSONFilter } from "node-pandoc-filter";
import itFilters from "../utils/it-filters";

toJSONFilter({
  async Str(value) {
    return Str(value.toUpperCase());
  },
});
```

## Compatibility

This package is compatible with

- Node.js >= v10
- Pandoc >= v1.17.2
  - If older compatibility is required, see
    [pandoc-filter-node](https://github.com/mvhenderson/pandoc-filter-node)

## License

Copyright © 2020 mu-io.

Licensed under [MIT](https://opensource.org/licenses/MIT).
