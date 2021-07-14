from flask import Flask
from db import db

from models.ingredient import Ingredient
from models.recipe import Recipe 
from models.recipeingredient import RecipeIngredient

from routes.test import test_bp
from routes.ingredient import ingredient_bp
from routes.recipe import recipe_bp
from routes.recipeingredient import recipeingredient_bp

from settings import DB_URI

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
db.init_app(app)

#from app import app
#from app import db
#with app.app_context():
#	db.create_all()

app.register_blueprint(test_bp)
app.register_blueprint(ingredient_bp)
app.register_blueprint(recipe_bp)
app.register_blueprint(recipeingredient_bp)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	return response