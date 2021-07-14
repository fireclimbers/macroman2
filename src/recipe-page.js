import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ItemForm from './item-form';
import RecipeIngredientForm from './recipe-ingredient-form';
import { reorder, getItemStyle, getListStyle } from './dnd-funcs.js';


export default class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      searched_items: [],
      editing: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    axios.defaults.baseURL = 'http://localhost:5000';
  }
  componentDidMount() {
    this.queryIngredients();
  }
  queryIngredients() {
    axios.get('/ri/get/'+this.props.recipe_id)
      .then((response) => {
        if (response.data.result) {
          this.setState({
            items: response.data.result,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }
  startEdit(i, e) {
    this.setState({
      editing: i
    })
  }
  render() {
    var totalG = this.state.items.reduce(function (sum, item) {
      if (item.visible)
        return sum + (item.protein*item.recipe_quantity/item.quantity) + (item.fat*item.recipe_quantity/item.quantity) + (item.carbs*item.recipe_quantity/item.quantity);
      return sum;
    }, 0);

    var totalProtein = this.state.items.reduce(function (sum, item) {
      if (item.visible)  
        return sum + (item.protein*item.recipe_quantity/item.quantity);
      return sum;
    }, 0);

    var totalFat = this.state.items.reduce(function (sum, item) {
      if (item.visible)  
        return sum + (item.fat*item.recipe_quantity/item.quantity);
      return sum;
    }, 0);

    var totalCarbs = this.state.items.reduce(function (sum, item) {
      if (item.visible)  
        return sum + (item.carbs*item.recipe_quantity/item.quantity);
      return sum;
    }, 0);

    var totalCals = this.state.items.reduce(function (sum, item) {
      if (item.visible)
        return sum + (item.cals*item.recipe_quantity/item.quantity);
      return sum;
    }, 0);

    var that = this;

    return (
      <div className="container">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Cals</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Quantity</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <tbody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.items.map((item, index) => (
                    <Draggable key={'drag'+index} draggableId={'drag'+index} index={index}>
                      {(provided, snapshot) => (
                        <tr
                          className={item.visible ? '' : 'has-text-grey-lighter'}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <td>{item.name}</td>
                          <td>{(item.cals*item.recipe_quantity/item.quantity).toFixed(2)}</td>
                          <td>{(item.protein*item.recipe_quantity/item.quantity).toFixed(2)}</td>
                          <td>{(item.fat*item.recipe_quantity/item.quantity).toFixed(2)}</td>
                          <td>{(item.carbs*item.recipe_quantity/item.quantity).toFixed(2)}</td>
                          <td>{item.recipe_quantity+' '+item.unit}</td>
                          <td>
                            <p className="buttons">
                              <button className="button is-small" onClick={that.startEdit.bind(that, index)}>
                                <span className="icon is-small has-text-primary">
                                  <i className="fas fa-pen"></i>
                                </span>
                              </button>
                            </p>
                          </td>
                          <td>
                            <p className="buttons">
                              <button className="button is-small" onClick={that.handleEditSubmit.bind(that, {id: item.id, visible: !item.visible})}>
                                <span className={"icon is-small "+(item.visible ? '' : 'has-text-grey-lighter')}>
                                  <i className="fas fa-eye"></i>
                                </span>
                              </button>
                            </p>
                          </td>
                          <td>
                            <p className="buttons">
                              <button className="button is-small" onClick={that.deleteItem.bind(that, item.id)}>
                                <span className="icon is-small has-text-danger">
                                  <i className="fas fa-times"></i>
                                </span>
                              </button>
                            </p>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
            <tfoot>
            <tr>
              <td>Total</td>
              <td>{totalCals.toFixed(2)}</td>
              <td>{totalProtein.toFixed(2)+" ("+Math.round(totalProtein*100/totalG)+"%)"}</td>
              <td>{totalFat.toFixed(2)+" ("+Math.round(totalFat*100/totalG)+"%)"}</td>
              <td>{totalCarbs.toFixed(2)+" ("+Math.round(totalCarbs*100/totalG)+"%)"}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
          </table>
        </DragDropContext>

        <div className="columns">
          <div className="column">
            <div className="field">
              <p className="control">
                <input value={this.state.servings} id="servings" onChange={this.handleChange} className="input" type="text" placeholder="Servings"/>
              </p>
            </div>
            <p className="subtitle is-5">
              {(totalCals/(this.state.servings || 1)).toFixed(2)} / {(totalProtein/(this.state.servings || 1)).toFixed(2)} / {(totalFat/(this.state.servings || 1)).toFixed(2)} / {(totalCarbs/(this.state.servings || 1)).toFixed(2)}
            </p>
          </div>
          <div className="column">
            <div className="field">
              <p className="control">
                <input ref={(input) => { this.searchInput = input; }} value={this.state.search} id="search" onChange={this.handleSearch.bind(this)} className="input" type="text" placeholder="Search"/>
              </p>
            </div>
            <table className="table is-fullwidth is-hoverable">
              <tbody>
                {this.state.searched_items.map((item, index) => (
                  <tr>
                    <td><a onClick={this.addItem.bind(this, item)}>{item.name}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="column">
            <ItemForm handleSubmit={this.handleSubmit} />
          </div>          
        </div>
        
        <div className={"modal "+(this.state.editing !== -1 ? 'is-active' : '')}>
          <div className="modal-background"></div>
          <div className="modal-card" style={{width:480}}>
            <header className="modal-card-head">
              <p className="modal-card-title">Edit item</p>
              <button className="delete" aria-label="close" onClick={() => {this.setState({editing: -1})}}></button>
            </header>
            <section className="modal-card-body">
              <RecipeIngredientForm handleSubmit={this.handleEditSubmit} editing={this.state.editing} item={this.state.editing !== -1 ? this.state.items[this.state.editing] : {}} />
            </section>
            {/*<footer className="modal-card-foot">
              <button className="button is-success">Save changes</button>
              <button className="button">Cancel</button>
            </footer>*/}
          </div>
        </div>
      </div>
    );
  }

  handleChange(e) {
    var args = {};
    args[e.target.id] = e.target.value;
    this.setState(args);
  }

  handleSearch(e) {
    const value = e.target.value;
    var args = {};
    args[e.target.id] = value;
    this.setState(args);

    if (value.length > 2) {
      axios.get('/i/get?search='+value)
        .then((response) => {
          if (response.data.result) {
            this.setState({
              searched_items: response.data.result,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  addItem(item, e) {
    //     id = db.Column(db.Integer, primary_key=True)
    // recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    // ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'))
    // name = db.Column(db.String(50))
    // quantity = db.Column(db.Float)
    // order = db.Column(db.Integer)
    // visible = db.Column(db.Integer)

    var newItem = {
      recipe_id: this.props.recipe_id,
      ingredient_id: item.id,
      name: item.name,
      quantity: item.quantity
    }

    axios.post('/ri/add', newItem)
      .then((response) => {
        if (response.data.result) {
          this.queryIngredients();
          this.setState({
            search:''
          })
          this.searchInput.focus();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit(newItem) {
    this.setState(state => ({
      items: state.items.concat(newItem),
    }));
  }
  handleEditSubmit(editedItem) {
    axios.put('/ri/edit/'+editedItem.id, editedItem)
      .then((response) => {
        if (response.data.result) {
          this.queryIngredients();
          /*this.state.items[this.state.editing] = editedItem;
          this.setState(state => ({
            items: this.state.items,
            editing: -1
          }));*/
          this.setState(state => ({
            editing: -1
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    
  }
  deleteItem(id, e) {
    axios.put('/ri/del/'+id)
      .then((response) => {
        if (response.data.result) {
          this.setState(state => ({
            items: state.items.filter((itm) => itm.id !== id),
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }
}
