from db import db

class RecipeIngredient(db.Model):
	__tablename__ = 'recipeingredient'

	id = db.Column(db.Integer, primary_key=True)
	recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
	ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'))
	name = db.Column(db.String(50))
	quantity = db.Column(db.Float)
	order = db.Column(db.Integer, default=0)
	visible = db.Column(db.Integer, default=1)

	ingredient = db.relationship("Ingredient", backref="recipe_ingredients")
	
	def __repr__(self):
		return f"RecipeIngredient({self.id!r} {self.name!r})"