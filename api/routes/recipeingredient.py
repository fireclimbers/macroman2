from flask import Blueprint, request
from db import db

from routes.helper import row_to_dict

from models.recipeingredient import RecipeIngredient 

recipeingredient_bp = Blueprint('recipeingredient', __name__, template_folder='templates')


# Get all ingredients for recipe
@recipeingredient_bp.route('/ri/get/<recipe_id>', methods=['GET'])
def get_ingredients(recipe_id=None):
	ingredients = RecipeIngredient.query.filter_by(recipe_id=recipe_id).all()
	
	ingredients_list = []
	for i in ingredients:
		d_i = row_to_dict(i.ingredient)

		d_i['order'] = i.order
		d_i['visible'] = i.visible
		d_i['recipe_quantity'] = i.quantity
		d_i['name'] = i.name
		d_i['id'] = i.id
		d_i['recipe_id'] = i.recipe_id
		d_i['ingredient_id'] = i.ingredient_id

		ingredients_list.append(d_i)

	return {'result':ingredients_list}


# Add ingredient for recipe
@recipeingredient_bp.route('/ri/add', methods=['POST'])
def add_ingredient():
	data = request.get_json(force=True)

	data.pop('id',None)

	i = RecipeIngredient(**data)

	db.session.add(i)
	db.session.commit()

	return {'result':i.id}


# Edit ingredient
@recipeingredient_bp.route('/ri/edit/<ri_id>', methods=['PUT'])
def edit_ingredient(ri_id=None):
	data = request.get_json(force=True)
	print(data)
	if data['id'] == -1:
		return {'error': 'invalid ID'}

	db.session.query(RecipeIngredient).filter_by(id=ri_id).update(data)
	print('???')
	db.session.commit()

	return {'result':1}


# Del ingredient
@recipeingredient_bp.route('/ri/del/<ri_id>', methods=['PUT'])
def del_ingredient(ri_id=None):
	i = db.session.get(RecipeIngredient, ri_id)
	
	db.session.delete(i)
	db.session.commit()

	return {'result':1}




