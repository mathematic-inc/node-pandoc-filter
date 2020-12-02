import { Str } from "../../../src/nodes";
import itFilters from "../utils/it-filters";

/**
 * Pandoc filter to convert all text to uppercase
 *
 * @see https://github.com/jgm/pandocfilters/blob/master/examples/caps.py
 */
itFilters("caps", __dirname, {
  async Str(value) {
    return Str(value.toUpperCase());
  },
});
