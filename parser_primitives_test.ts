import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { anyChar, eof } from "./parser_primitives.ts";
import { ParseOutput } from "./types.ts";

Deno.test("何かしらの文字の入力がある場合", async (t) => {
  const parser = anyChar;

  await t.step("空文字", () => {
    const input = [] as const;
    const output = parser(input);

    const expected: ParseOutput<string> = {
      result: 'error'
    };

    assertEquals(output, expected);
  });

  await t.step("1文字入力", () => {
    const input = [...'a'] as const;
    const output = parser(input);

    const expected: ParseOutput<string> = {
      result: "success", value: "a", rest: []
    };

    assertEquals(output, expected);
  });

  await t.step("1文字と残りの文字列", () => {
    const input = [..."hoge"] as const;
    const output = parser(input);

    const expected: ParseOutput<string> = {
      result: "success",
      value: "h",
      rest: ["o","g","e"]
    }

    assertEquals(output, expected);
  });
});

// 入力がない場合にテストが成功する
Deno.test("EOF",async (t) => {
  const parser = eof;
  
  await t.step("入力なし", () => {
    const input = [] as const;
    const output = parser(input);
    
    const expected: ParseOutput<null> = {
      result: "success",
      value: null,
      rest: []
    };

    assertEquals(output, expected);
  });

  await t.step("1文字入力あり", () => {
    const input = [..."a"] as const;
    const output = parser(input);

    const expected: ParseOutput<null> = {
      result: "error"
    };

    assertEquals(output, expected);
  });
});