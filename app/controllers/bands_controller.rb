class BandsController < ApplicationController
  require 'httparty'

  USER_AGENT = { "User-Agent" => "MusicBandsApp/1.0 (your.email@example.com)" }.freeze

  def index
    city = params[:city]
    return render_error('City not provided', 400) unless city.present?

    area = fetch_area(city)
    return render_error('Area not found', 404) unless area

    artists = fetch_artists(area['id'])
    filtered = filter_recent_groups(artists)

    render json: filtered.first(50)
  end

  private

  def fetch_area(city)
    response = HTTParty.get(
      "https://musicbrainz.org/ws/2/area",
      query: { query: city, fmt: 'json' },
      headers: USER_AGENT
    )
    response['areas']&.first
  end

  def fetch_artists(area_id)
    response = HTTParty.get(
      "https://musicbrainz.org/ws/2/artist",
      query: { area: area_id, fmt: 'json', limit: 100 },
      headers: USER_AGENT
    )
    response['artists'] || []
  end

  def filter_recent_groups(artists)
    cutoff_year = Date.today.year - 10

    artists.select do |artist|
      next false unless artist['type'] == 'Group'

      begin_date = artist.dig('life-span', 'begin')
      next false unless begin_date.present?

      begin_year = begin_date[0, 4].to_i
      begin_year >= cutoff_year
    end
  end
  
  def render_error(message, status)
    render json: { error: message }, status: status
  end
end
