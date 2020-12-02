import {
  Attributes,
  Citation as CitationObject,
  CitationModeNode,
  InlineNode,
  NodeType,
} from "../types";
import { nodeCreatorFactory } from "../utils";

export const Plain = nodeCreatorFactory(NodeType.Plain, 1);
export const Para = nodeCreatorFactory(NodeType.Para, 1);
export const CodeBlock = nodeCreatorFactory(NodeType.CodeBlock, 2);
export const RawBlock = nodeCreatorFactory(NodeType.RawBlock, 2);
export const BlockQuote = nodeCreatorFactory(NodeType.BlockQuote, 1);
export const OrderedList = nodeCreatorFactory(NodeType.OrderedList, 2);
export const BulletList = nodeCreatorFactory(NodeType.BulletList, 1);
export const DefinitionList = nodeCreatorFactory(NodeType.DefinitionList, 1);
export const Header = nodeCreatorFactory(NodeType.Header, 3);
export const HorizontalRule = nodeCreatorFactory(NodeType.HorizontalRule, 0);
export const Table = nodeCreatorFactory(NodeType.Table, 5);
export const Div = nodeCreatorFactory(NodeType.Div, 2);
export const Null = nodeCreatorFactory(NodeType.Null, 0);
export const Str = nodeCreatorFactory(NodeType.Str, 1);
export const Emph = nodeCreatorFactory(NodeType.Emph, 1);
export const Strong = nodeCreatorFactory(NodeType.Strong, 1);
export const Strikeout = nodeCreatorFactory(NodeType.Strikeout, 1);
export const Superscript = nodeCreatorFactory(NodeType.Superscript, 1);
export const Subscript = nodeCreatorFactory(NodeType.Subscript, 1);
export const SmallCaps = nodeCreatorFactory(NodeType.SmallCaps, 1);
export const Quoted = nodeCreatorFactory(NodeType.Quoted, 2);
export const Cite = nodeCreatorFactory(NodeType.Cite, 2);
export const Code = nodeCreatorFactory(NodeType.Code, 2);
export const Space = nodeCreatorFactory(NodeType.Space, 0);
export const SoftBreak = nodeCreatorFactory(NodeType.SoftBreak, 0);
export const LineBreak = nodeCreatorFactory(NodeType.LineBreak, 0);
export const Formula = nodeCreatorFactory(NodeType.Math, 2); // don't conflict with js builtin Math;
export const RawInline = nodeCreatorFactory(NodeType.RawInline, 2);
export const Link = nodeCreatorFactory(NodeType.Link, 3);
export const Image = nodeCreatorFactory(NodeType.Image, 3);
export const Note = nodeCreatorFactory(NodeType.Note, 1);
export const Span = nodeCreatorFactory(NodeType.Span, 2);
export const MetaMap = nodeCreatorFactory(NodeType.MetaMap, 1);
export const MetaList = nodeCreatorFactory(NodeType.MetaList, 1);
export const MetaBool = nodeCreatorFactory(NodeType.MetaBool, 1);
export const MetaInlines = nodeCreatorFactory(NodeType.MetaInlines, 1);
export const MetaString = nodeCreatorFactory(NodeType.MetaString, 1);
export const MetaBlocks = nodeCreatorFactory(NodeType.MetaBlocks, 1);
export const AlignLeft = nodeCreatorFactory(NodeType.AlignLeft, 0);
export const AlignRight = nodeCreatorFactory(NodeType.AlignRight, 0);
export const AlignCenter = nodeCreatorFactory(NodeType.AlignCenter, 0);
export const AlignDefault = nodeCreatorFactory(NodeType.AlignDefault, 0);
export const Math = nodeCreatorFactory(NodeType.Math, 2);
export const LineBlock = nodeCreatorFactory(NodeType.LineBlock, 1);
export const DefaultStyle = nodeCreatorFactory(NodeType.DefaultStyle, 0);
export const Example = nodeCreatorFactory(NodeType.Example, 0);
export const Decimal = nodeCreatorFactory(NodeType.Decimal, 0);
export const LowerRoman = nodeCreatorFactory(NodeType.LowerRoman, 0);
export const UpperRoman = nodeCreatorFactory(NodeType.UpperRoman, 0);
export const LowerAlpha = nodeCreatorFactory(NodeType.LowerAlpha, 0);
export const UpperAlpha = nodeCreatorFactory(NodeType.UpperAlpha, 0);
export const DefaultDelim = nodeCreatorFactory(NodeType.DefaultDelim, 0);
export const Period = nodeCreatorFactory(NodeType.Period, 0);
export const OneParen = nodeCreatorFactory(NodeType.OneParen, 0);
export const TwoParens = nodeCreatorFactory(NodeType.TwoParens, 0);
export const AuthorInText = nodeCreatorFactory(NodeType.AuthorInText, 0);
export const SuppressAuthor = nodeCreatorFactory(NodeType.SuppressAuthor, 0);
export const NormalCitation = nodeCreatorFactory(NodeType.NormalCitation, 0);
export const DisplayMath = nodeCreatorFactory(NodeType.DisplayMath, 0);
export const InlineMath = nodeCreatorFactory(NodeType.InlineMath, 0);
export const SingleQuote = nodeCreatorFactory(NodeType.SingleQuote, 0);
export const DoubleQuote = nodeCreatorFactory(NodeType.DoubleQuote, 0);

// Pseudo nodes - These aren't real nodes in the AST, but they are unique structures.
type CitationParams = {
  id: string;
  prefix: InlineNode[];
  suffix: InlineNode[];
  mode: CitationModeNode;
  noteNum: number;
  hash: number;
};

export const Citation = (params: CitationParams): CitationObject => {
  const citation: Record<string, unknown> = {};

  for (const key of Object.keys(params) as (keyof CitationParams)[]) {
    citation[`citation${key[0].toUpperCase()}${key.slice(1)}`] = params[key];
  }

  return citation as CitationObject;
};

interface AttrParams {
  id?: string;
  classes?: string[];
  attributes?: { [key: string]: string };
}

export const Attr = ({ id = "", classes = [], attributes = {} }: AttrParams): Attributes => {
  return [id, classes, Object.entries(attributes)];
};
