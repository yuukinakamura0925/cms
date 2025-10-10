class UserProfile < ApplicationRecord
  belongs_to :user

  # 定数：許可される値
  GENDERS = %w[male female other prefer_not_to_say].freeze
  EMPLOYMENT_TYPES = %w[full_time part_time contract temporary freelance].freeze

  # Validations
  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :last_name_kana, presence: true
  validates :first_name_kana, presence: true
  validates :gender, inclusion: { in: GENDERS }, allow_nil: true
  validates :desired_employment_type, inclusion: { in: EMPLOYMENT_TYPES }, allow_nil: true
  validates :phone_number, format: { with: /\A\d{10,11}\z/, message: 'は10桁または11桁の数字で入力してください' }, allow_blank: true
  validates :postal_code, format: { with: /\A\d{7}\z/, message: 'は7桁の数字で入力してください' }, allow_blank: true
  validates :years_of_experience, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :desired_hourly_rate, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  # 氏名のフルネームを返す
  def full_name
    "#{last_name} #{first_name}"
  end

  # フリガナのフルネームを返す
  def full_name_kana
    "#{last_name_kana} #{first_name_kana}"
  end
end
