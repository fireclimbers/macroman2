from db import db

class Ingredient(db.Model):
	__tablename__ = 'ingredient'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50))
	cals = db.Column(db.Integer)
	protein = db.Column(db.Integer)
	fat = db.Column(db.Integer)
	carbs = db.Column(db.Integer)
	quantity = db.Column(db.Float)
	unit = db.Column(db.String(30))

	def __repr__(self):
		return f"Ingredient({self.id!r} {self.name!r})"