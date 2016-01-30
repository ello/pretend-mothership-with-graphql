class Post < ApplicationRecord
  belongs_to :author, class_name: 'User', touch: true
  attribute :body, :json
end
