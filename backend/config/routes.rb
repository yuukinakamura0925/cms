Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # API routes
  namespace :api do
    namespace :v1 do
      # 認証関連
      post 'auth/login', to: 'auth#login'
      post 'auth/register', to: 'auth#register'
      post 'auth/logout', to: 'auth#logout'
      get 'auth/me', to: 'auth#me'
      
      # 管理者専用API
      namespace :admin do
        get 'users', to: 'admin#users'
        get 'users/:id', to: 'admin#user'
        put 'users/:id', to: 'admin#update_user'
        delete 'users/:id', to: 'admin#delete_user'
      end

      # ユーザープロフィール
      resource :user_profile, only: [:show, :create, :update]

      get 'home', to: 'home#index'
    end
  end

  # Root path
  root 'home#index'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
