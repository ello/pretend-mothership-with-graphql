body_field = GraphQL::Field.define do
  name 'Body'
  type !types.String
  description 'The body of the post'
  resolve -> (obj, _args, _ctx) { obj.body_content }
end

PostType = GraphQL::ObjectType.define do
  name 'Post'
  description 'A single post entry returns a post with author'
  field :id, types.ID, 'ID of this post'
  field :body, field: body_field
  field :author, UserType, 'Author of the post'
  field :created_at, types.String, 'Creation date of post'
end
