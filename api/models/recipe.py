from db import db

class Recipe(db.Model):
	__tablename__ = 'recipe'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50))
	servings = db.Column(db.Integer)

	def __repr__(self):
		return f"Recipe({self.id!r} {self.name!r})"