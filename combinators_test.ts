import { not, or, cat } from "./combinators.ts";
import { char } from "./char.ts";
import { ParseOutput } from "./types.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("not(char('a'))", async (t) => {
  const parser = not(char('a'));
  
  await t.step("空文字", () => {
    const input = [] as const;
    const output = parser(input);

    const expected: ParseOutput<null> = {
      result: "success",
      value: null,
      rest: []
    };

    assertEquals(output, expected);
  });

  await t.step("1文字入力 'a' ", () => {
    const input = [..."a"] as const;
    const output = parser(input);

    const expected: ParseOutput<null> = {
      result: "error"
    };

    assertEquals(output, expected);
  });

  await t.step("1文字入力 'A' ", () => {
    const input = [..."A"] as const;
    const output = parser(input);

    const expected: ParseOutput<null> = {
      result: "success",
      value: null,
      rest: [..."A"]
    };

    assertEquals(output, expected);
  });

  await t.step("1文字以上入力 'hoge'", () => {
    const input = [..."hoge"] as const;
    const output = parser(input);

    const expected: ParseOutput<null> = {
      result: "success",
      value: null,
      rest: [..."hoge"]
    };

    assertEquals(output, expected);
  });
});

Deno.test("or()",async (t) => {
  await t.step("or([])",async (t) => {
    const parser = or([]);

    await t.step("空文字", () => {
      const input = [] as const;
      const output = parser(input);
  
      const expected: ParseOutput<unknown> = {
        result: "error"
      };
  
      assertEquals(output, expected);
    });
  
    await t.step("1文字入力", () => {
      const input = [..."a"] as const;
      const output = parser(input);
  
      const expected: ParseOutput<unknown> = {
        result: 'error'
      };
  
      assertEquals(output, expected);
    });
  });
  
  await t.step("or([char('a'), char('b')])", async (t) => {
    const parser = or([char('a'), char('b')]);

    await t.step("空文字", () => {
      const input = [] as const;
      const output = parser(input);

      const expected: ParseOutput<'a' | 'b'> = {
        result: "error"
      };

      assertEquals(output, expected);
    });

    await t.step("1文字 'a' ", () => {
      const input = [..."a"] as const;
      const output = parser(input);

      const expected: ParseOutput<'a'|'b'> = {
        result: "success",
        value: "a",
        rest: []
      };

      assertEquals(output, expected);
    });

    await t.step("1文字 'b' ", () => {
      const input = [..."b"] as const;
      const output = parser(input);

      const expected: ParseOutput<'a' | 'b'> = {
        result: "success",
        value: "b",
        rest: []
      };

      assertEquals(output, expected);
    });

    await t.step("1文字 'A' ", () => {
      const input = [..."A"] as const;
      const output = parser(input);

      const expected: ParseOutput<'a' | 'b'> = {
        result: "error"
      };

      assertEquals(output, expected);
    });
  });
});

Deno.test("cat()",async (t) => {

  await t.step("cat([])",async (t) => {
    const parser = cat([]);

    await t.step("空文字", () => {
      const input = [] as const;
      const output = parser(input);

      const expected: ParseOutput<[]> = {
        result: "success",
        value: [],
        rest: []
      };

      assertEquals(output, expected);
    });

    await t.step("1文字", () => {
      const input = [..."a"] as const;
      const output = parser(input);

      const expected: ParseOutput<[]> = {
        result: "success",
        value: [],
        rest: [...'a']
      };

      assertEquals(output, expected);
    });

  });

  await t.step("cat([char('a'), char('b')])", async (t) => {
    const parser = cat([char('a'), char('b')]);

    await t.step("空文字", () => {
      const input = [] as const;
      const output = parser(input);

      const expected: ParseOutput<['a', 'b']> = {
        result: "error"
      };

      assertEquals(output, expected);
    });

    await t.step("1文字入力", () => {
      const input = [..."a"] as const;
      const output = parser(input);

      const expected: ParseOutput<['a', 'b']> = {
        result: "error"
      };

      assertEquals(output, expected);
    });

    await t.step("複数入力 'abc'", () => {
      const input = [..."abc"] as const;
      const output = parser(input);

      const expected: ParseOutput<['a', 'b']> = {
        result: "success",
        value: ['a', "b"],
        rest: [..."c"]
      };

      assertEquals(output, expected);
    });

    await t.step("1文字入力 'A' ", () => {
      const input = [..."A"] as const;
      const output = parser(input);

      const expected: ParseOutput<['a', 'b']> = {
        result: "error"
      };

      assertEquals(output, expected);
    });
    
  });
  
});