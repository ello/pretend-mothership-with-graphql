Rails.application.routes.draw do
  mount Knock::Engine => '/knock'

  get 'hello_world', to: 'hello_world#index'
  get 'pages/home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root to: 'pages#home'

  scope '/graphql' do
    post '/', to: 'graphql#create'
  end
  resources :posts
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end
end
