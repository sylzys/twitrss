#!/usr/bin/env ruby

require 'json'
require 'sinatra'
require 'rubygems'
require 'pry'
require 'rest_client'

get '/' do 
	erb (:index)
end

get '/search/' do 
	params[:exp].gsub!(" ", "%20");
	params[:exp].gsub!(/\#/, "%23");
	
	url = 'http://search.twitter.com/search.json?q='+params[:exp]
	response = RestClient.get(url)
	@toto = JSON.parse(response.body)
	div = ""
	@toto['results'].each do |key,value| 
	params[:exp].gsub!(/%23/, "#");
	if params[:exp].include? "%20"
		terms = params[:exp].split('%20')
		terms.each do |term|
		key['text'].gsub!(/#{term}/i, "<span class='found_word'>#{term}</span>");
		end	
	end
	key['text'].gsub!(/#{params[:exp]}/i, "<span class='found_word'>#{params[:exp]}</span>");
	
	div = div + "<div class='tweet'><div class='tweet_header'><img class='prof_img' src='#{key['profile_image_url']}' /><span class='user'>#{key['from_user']}</span><p class='tweet_content'>#{key['text']}</p></div></div>";
end
div.to_json
end


