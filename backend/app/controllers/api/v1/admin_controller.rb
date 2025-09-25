class Api::V1::Admin::AdminController < ApplicationController
  before_action :ensure_admin!

  def users
    users = User.all
    render json: {
      status: "success",
      data: {
        users: users.map do |user|
          {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            created_at: user.created_at
          }
        end
      }
    }, status: :ok
  end

  def user
    user = User.find(params[:id])
    render json: {
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      }
    }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {
      status: "error",
      message: "ユーザーが見つかりません"
    }, status: :not_found
  end

  def update_user
    user = User.find(params[:id])

    if user.update(user_params)
      render json: {
        status: "success",
        message: "ユーザー情報を更新しました",
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }
      }, status: :ok
    else
      render json: {
        status: "error",
        message: "ユーザー情報の更新に失敗しました",
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: {
      status: "error",
      message: "ユーザーが見つかりません"
    }, status: :not_found
  end

  def delete_user
    user = User.find(params[:id])
    user.destroy

    render json: {
      status: "success",
      message: "ユーザーを削除しました"
    }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {
      status: "error",
      message: "ユーザーが見つかりません"
    }, status: :not_found
  end

  private

  def ensure_admin!
    return if current_user&.admin?

    render json: {
      status: "error",
      message: "管理者権限が必要です"
    }, status: :forbidden
  end

  def user_params
    params.require(:user).permit(:name, :role)
  end
end
