/**
 * UI状態管理用の型定義
 *
 * APIとは関係ない、フロントエンド独自のUI状態を管理する型。
 */

/**
 * 非同期処理の状態
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * モーダルの状態
 */
export type ModalState = {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
};

/**
 * トースト通知の状態
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};

/**
 * ページネーション状態
 */
export type PaginationState = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

/**
 * ソート状態
 */
export type SortDirection = 'asc' | 'desc';

export type SortState<T = string> = {
  field: T;
  direction: SortDirection;
};

/**
 * フィルター状態（汎用）
 */
export type FilterState<T = Record<string, unknown>> = {
  filters: T;
  isActive: boolean;
};
