class Api::V1::AuthController < ApplicationController
  include UserResponse
  
  skip_before_action :authenticate_user!, only: [:login, :register]

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      tokens = JwtService.generate_tokens(user)
      user_created_response(user, tokens)
    else
      error_response('メールアドレスまたはパスワードが正しくありません', :unauthorized)
    end
  end

  def register
    user = User.new(user_params)

    if user.save
      tokens = JwtService.generate_tokens(user)
      user_created_response(user, tokens)
    else
      error_response('ユーザー登録に失敗しました', :unprocessable_entity, user.errors.full_messages)
    end
  end

  def logout
    # JWTはステートレスなので、クライアント側でトークンを削除する
    success_response(nil, 'ログアウトしました')
  end

  def me
    user_response(current_user)
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end
end 