# Load the Rails application.
puts "SECRET_KEY_BASE exists: #{ENV['SECRET_KEY_BASE'].present?}"

require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
