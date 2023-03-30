// 数値を受け取って数値を返す関数
type F = (n: number) => number;

const addOne: F = (nu) => nu + 1;

const multiply: F = (nu) => nu * 2;

const division2: F = (nu) => nu / 2;

const minus: F = (nu) => nu - 1;

console.log(addOne(1), multiply(2), division2(10), minus(9));

const cuNum = (f:(n1: number, n2: number) => number): number => f(123, 456);

const combine = (a: number, b: number): number => a + b;

console.log(cuNum(combine));