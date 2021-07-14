from flask import Blueprint, request
from db import db

from routes.helper import row_to_dict

from models.ingredient import Ingredient 

ingredient_bp = Blueprint('ingredient', __name__, template_folder='templates')



# Get all ingredients
@ingredient_bp.route('/i/get', methods=['GET'])
def get_ingredients():
	ingredients = Ingredient.query
	
	# Add filter for search
	query = request.args.get('search','')

	if query != '':
		ingredients = ingredients.filter(Ingredient.name.contains(query))

	ingredients = ingredients.all()

	ingredients_list = []
	for i in ingredients:
		ingredients_list.append(row_to_dict(i))

	return {'result':ingredients_list}


# Add ingredient
@ingredient_bp.route('/i/add', methods=['POST'])
def add_ingredient():
	data = request.get_json(force=True)

	data.pop('id',None)

	i = Ingredient(**data)

	db.session.add(i)
	db.session.commit()

	return {'result':i.id}


# Edit ingredient
@ingredient_bp.route('/i/edit/<id>', methods=['PUT'])
def edit_ingredient(id=None):
	data = request.get_json(force=True)

	if data['id'] == -1:
		return {'error': 'invalid ID'}

	db.session.query(Ingredient).filter_by(id=id).update(data)
	db.session.commit()

	return {'result':1}


# Del ingredient
@ingredient_bp.route('/i/del/<id>', methods=['PUT'])
def del_ingredient(id=None):
	i = db.session.get(Ingredient, id)
	
	db.session.delete(i)
	db.session.commit()

	return {'result':1}




