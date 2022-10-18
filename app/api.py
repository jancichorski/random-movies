import os
import json
import requests
from flask_restful import Resource
from flask import render_template_string, make_response, request
from dotenv import load_dotenv


load_dotenv()
api_url = 'https://api.themoviedb.org/3'
api_key = os.getenv('API_KEY')
language = 'en-US'

class MovieApi(Resource):
    def get(self):
        url = f"{api_url}/movie/latest?api_key={api_key}&language={language}"

        response = requests.get(url)
        body = response.json()
        payload = request.get_json(silent=True)
        print(f"\33[95m{payload}\33[0m")
        headers = {'Content-Type': 'text/html'}
        return body

class TrendingMoviesApi(Resource):
    def post(self):
        # print(f"\33[95hi\33[0m")
        # payload = request.get_json(silent=False)
        payload = json.loads(request.data, strict=False)
        # print(f"\33[95m{payload}\33[0m")
        media_type = payload.get('media_type', 'all')
        time_window = payload.get('time_window', 'week')
        page = payload.get('page', '1')
        url = f"{api_url}/trending/{media_type}/{time_window}?api_key={api_key}&language={language}&page={page}"
        response = requests.get(url)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        body = response.json()
        if not response.ok:
            return body, response.status_code
        return body
        # return [result.get('title') or result.get('name') for result in body['results']]
        