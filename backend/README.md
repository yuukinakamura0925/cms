# CMS Backend API

顧客管理システムのバックエンドAPI (Ruby on Rails)

## 🏗️ 技術スタック

- **Ruby** 3.0+
- **Ruby on Rails** - WebアプリケーションフレームワークAPI
- **PostgreSQL** - データベース
- **Docker** - コンテナ化

## 🚀 セットアップ

### 前提条件
- Ruby 3.0以上
- PostgreSQL
- Docker (推奨)

### Docker環境での起動

```bash
# ルートディレクトリから
make backend
```

### ローカル環境での起動

```bash
# 依存関係をインストール
bundle install

# データベース作成
rails db:create

# マイグレーション実行
rails db:migrate

# 開発サーバー起動
rails server -p 3000
```

## 📡 API エンドポイント

- ベースURL: `http://localhost:3001`
- ヘルスチェック: `GET /api/v1/home`

## 🧪 テスト

```bash
rails test
```

## 🐳 Docker コマンド

```bash
# ログ確認
make logs

# 停止
make stop

# クリーンアップ
make clean
```
