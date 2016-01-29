class GraphqlController < ApplicationController
  protect_from_forgery except: [:create]
  def create
    result = ::RelaySchema.execute(
      params[:query],
      debug: true,
      variables: params[:variables],
      context: {
        current_user: (p current_user)
      }
    )
    render json: result
  end
end
