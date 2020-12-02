import { AnyNode, NodeContent, Node, NodeType } from "./types/node";
import { WrapArray } from "./types/utility";
import { Visitor, VisitorObject } from "./types/visitor";

export function isNode(x: unknown): x is AnyNode {
  return (typeof x === "object" && x !== null && "t" in x) || false;
}

export function isNodeArray(x: unknown[]): x is AnyNode[] {
  return x.every(isNode);
}

export function isVisitorObject(visitor: Visitor): visitor is VisitorObject {
  return "array" in visitor || "single" in visitor;
}

export function normalizeVisitor(visitor: Visitor): VisitorObject {
  const visitorObj: VisitorObject = {};

  if (visitor instanceof Function) {
    visitorObj.single = visitor;
  } else if (!isVisitorObject(visitor)) {
    visitorObj.single = (node, format, meta) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return visitor[node.t] && visitor[node.t]!(node.c as never, format, meta);
    };
  } else {
    Object.assign(visitorObj, visitor);
  }

  return visitorObj;
}

function isObject(o: unknown): o is Record<string, unknown> {
  return Object.prototype.toString.call(o) === "[object Object]";
}

export function isPlainObject(o: unknown): o is Record<string | symbol | number, unknown> {
  if (!isObject(o)) return false;

  // If has modified constructor
  const ctor = o.constructor;

  if (o.constructor === undefined) return true;

  // If has modified prototype
  const prot = ctor.prototype;

  if (!isObject(prot)) return false;

  // If constructor does not have an Object-specific method
  // eslint-disable-next-line no-prototype-builtins
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }

  return true;
}

export function nodeCreatorFactory<
  T extends NodeType,
  C = T extends keyof NodeContent ? NodeContent[T] : undefined
>(
  type: T,
  size: WrapArray<C> extends [] ? 0 : WrapArray<C> extends unknown[] ? WrapArray<C>["length"] : 0
): (...args: WrapArray<C>) => Node<T> {
  return (...args) => {
    if (size !== args.length) {
      throw new Error(`${type} expects ${size} arguments, but received ${args.length}`);
    }

    switch (size) {
      case 0:
        return { t: type } as Node<T>;
      case 1:
        return { t: type, c: args[0] } as Node<T>;
      default:
        return { t: type, c: args } as never;
    }
  };
}
