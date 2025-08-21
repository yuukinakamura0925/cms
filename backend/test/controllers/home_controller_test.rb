require "test_helper"

class Api::V1::HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get "/api/v1/home"
    assert_response :success
  end

  test "should return json with correct structure" do
    get "/api/v1/home"
    assert_response :success
    
    json_response = JSON.parse(response.body)
    assert_equal "Welcome to CMS API", json_response["message"]
    assert_equal "ok", json_response["status"]
    assert json_response["data"]["title"]
    assert json_response["data"]["description"]
    assert json_response["data"]["version"]
  end
end
