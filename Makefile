.PHONY: help backend frontend stop down logs clean status lint fix test generate-types

help:
	@echo "利用可能なコマンド:"
	@echo "  make backend       - バックエンド（Rails API + PostgreSQL）を起動"
	@echo "  make frontend      - フロントエンド（Next.js）をローカルで起動"
	@echo "  make stop          - 全てのサービスを停止"
	@echo "  make down          - 全てのサービスを停止（stopのエイリアス）"
	@echo "  make logs          - バックエンドのログを表示"
	@echo "  make clean         - コンテナとボリュームを完全削除"
	@echo "  make status        - サービス状況を確認"
	@echo "  make lint          - コード品質チェック（RuboCop + ESLint）"
	@echo "  make fix           - コード自動修正"
	@echo "  make test          - テスト実行"
	@echo "  make generate-types - OpenAPIスキーマからTypeScript型を自動生成"

backend:
	@echo "🚀 バックエンドを起動中..."
	docker-compose up -d
	@echo "✅ バックエンド起動完了"
	@echo "   API: http://localhost:3001"
	@echo "   エンドポイント例: http://localhost:3001/api/v1/home"

frontend:
	@echo "🚀 フロントエンドを起動中..."
	cd frontend && pnpm run dev

stop:
	@echo "🛑 サービスを停止中..."
	docker-compose down
	@echo "🛑 フロントエンドプロセスを停止中..."
	-pkill -f "next dev" || true
	-pkill -f "pnpm.*dev" || true
	@echo "✅ 全サービス停止完了"

down: stop

logs:
	docker-compose logs -f backend

clean:
	@echo "🧹 クリーンアップ中..."
	docker-compose down -v
	@echo "✅ クリーンアップ完了"

status:
	@echo "📊 サービス状況:"
	docker-compose ps

# Code Quality
lint:
	@echo "🔍 コード品質チェック中..."
	cd backend && bundle exec rubocop
	cd frontend && pnpm run lint
	@echo "✅ コード品質チェック完了"

fix:
	@echo "🔧 コード自動修正中..."
	cd backend && bundle exec rubocop -A
	cd frontend && pnpm run lint --fix
	@echo "✅ コード自動修正完了"

test:
	@echo "🧪 テスト実行中..."
	cd backend && bundle exec rspec
	@echo "✅ テスト完了"

# Type Generation
generate-types:
	@echo "🔄 TypeScript型を生成中..."
	@echo "   入力: backend/swagger/v1/swagger.yaml"
	@echo "   出力: frontend/src/types/generated.ts"
	cd frontend && pnpm run generate:types
	@echo "✅ 型生成完了"