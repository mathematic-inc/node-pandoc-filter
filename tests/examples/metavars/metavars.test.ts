import { Attr, Span, Str } from "../../../src/nodes";
import itFilters from "../utils/it-filters";

/**
 * Pandoc filter to allow interpolation of metadata fields into a document.
 * %\{fields\} will be replaced by the field's value, assuming it is of the type
 * MetaInlines or MetaString.
 *
 * @see https://github.com/jgm/pandocfilters/blob/master/examples/metavars.py
 */
itFilters("metavars", __dirname, {
  Str(value, _, meta) {
    const matches = value.match(/%\{(.*)\}$/);

    if (matches) {
      const [, field] = matches;
      const { [field as keyof typeof meta]: result } = meta;

      if (result) {
        switch (result.t) {
          case "MetaInlines":
            return Span(Attr({ classes: ["interpolated"], attributes: { field } }), result.c);
          case "MetaString":
            return Str(result.c);
          default:
            return undefined;
        }
      }
    }

    return undefined;
  },
});
