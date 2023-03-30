import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { char, is } from "./char.ts";
import { ParseOutput } from "./types.ts";

Deno.test("char('a')", async (t) => {
  const parser = char('a');
  
  await t.step("入力が0文字", () => {
    const input = [] as const;
    const output = parser(input);

    const expected: ParseOutput<'a'> = {
      result: "error"
    };

    assertEquals(output, expected);
  });

  await t.step("入力が1文字で 'a' ", () => {
    const input = [...'a'] as const;
    const output = parser(input);

    const expected: ParseOutput<'a'> = {
      result: "success",
      value: 'a',
      rest: []
    };

    assertEquals(output, expected);
  });

  await t.step("入力が1文字で 'A' ", () => {
    const input = [...'A'] as const;
    const output = parser(input);

    const expected: ParseOutput<'A'> = {
      result: "error"
    };

    assertEquals(output, expected);
  });

  await t.step("入力が1文字以上で 'hoge' ", () => {
    const input = [..."hoge"] as const;
    const output = parser(input);

    const expected: ParseOutput<"hoge"> = {
      result: "error"
    };

    assertEquals(output, expected);
  });

});


Deno.test("is()",async (t) => {
  await t.step("is(c => c === 'a')", async (t) => {
      const parser = is((c): c is 'a' => c === 'a');

      await t.step("入力が0文字", () => {
        const input = [] as const;
        const output = parser(input);
    
        const expected: ParseOutput<'a'> = {
          result: "error"
        };
    
        assertEquals(output, expected);
      });

      await t.step("入力が1文字で 'a' ", () => {
        const input = [...'a'] as const;
        const output = parser(input);
    
        const expected: ParseOutput<'a'> = {
          result: "success",
          value: 'a',
          rest: []
        };
    
        assertEquals(output, expected);
      });
    
      await t.step("入力が1文字で 'A' ", () => {
        const input = [...'A'] as const;
        const output = parser(input);
    
        const expected: ParseOutput<'A'> = {
          result: "error"
        };
    
        assertEquals(output, expected);
      });
  });

  await t.step("is(c === '0' || c === '1')",async (t) => {
    const parser = is((c): c is '0' | '1' => c === '0' || c === '1');

    await t.step("入力が0文字", () => {
      const input = [] as const;
      const output = parser(input);

      const expected: ParseOutput<'0' | '1'> = {
        result: "error"
      };

      assertEquals(output, expected);
    });

    await t.step("入力が1文字 '0' ", () => {
      const input = [...'0'] as const;
      const output = parser(input);

      const expected: ParseOutput<'0' | '1'> = {
        result: "success",
        value: "0",
        rest: []
      };

      assertEquals(output, expected);
    });

    await t.step("入力が1文字 '1' ", () => {
      const input = [..."1"] as const;
      const output = parser(input);

      const expected: ParseOutput<'0' | '1'> = {
       result: "success",
       value: '1',
       rest: [] 
      };

      assertEquals(output, expected);
    });

    await t.step("入力が1文字 'A'", () => {
      const input = [..."A"] as const;
      const output = parser(input);

      const expected: ParseOutput<'0' | '1'> = {
        result: 'error'
      };

      assertEquals(output, expected);
    });
  });
})