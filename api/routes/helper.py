from sqlalchemy import inspect

def row_to_dict(obj):
	return {c.key: getattr(obj, c.key)
		for c in inspect(obj).mapper.column_attrs}