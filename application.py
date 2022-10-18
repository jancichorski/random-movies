from flask import Flask, render_template_string
from flask_restful import Api
from app.api import MovieApi, TrendingMoviesApi
import requests, json
from flask_cors import CORS

def create_app():

    app = Flask(__name__)
    cors = CORS(app, resources={r"/trending_movies": {"origins": "http://localhost:3000"}})

    api = Api(app)
    api.add_resource(MovieApi, '/movie')
    api.add_resource(TrendingMoviesApi, '/trending_movies')
    
    return app

if __name__ == '__main__':
    _app = create_app()
    _app.run(port=80, debug=True)


