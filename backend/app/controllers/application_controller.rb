class ApplicationController < ActionController::API
  include JwtAuthenticatable
  include ApiResponse
end
