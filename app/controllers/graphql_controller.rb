class GraphqlController < ApplicationController
  protect_from_forgery except: [:create]
  def create
    result = ::RelaySchema.execute(
      params[:query],
      debug: true,
      variables: params[:variables]
    )
    render json: result
  end
end
