class ApiResponseService
  def self.user_json(user)
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  end

  def self.user_json_with_timestamps(user)
    user_json(user).merge({
                            created_at: user.created_at,
                            updated_at: user.updated_at
                          })
  end

  def self.success_response(data = nil, message = nil, status = :ok)
    response = { status: 'success' }
    response[:message] = message if message
    response[:data] = data if data

    { json: response, status: status }
  end

  def self.error_response(message, status = :unprocessable_entity, errors = nil)
    response = {
      status: 'error',
      message: message
    }
    response[:errors] = errors if errors

    { json: response, status: status }
  end
end
