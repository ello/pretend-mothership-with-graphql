QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root of this schema. See available queries.'

  field :node, field: NodeIdentification.field

  field :root, ViewerType do
    description 'Root object to get viewer-related collections'
    resolve -> (_obj, _args, _ctx) { Viewer::STATIC }
  end

  field :post, PostType do
    argument :id, !types.ID
    description 'Root object to get viewer related collections'
    resolve -> (_obj, args, _ctx) {
      Post.find(args['id'])
    }
  end
end
