class Post < ApplicationRecord
  belongs_to :author, class_name: 'User', touch: true
  attribute :body, :json
  def body_content
    body.first['data']
  end
end
