import { anyChar } from "./parser_primitives.ts";
import { ParseInput, Parser } from "./types.ts";

type CharFunc = <T extends ParseInput[0]>(c: T) => Parser<T>;

export const char: CharFunc = c => input => {
  // 入力された文字列を解析する
  const r = anyChar(input);
  if (r.result === "error") {
    return {result: "error"}
  }

  // パースした文字列が、期待するパース対象と異なる場合
  /**
   * 期待する結果: 'c'
   * パースした文字列の1文字目: ["h", "e", "l", "l", "o"] ("hello")
   * 'c' === 'h' ?
   */
  if (r.value !== c) {
    return {result: "error"}
  }

  return {
    result: "success",
    value: c,
    rest: r.rest
  }
}

type IsFunc = <T extends string>(f: (c: ParseInput[0]) => c is T) => Parser<T>;

export const is: IsFunc = f => input => {
  const r = anyChar(input);

  if (r.result === "error") {
    return r;
  }

  if (!f(r.value)) {
    return { result: "error" }
  }

  return {
    result: "success",
    value: r.value,
    rest: r.rest
  }
}