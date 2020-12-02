import { BulletList, Para, Strong } from "../../../src/nodes";
import itFilters from "../utils/it-filters";

/**
 * Pandoc filter to convert definition lists to bullet lists with the defined
 * terms in strong emphasis (for compatibility with standard markdown).
 *
 * @see https://github.com/jgm/pandocfilters/blob/master/examples/deflists.py
 */
itFilters("deflist", __dirname, {
  DefinitionList(nodes) {
    return BulletList(nodes.map(([term, defs]) => [defs.flat(), [Para([Strong(term)])]]).flat());
  },
});
