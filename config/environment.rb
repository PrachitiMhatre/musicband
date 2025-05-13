# Load the Rails application.
puts "SECRET_KEY_BASE exists: #{ENV['SECRET_KEY_BASE'].present?}"
puts "Environment variables: #{ENV.to_hash.inspect}"

require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
