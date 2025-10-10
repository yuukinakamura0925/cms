class Api::V1::UserProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user_profile, only: [:show, :update]

  # GET /api/v1/user_profile
  def show
    if @user_profile
      render json: @user_profile, status: :ok
    else
      render json: { message: 'プロフィールが見つかりません' }, status: :not_found
    end
  end

  # POST /api/v1/user_profile
  def create
    @user_profile = current_user.build_user_profile(user_profile_params)

    if @user_profile.save
      render json: @user_profile, status: :created
    else
      render json: { errors: @user_profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_profile
  def update
    if @user_profile.update(user_profile_params)
      render json: @user_profile, status: :ok
    else
      render json: { errors: @user_profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user_profile
    @user_profile = current_user.user_profile
  end

  def user_profile_params
    params.require(:user_profile).permit(
      :last_name,
      :first_name,
      :last_name_kana,
      :first_name_kana,
      :birth_date,
      :gender,
      :phone_number,
      :postal_code,
      :prefecture,
      :city,
      :address_line,
      :building,
      :emergency_contact_name,
      :emergency_contact_phone,
      :desired_job_type,
      :skills,
      :certifications,
      :years_of_experience,
      :desired_work_location,
      :desired_employment_type,
      :desired_hourly_rate,
      :profile_image_url,
      :self_introduction,
      :available_days,
      :transportation
    )
  end

  def authenticate_user!
    # TODO: 認証ロジックを実装
    # 現在はスキップ（後で実装）
  end

  def current_user
    # TODO: 認証からユーザーを取得
    # 仮実装: 最初のユーザーを返す
    @current_user ||= User.first
  end
end
