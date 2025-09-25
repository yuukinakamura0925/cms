module JwtAuthenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
  end

  private

  def authenticate_user!
    token = extract_token_from_header
    return render_unauthorized unless token

    payload = JwtService.decode(token)
    return render_unauthorized unless payload

    @current_user = User.find_by(id: payload['user_id'])
    render_unauthorized unless @current_user
  end

  def current_user
    @current_user
  end

  def extract_token_from_header
    header = request.headers['Authorization']
    return nil unless header

    header.split.last
  end

  def render_unauthorized
    error_response('認証が必要です', :unauthorized)
  end
end
