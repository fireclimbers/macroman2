from flask import Blueprint, request

test_bp = Blueprint('test', __name__, template_folder='templates')

@test_bp.route('/test', methods=['GET'])
def test():
	return "hey there"


