# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_10_04_153741) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "user_profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "last_name"
    t.string "first_name"
    t.string "last_name_kana"
    t.string "first_name_kana"
    t.date "birth_date"
    t.string "gender"
    t.string "phone_number"
    t.string "postal_code"
    t.string "prefecture"
    t.string "city"
    t.string "address_line"
    t.string "building"
    t.string "emergency_contact_name"
    t.string "emergency_contact_phone"
    t.string "desired_job_type"
    t.text "skills"
    t.text "certifications"
    t.integer "years_of_experience"
    t.string "desired_work_location"
    t.string "desired_employment_type"
    t.integer "desired_hourly_rate"
    t.string "profile_image_url"
    t.text "self_introduction"
    t.text "available_days"
    t.string "transportation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "role"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "user_profiles", "users"
end
