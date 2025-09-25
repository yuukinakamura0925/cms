# APIレスポンス形式ルール

## 概要

このドキュメントでは、APIのレスポンス形式に関するルールを定義します。

## 基本レスポンス形式

### 成功レスポンス
```json
{
  "status": "success",
  "message": "操作が成功しました",  // オプション
  "data": {                      // オプション
    // データ
  }
}
```

### エラーレスポンス
```json
{
  "status": "error",
  "message": "エラーメッセージ",
  "errors": [                    // オプション
    "詳細なエラー情報"
  ]
}
```

## レスポンス形式の管理

### 1. 基本レスポンス（ApiResponse Concern）
- **ファイル**: `app/controllers/concerns/api_response.rb`
- **用途**: 汎用的なレスポンス形式
- **メソッド**:
  - `success_response(data, message, status)`
  - `error_response(message, status, errors)`

### 2. モデル別レスポンス（各Response Concern）
- **命名規則**: `{ModelName}Response`
- **ファイル**: `app/controllers/concerns/{model_name}_response.rb`
- **用途**: 特定のモデル専用のレスポンス形式

## 実装例

### UserResponse Concern
```ruby
# app/controllers/concerns/user_response.rb
module UserResponse
  extend ActiveSupport::Concern

  private

  def user_json(user)
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  end

  def user_json_with_timestamps(user)
    user_json(user).merge({
      created_at: user.created_at,
      updated_at: user.updated_at
    })
  end

  def users_response(users)
    success_response({
      users: users.map { |user| user_json_with_timestamps(user) }
    })
  end

  def user_response(user, message = nil)
    success_response(
      { user: user_json_with_timestamps(user) },
      message
    )
  end

  def user_created_response(user, tokens = nil)
    data = { user: user_json(user) }
    data[:tokens] = tokens if tokens
    
    success_response(data, 'ユーザー登録に成功しました', :created)
  end

  def user_updated_response(user, message = 'ユーザー情報を更新しました')
    success_response({ user: user_json(user) }, message)
  end
end
```

### コントローラーでの使用
```ruby
class Api::V1::AuthController < ApplicationController
  include UserResponse  # 必要なConcernのみinclude
  
  def login
    user = User.find_by(email: params[:email])
    
    if user&.authenticate(params[:password])
      tokens = JwtService.generate_tokens(user)
      user_created_response(user, tokens)  # 専用メソッドを使用
    else
      error_response('認証失敗', :unauthorized)
    end
  end
end
```

## 新しいモデルを追加する場合

### 1. Response Concernを作成
```bash
# 例: Articleモデルの場合
touch app/controllers/concerns/article_response.rb
```

### 2. レスポンス形式を定義
```ruby
module ArticleResponse
  extend ActiveSupport::Concern

  private

  def article_json(article)
    {
      id: article.id,
      title: article.title,
      content: article.content,
      author: user_json(article.user)  # 他のConcernのメソッドも使用可能
    }
  end

  def articles_response(articles)
    success_response({
      articles: articles.map { |article| article_json(article) }
    })
  end

  def article_response(article, message = nil)
    success_response(
      { article: article_json(article) },
      message
    )
  end
end
```

### 3. コントローラーでinclude
```ruby
class Api::V1::ArticlesController < ApplicationController
  include ArticleResponse
  
  def index
    articles = Article.all
    articles_response(articles)
  end
end
```

## ルール

### 1. 命名規則
- **Concern名**: `{ModelName}Response`
- **ファイル名**: `{model_name}_response.rb`
- **メソッド名**: `{model_name}_json`, `{model_name}s_response`, `{model_name}_response`

### 2. レスポンスメソッドの種類
- `{model_name}_json(model)`: 基本的なJSON形式
- `{model_name}_json_with_timestamps(model)`: タイムスタンプ付き
- `{model_name}s_response(models)`: 一覧レスポンス
- `{model_name}_response(model, message)`: 単一レスポンス
- `{model_name}_created_response(model, tokens)`: 作成レスポンス
- `{model_name}_updated_response(model, message)`: 更新レスポンス

### 3. 使用原則
- 基本レスポンス（ApiResponse）は全コントローラーで使用可能
- モデル別レスポンスは必要なコントローラーのみinclude
- 複数のモデルを使用する場合は複数のConcernをinclude

### 4. ステータスコード
- `200 OK`: 成功（デフォルト）
- `201 Created`: 作成成功
- `400 Bad Request`: リクエストエラー
- `401 Unauthorized`: 認証エラー
- `403 Forbidden`: 権限エラー
- `404 Not Found`: リソースが見つからない
- `422 Unprocessable Entity`: バリデーションエラー

## 注意事項

1. **一貫性**: 同じモデルのレスポンス形式は統一する
2. **最小限**: 必要最小限の情報のみ返す
3. **セキュリティ**: 機密情報（パスワードなど）は含めない
4. **パフォーマンス**: N+1問題を避けるため、必要に応じてincludesを使用
5. **バージョニング**: APIバージョンが変更される場合は、新しいConcernを作成

## 参考

- [Rails Concerns](https://guides.rubyonrails.org/active_support_core_extensions.html#concerns)
- [REST API Design](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 