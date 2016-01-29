class User < ApplicationRecord
  attribute :encrypted_password, :string

  def authenticate(password)
    bcrypt = ::BCrypt::Password.new(encrypted_password)
    password = ::BCrypt::Engine.hash_secret(password, bcrypt.salt)
    secure_compare(encrypted_password, password)
  end

  private

  def secure_compare(a, b)
    return false if a.blank? || b.blank? || a.bytesize != b.bytesize
    l = a.unpack "C#{a.bytesize}"

    res = 0
    b.each_byte { |byte| res |= byte ^ l.shift }
    res == 0
  end
end
