/**
 * 共通ユーティリティ型定義
 *
 * プロジェクト全体で使い回せる汎用的な型。
 */

/**
 * IDを持つエンティティ
 */
export type WithId<T> = T & { id: number };

/**
 * タイムスタンプを持つエンティティ
 */
export type WithTimestamps<T> = T & {
  created_at: string;
  updated_at: string;
};

/**
 * すべてのプロパティをオプショナルかつnullableにする
 */
export type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};

/**
 * すべてのプロパティを必須にする
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * キーのみを抽出
 */
export type KeysOf<T> = keyof T;

/**
 * 値の型のみを抽出
 */
export type ValuesOf<T> = T[keyof T];

/**
 * APIレスポンスの共通型
 */
export type ApiResponse<T> = {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: string[];
};

/**
 * エラーレスポンス型
 */
export type ApiError = {
  message: string;
  errors?: string[];
  statusCode?: number;
};
