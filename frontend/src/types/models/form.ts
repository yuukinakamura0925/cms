/**
 * フォーム専用の型定義
 *
 * APIの型をベースに、フォーム用に加工した型を定義します。
 */

import type { UserProfile } from '../api/generated';

/**
 * ユーザープロフィールフォームデータ
 *
 * 新規作成・編集フォームで使用する型。
 * サーバー管理項目（id, timestamps等）を除外。
 */
export type UserProfileFormData = Omit<
  UserProfile,
  'id' | 'user_id' | 'created_at' | 'updated_at'
>;

/**
 * 部分的なプロフィール更新用
 *
 * 全項目をオプショナルにし、変更した項目のみ送信できるようにする。
 */
export type PartialUserProfileFormData = Partial<UserProfileFormData>;
