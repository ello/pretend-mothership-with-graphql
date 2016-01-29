body_field = GraphQL::Field.define do
  name 'Body'
  type !types.String
  description 'The body of the post'
  resolve -> (obj, _args, _ctx) { obj.body_content }
end

ContentType = GraphQL::ObjectType.define do
  name 'ContentType'
  description 'A chunk of content from a post'
  field :kind, types.String do
    resolve -> (obj, _args, _ctx) { obj['kind']}
  end
  field :data, types.String do
    resolve -> (obj, *) { obj['data'] }
  end
end

PostType = GraphQL::ObjectType.define do
  name 'Post'
  description 'A single post entry returns a post with author'
  interfaces [NodeIdentification.interface]
  global_id_field :id
  field :id, types.ID, 'ID of this post'
  field :body, field: body_field
  field :content, types.String, property: :token
  field :body_content, types[ContentType] do
    resolve -> (obj, *) { obj.body }
  end
  field :author, UserType, 'Author of the post'
  field :created_at, types.String, 'Creation date of post'
end
