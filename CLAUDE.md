# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

### 全体管理 (Makefile)
- `make backend` - バックエンド（Rails API + PostgreSQL）を起動
- `make frontend` - フロントエンド（Next.js）をローカルで起動
- `make stop` - 全てのサービスを停止
- `make logs` - バックエンドのログを表示
- `make clean` - コンテナとボリュームを完全削除
- `make status` - サービス状況を確認

### フロントエンド (pnpm)
- `cd frontend && pnpm install` - 依存関係のインストール
- `cd frontend && pnpm run dev` - 開発サーバー起動 (http://localhost:3000)
- `cd frontend && pnpm run build` - プロダクションビルド
- `cd frontend && pnpm run start` - プロダクションサーバー起動
- `cd frontend && pnpm run lint` - ESLintでコード検証

### バックエンド (Rails)
- `cd backend && bundle install` - Gem依存関係のインストール
- `cd backend && rails db:create` - データベース作成
- `cd backend && rails db:migrate` - マイグレーション実行
- `cd backend && rails server -p 3000` - ローカル開発サーバー起動
- `cd backend && rails test` - テスト実行

## アーキテクチャ

### 構成
- **フロントエンド**: Next.js 15.5.0 + TypeScript + Tailwind CSS 4.0
- **バックエンド**: Ruby on Rails 7.1.5 API + PostgreSQL 15
- **コンテナ化**: Docker Compose で統合環境管理

### ポート構成
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:3001 (Dockerでは内部3000→外部3001)
- PostgreSQL: localhost:5432

### API構造
- ベースURL: `http://localhost:3001`
- 名前空間: `/api/v1/`
- 現在のエンドポイント:
  - `GET /api/v1/home` - ホームデータとヘルスチェック
  - `GET /up` - Railsヘルスチェック

### フロントエンド構造
- `src/app/` - Next.js App Routerファイル
- `src/lib/api.ts` - APIクライアント関数
- `src/types/api.ts` - API型定義
- TypeScriptで型安全なAPI通信を実装

### バックエンド構造
- `app/controllers/api/v1/` - APIコントローラー
- Rails API専用設定（CORSあり）
- PostgreSQLをメインDB
- Docker環境変数でDB接続管理

### 環境設定
- フロントエンド: `NEXT_PUBLIC_API_URL` でAPIベースURL指定
- バックエンド: Docker Compose環境変数でDB接続
- 開発環境はDocker Composeで統一管理推奨

### パッケージ管理
- フロントエンド: **pnpmを使用**（npmではない）
- バックエンド: Bundler（標準的なRails構成）

## プロジェクト情報
- 顧客管理システム（CMS）
- フロントエンド・バックエンド分離型SPA
- 日本語主体のプロジェクト
- Docker開発環境推奨

## PRテンプレートルール

ユーザーが「PRをください」と言った場合は、`.github/pull_request_template.md`の書き方に沿って現在の作業ブランチの変更内容を記述し、\`\`\`で囲って返すこと。

PRテンプレート構造：
```
## 📝 概要
<!-- 変更内容の概要 -->

## 🔍 変更内容
<!-- 具体的な変更項目（チェックボックス形式） -->

## 🧪 テスト
<!-- テスト実施状況 -->

## 📸 スクリーンショット
<!-- UI変更時のスクリーンショット -->

## ✅ チェックリスト
<!-- PR作成前の確認事項 -->

## 📋 その他
<!-- レビュアーへの補足情報 -->
```