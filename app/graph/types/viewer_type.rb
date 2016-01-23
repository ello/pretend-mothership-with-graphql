ViewerType = GraphQL::ObjectType.define do
  name 'Viewer'
  description 'Blah'
  interfaces [NodeIdentification.interface]

  global_id_field :id

  connection :posts, PostType.connection_type do
    argument :filter, types.String
    description 'Post connection to fetch paginated posts collection'
    resolve ->(_object, args, _ctx) {
      args['filter'] ?
        Post.send(args['filter']).includes(:author) :
        Post.includes(:author)
    }
  end
end
