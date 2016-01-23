NodeIdentification = GraphQL::Relay::GlobalNodeIdentification.define do
  object_from_id -> (id, ctx) do
    type, id = NodeIdentification.from_global_id(id)
    Object.const_get(type).find(id)
  end

  type_from_object -> (object) do
    (object.class.name + 'Type').constantize
  end
end
