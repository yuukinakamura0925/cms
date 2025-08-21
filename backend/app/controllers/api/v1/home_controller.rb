module Api
  module V1
    class HomeController < ApplicationController
      def index
        render json: {
          message: "Welcome to CMS API",
          status: "ok",
          data: {
            title: "Content Management System",
            description: "A simple CMS built with Rails API and Next.js",
            version: "1.0.0"
          }
        }
      end
    end
  end
end
