module ApiResponse
  extend ActiveSupport::Concern

  private

  # 成功レスポンスの基本形式
  def success_response(data = nil, message = nil, status = :ok)
    response = { status: 'success' }
    response[:message] = message if message
    response[:data] = data if data

    render json: response, status: status
  end

  # エラーレスポンスの基本形式
  def error_response(message, status = :unprocessable_entity, errors = nil)
    response = {
      status: 'error',
      message: message
    }
    response[:errors] = errors if errors

    render json: response, status: status
  end
end
