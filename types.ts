/**
 * 入力される文字を受け取る
 * "吉野家" => ["吉", "野", "家"]
 */
export type ParseInput = readonly string[];

/**
 * 出力結果が成功
 */
interface ParseSuccess<T> {
  result: "success",
  value: T, // 解析された文字
  rest: ParseInput // 未解析残り
}

/**
 * 出力結果が失敗
 */
interface ParseError {
  result: "error",
}

// 出力結果をまとめる型
export type ParseOutput<T> = ParseSuccess<T> | ParseError;

// Parser関数
export type Parser<T> = (input: ParseInput) => ParseOutput<T>;

// Parser型からデータを取得できるようにする
export type ParseData<P> = P extends Parser<infer Data> ? Data : never;