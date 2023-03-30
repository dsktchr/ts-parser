import { Parser } from "./types.ts";

// 何かしら１文字以上の入力がある場合に成功する関数
export const anyChar: Parser<string> = input => {
  if (input.length >= 1) {
    const [data, ...rest] = input;
    return {
      result: 'success',
      value: data,
      rest: rest,
    }  
  } else {
    return {
      result: "error"
    }
  }
  
}

// 入力がない場合に成功する関数
export const eof: Parser<null> = input => {
  if (input.length === 0) {
    return {
      result: "success",
      value: null,
      rest: [],
    }
  } else {
    return {
      result: "error"
    }
  }
}