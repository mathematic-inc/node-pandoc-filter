/* eslint-disable no-await-in-loop */
import getStdin from "get-stdin";
import { Document, NodeContent, NodeType } from "./types/node";
import { Visitor } from "./types/visitor";
import { isNode, isNodeArray, isPlainObject, normalizeVisitor } from "./utils";
import "array-flat-polyfill";

export * from "./types";

/**
 * Transforms a Pandoc node using a depth first visitation
 *
 * @param tree - The object to traverse
 * @param action - Callback to apply to each item
 * @param format - Output format
 * @param meta - Pandoc metadata
 * @returns The modified tree
 */
export async function transform(
  nodes: unknown,
  visitor: Visitor,
  format: string,
  meta: NodeContent[NodeType.MetaMap]
): Promise<void> {
  const stack = [nodes];
  const nVisitor = normalizeVisitor(visitor);

  while (stack.length > 0) {
    const nodeCollection = stack.pop();

    if (nodeCollection instanceof Array) {
      if (nVisitor.array && isNodeArray(nodeCollection)) {
        const nodeArray = await nVisitor.array(nodeCollection, format, meta);

        if (nodeArray) {
          nodeCollection.splice(0, nodeCollection.length, ...nodeArray);
        }
      }

      for (let i = 0; i < nodeCollection.length; i++) {
        const maybeNode = nodeCollection[i];

        if (nVisitor.single && isNode(maybeNode)) {
          const newNodes = (await nVisitor.single(maybeNode, format, meta)) || maybeNode;

          if (Array.isArray(newNodes)) {
            nodeCollection.splice(i, 1, ...newNodes);
            i += newNodes.length - 1;
            stack.push(...newNodes);
          } else {
            nodeCollection[i] = newNodes;
            stack.push(newNodes);
          }
        } else {
          stack.push(maybeNode);
        }
      }
    } else if (isPlainObject(nodeCollection) && nodeCollection !== null) {
      stack.push(...Object.values(nodeCollection));
    }
  }
}

/**
 * Transforms a Pandoc document
 *
 * @param document - The Pandoc document to filter
 * @param visitor - A visitor to use for transformation
 * @param format - The original format of the document
 */
export async function filter(document: Document, visitor: Visitor, format = ""): Promise<Document> {
  await transform(document.meta, visitor, format, document.meta);
  await transform(document.blocks, visitor, format, document.meta);

  return document;
}

/**
 * The entry and exit point of a Pandoc filter
 *
 * @param visitor - A visitor to use for transformation
 */
export default async function toJSONFilter(visitor: Visitor): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(await filter(JSON.parse(await getStdin()), visitor, process.argv[2] ?? ""))
  );
}
