class User < ApplicationRecord
  has_secure_password

  # アソシエーション
  has_one :user_profile, dependent: :destroy

  # バリデーション
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :role, presence: true, inclusion: { in: %w[admin user] }

  # デフォルト値
  before_validation :set_default_role, on: :create

  # スコープ
  scope :admins, -> { where(role: 'admin') }
  scope :users, -> { where(role: 'user') }

  # インスタンスメソッド
  def admin?
    role == 'admin'
  end

  def user?
    role == 'user'
  end

  private

  def set_default_role
    self.role ||= 'user'
  end
end
