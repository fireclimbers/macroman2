from flask import Blueprint, request
from db import db

from routes.helper import row_to_dict

from models.recipe import Recipe 

recipe_bp = Blueprint('recipe', __name__, template_folder='templates')


# Get all recipes
@recipe_bp.route('/r/get', methods=['GET'])
def get_recipes():
	recipes = Recipe.query.all()
	
	recipes_list = []
	for i in recipes:
		recipes_list.append(row_to_dict(i))

	return {'result':recipes_list}


# Add recipe
@recipe_bp.route('/r/add', methods=['POST'])
def add_recipe():
	data = request.get_json(force=True)

	data.pop('id',None)

	i = Recipe(**data)

	db.session.add(i)
	db.session.commit()

	return {'result':i.id}


# Edit recipe
@recipe_bp.route('/r/edit/<id>', methods=['PUT'])
def edit_recipe(id=None):
	data = request.get_json(force=True)

	if data['id'] == -1:
		return {'error': 'invalid ID'}

	db.session.query(Recipe).filter_by(id=id).update(data)
	db.session.commit()

	return {'result':1}


# Del recipe
@recipe_bp.route('/r/del/<id>', methods=['PUT'])
def del_recipe(id=None):
	i = db.session.get(Recipe, id)
	
	db.session.delete(i)
	db.session.commit()

	return {'result':1}




