class Post < ApplicationRecord
  belongs_to :author, class_name: 'User', touch: true
  def body_content
    body.first['data']
  end
end
