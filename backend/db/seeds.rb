# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# 管理者ユーザーを作成（既存の場合は作成しない）
admin_user = User.find_or_create_by(email: 'admin@example.com') do |user|
  user.password = 'password123'
  user.password_confirmation = 'password123'
  user.name = '管理者'
  user.role = 'admin'
end

# 一般ユーザーを作成（既存の場合は作成しない）
user1 = User.find_or_create_by(email: 'user1@example.com') do |user|
  user.password = 'password123'
  user.password_confirmation = 'password123'
  user.name = 'ユーザー1'
  user.role = 'user'
end

user2 = User.find_or_create_by(email: 'user2@example.com') do |user|
  user.password = 'password123'
  user.password_confirmation = 'password123'
  user.name = 'ユーザー2'
  user.role = 'user'
end

puts 'シードデータを作成しました:'
puts "管理者: #{admin_user.email} (パスワード: password123)"
puts "ユーザー1: #{user1.email} (パスワード: password123)"
puts "ユーザー2: #{user2.email} (パスワード: password123)"
