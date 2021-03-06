"""prot

Revision ID: ef9410b6f6ee
Revises: 
Create Date: 2021-07-10 15:33:51.169606

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ef9410b6f6ee'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_table('ingredient')
    # op.drop_table('recipe')
    # op.drop_table('recipeingredient')
    pass
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.create_table('recipeingredient',
    # sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    # sa.Column('recipe_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.Column('ingredient_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.Column('name', mysql.VARCHAR(length=50), nullable=True),
    # sa.Column('quantity', mysql.FLOAT(), nullable=True),
    # sa.Column('order', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.ForeignKeyConstraint(['ingredient_id'], ['ingredient.id'], name='recipeingredient_ibfk_2'),
    # sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], name='recipeingredient_ibfk_1'),
    # sa.PrimaryKeyConstraint('id'),
    # mysql_default_charset='latin1',
    # mysql_engine='InnoDB'
    # )
    # op.create_table('recipe',
    # sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    # sa.Column('name', mysql.VARCHAR(length=50), nullable=True),
    # sa.Column('servings', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.PrimaryKeyConstraint('id'),
    # mysql_default_charset='latin1',
    # mysql_engine='InnoDB'
    # )
    # op.create_table('ingredient',
    # sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    # sa.Column('name', mysql.VARCHAR(length=50), nullable=True),
    # sa.Column('cals', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.Column('p', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.Column('f', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.Column('c', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    # sa.Column('quantity', mysql.FLOAT(), nullable=True),
    # sa.Column('unit', mysql.VARCHAR(length=30), nullable=True),
    # sa.PrimaryKeyConstraint('id'),
    # mysql_default_charset='latin1',
    # mysql_engine='InnoDB'
    # )
    pass
    # ### end Alembic commands ###
