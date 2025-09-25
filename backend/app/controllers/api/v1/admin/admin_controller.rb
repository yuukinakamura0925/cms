class Api::V1::Admin::AdminController < ApplicationController
  include UserResponse

  before_action :ensure_admin!

  def users
    users = User.all
    users_response(users)
  end

  def user
    user = User.find(params[:id])
    user_response(user)
  rescue ActiveRecord::RecordNotFound
    error_response("ユーザーが見つかりません", :not_found)
  end

  def update_user
    user = User.find(params[:id])

    if user.update(user_params)
      user_updated_response(user)
    else
      error_response("ユーザー情報の更新に失敗しました", :unprocessable_entity, user.errors.full_messages)
    end
  rescue ActiveRecord::RecordNotFound
    error_response("ユーザーが見つかりません", :not_found)
  end

  def delete_user
    user = User.find(params[:id])
    user.destroy

    success_response(nil, "ユーザーを削除しました")
  rescue ActiveRecord::RecordNotFound
    error_response("ユーザーが見つかりません", :not_found)
  end

  private

  def ensure_admin!
    return if current_user&.admin?

    error_response("管理者権限が必要です", :forbidden)
  end

  def user_params
    params.require(:user).permit(:name, :role)
  end
end
