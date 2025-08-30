module UserResponse
  extend ActiveSupport::Concern

  private

  # ユーザー情報のJSON形式
  def user_json(user)
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  end

  # ユーザー情報（タイムスタンプ付き）
  def user_json_with_timestamps(user)
    user_json(user).merge({
      created_at: user.created_at,
      updated_at: user.updated_at
    })
  end

  # ユーザー一覧のレスポンス
  def users_response(users)
    success_response({
      users: users.map { |user| user_json_with_timestamps(user) }
    })
  end

  # 単一ユーザーのレスポンス
  def user_response(user, message = nil)
    success_response(
      { user: user_json_with_timestamps(user) },
      message
    )
  end

  # ユーザー作成・更新レスポンス
  def user_created_response(user, tokens = nil)
    data = { user: user_json(user) }
    data[:tokens] = tokens if tokens

    success_response(data, 'ユーザー登録に成功しました', :created)
  end

  def user_updated_response(user, message = 'ユーザー情報を更新しました')
    success_response({ user: user_json(user) }, message)
  end
end