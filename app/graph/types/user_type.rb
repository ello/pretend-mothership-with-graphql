UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'A user'
  field :id, types.ID, 'The id of the user'
  field :username, types.String, 'The username of the user'
  field :name, types.String, 'The name of the user'
  field :email, types.String, 'The email address of the user'
  field :created_at, types.String, 'The date the account was created'
end
