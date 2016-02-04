ContentType = GraphQL::ObjectType.define do
  name "ContentType"
  description "A chunk of content from a post"
  field :kind, types.String do
    resolve -> (obj, _args, _ctx) { obj["kind"] }
  end
  field :data, types.String do
    resolve -> (obj, *) { obj["data"] }
  end
end

PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A single post entry returns a post with author"
  interfaces [NodeIdentification.interface]
  global_id_field :id
  field :body, types[ContentType]
  field :content, types.String, property: :token
  field :author, UserType, "Author of the post"
  field :created_at, types.String, "Creation date of post"

  connection :comments, -> { PostType.connection_type } do
    resolve ->(post, _args, _ctx) {
      comments = Post.comments_for(post.id)
    }
  end
end
