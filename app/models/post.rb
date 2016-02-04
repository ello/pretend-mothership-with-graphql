class Post < ApplicationRecord
  belongs_to :author, class_name: 'User', touch: true
  scope :comments_for, ->(post_id) {where(parent_post_id: post_id) }

  attribute :body, :json
end
