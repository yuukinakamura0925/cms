class CreateUserProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :user_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :last_name
      t.string :first_name
      t.string :last_name_kana
      t.string :first_name_kana
      t.date :birth_date
      t.string :gender
      t.string :phone_number
      t.string :postal_code
      t.string :prefecture
      t.string :city
      t.string :address_line
      t.string :building
      t.string :emergency_contact_name
      t.string :emergency_contact_phone
      t.string :desired_job_type
      t.text :skills
      t.text :certifications
      t.integer :years_of_experience
      t.string :desired_work_location
      t.string :desired_employment_type
      t.integer :desired_hourly_rate
      t.string :profile_image_url
      t.text :self_introduction
      t.text :available_days
      t.string :transportation

      t.timestamps
    end
  end
end
