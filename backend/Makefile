.PHONY: help backend frontend stop logs clean restart status

help:
	@echo "利用可能なコマンド:"
	@echo "  backend   - バックエンド（Rails API + PostgreSQL）を起動"
	@echo "  frontend  - フロントエンド（Next.js）をローカルで起動"
	@echo "  stop      - 全てのサービスを停止"
	@echo "  logs      - バックエンドのログを表示"
	@echo "  clean     - コンテナとボリュームを完全削除"
	@echo "  status    - サービス状況を確認"

backend:
	@echo "🚀 バックエンドを起動中..."
	docker-compose up -d
	@echo "✅ バックエンド起動完了 - API: http://localhost:3001"

frontend:
	@echo "🚀 フロントエンドを起動中..."
	cd frontend && npm run dev

stop:
	@echo "🛑 サービスを停止中..."
	docker-compose down
	-pkill -f "next dev"
	@echo "✅ 全サービス停止完了"

logs:
	docker-compose logs -f backend

clean:
	@echo "🧹 クリーンアップ中..."
	docker-compose down -v
	@echo "✅ クリーンアップ完了"

status:
	@echo "📊 サービス状況:"
	docker-compose ps
EOF < /dev/null