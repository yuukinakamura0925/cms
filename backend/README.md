# CMS Backend

Rails APIを使用したコンテンツ管理システムのバックエンド

## 機能

- JWT認証システム
- ユーザー管理（管理者・一般ユーザー）
- Role-Based Access Control (RBAC)

## セットアップ

```bash
# 依存関係のインストール
bundle install

# データベースのセットアップ
rails db:create db:migrate db:seed

# サーバーの起動
rails server -p 3001
```

## API エンドポイント

### 認証関連
- `POST /api/v1/auth/login` - ログイン
- `POST /api/v1/auth/register` - ユーザー登録
- `POST /api/v1/auth/logout` - ログアウト
- `GET /api/v1/auth/me` - 現在のユーザー情報

### 管理者専用
- `GET /api/v1/admin/users` - ユーザー一覧
- `GET /api/v1/admin/users/:id` - ユーザー詳細
- `PUT /api/v1/admin/users/:id` - ユーザー更新
- `DELETE /api/v1/admin/users/:id` - ユーザー削除

## テスト用アカウント

```
管理者: admin@example.com / password123
ユーザー1: user1@example.com / password123
ユーザー2: user2@example.com / password123
```

## 開発ガイド

### APIレスポンス形式
APIのレスポンス形式に関するルールは [API_RESPONSE_RULES.md](./API_RESPONSE_RULES.md) を参照してください。

### アーキテクチャ

#### 認証システム
- **JWT認証**: `JwtService` でトークンの生成・検証
- **認証Concern**: `JwtAuthenticatable` で認証処理
- **権限管理**: `ensure_admin!` で管理者権限チェック

#### レスポンス形式
- **基本レスポンス**: `ApiResponse` Concern
- **モデル別レスポンス**: `UserResponse` などの専用Concern

## 技術スタック

- **Ruby**: 3.1.4
- **Rails**: 7.1.5
- **PostgreSQL**: データベース
- **JWT**: 認証トークン
- **bcrypt**: パスワードハッシュ化

## ライセンス

MIT License
