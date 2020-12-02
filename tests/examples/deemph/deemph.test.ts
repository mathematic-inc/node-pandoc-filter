import { transform } from "../../../src";
import { Str } from "../../../src/nodes";
import itFilters from "../utils/it-filters";

/**
 * Pandoc filter that causes emphasized text to be displayed in ALL CAPS.
 *
 * @see https://github.com/jgm/pandocfilters/blob/master/examples/deemph.py
 */
itFilters("deemph", __dirname, {
  Emph(node, format, meta) {
    return transform(node, { Str: (value) => Str(value.toUpperCase()) }, format, meta);
  },
});
