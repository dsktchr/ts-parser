import { ParseData, Parser } from "./types.ts";

type NotFunc = (p: Parser<unknown>) => Parser<null>;

export const not: NotFunc = p => input => {
  if (p(input).result === "success") {
    return { result: "error" }
  } else {
    return { result: "success", value: null, rest: input}
  }
}

type OrFunc = <T>(ps: Parser<T>[]) => Parser<T>;

export const or: OrFunc = ps => input => {
  if (ps.length === 0) {
    return { result: "error" };
  }

  const r = ps.map(p => p(input)).find(o => o.result === "success");

  if(r) {
    return r;
  } else {
    return { result: "error" };
  }
}

type CatFunc = <T extends Parser<unknown>[]>(ps: [...T]) => Parser<{ [K in keyof T]: ParseData<T[K]> }>;

export const cat: CatFunc = ps => input => {
  if (ps.length === 0) {
    return { result: "error" }
  }

  const result = [];
  let i = input;
  
  for(const p of ps) {
    const r = p(i);
    if (r.result === "error") {
      return r;
    }
    result.push(r);
    i = r.rest;
  }

  return {
    result: "success",
    value: result as ParseData<ReturnType<ReturnType<CatFunc>>>,
    rest: i
  };
}