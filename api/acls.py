import requests
import json

def get_restaurant_photos(api_key, restaurant_name):
    url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    params = {
        'query': restaurant_name,
        'key': api_key,
    }

    response = requests.get(url, params=params)
    data = response.json()
    
    if 'results' in data:
        place_id =data['results'][0]['place_id']
        photos = get_place_photos(api_key, place_id)
        return photos
    
    return None

def get_place_photos(api_key, place_id):
    url = 'https://maps.googleapis.com/maps/api/place/details/json'
    params = {
        'place_id': place_id,
        'fields': 'photos',
        'key': api_key,
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    if 'result' in data and 'photos' in data['result']:
        photo_references = data['result']['photos']
        photo_urls = []
        
        for photo in photo_references:
            photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={photo['photo_references']}&key={api_key}"
            photo_urls.append(photo_url)
            
        return photo_urls
    
    return None