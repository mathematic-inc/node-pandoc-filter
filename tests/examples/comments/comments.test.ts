import itFilters from "../utils/it-filters";

let isInComment = false;

/**
 * Pandoc filter that causes everything between '<!-- BEGIN COMMENT -->' and
 * '<!-- END COMMENT -->' to be ignored.  The comment lines must appear on lines
 * by themselves, with blank lines surrounding them.
 *
 * @see https://github.com/jgm/pandocfilters/blob/master/examples/comments.py
 */
itFilters("comments", __dirname, (node) => {
  switch (node.t) {
    case "RawBlock": {
      const [format, content] = node.c;

      switch (format) {
        case "html":
          if (content.indexOf("<!-- BEGIN COMMENT -->") > -1) {
            isInComment = true;

            return [];
          }

          if (content.indexOf("<!-- END COMMENT -->") > -1) {
            isInComment = false;

            return [];
          }

          break;
        default:
      }
      break;
    }
    default:
  }

  if (isInComment) return [];

  return undefined;
});
