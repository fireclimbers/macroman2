import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ItemForm from './item-form';
import { reorder, getItemStyle, getListStyle } from './dnd-funcs.js';


export default class IngredientIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      editing: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    axios.defaults.baseURL = 'http://localhost:5000';
  }
  componentDidMount() {
    axios.get('/i/get')
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
  handleChange(e) {
    var args = {};
    args[e.target.id] = e.target.value;
    this.setState(args);
  }
  handleSubmit(newItem) {
    axios.post('/i/add', newItem)
      .then((response) => {
        if (response.data.result) {
          newItem.id = response.data.result;
          console.log(newItem.id);
          this.setState(state => ({
            items: state.items.concat(newItem),
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleEditSubmit(editedItem) {
    axios.put('/i/edit/'+editedItem.id, editedItem)
      .then((response) => {
        if (response.data.result) {
          this.state.items[this.state.editing] = editedItem;
          this.setState(state => ({
            items: this.state.items,
            editing: -1
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteItem(id, e) {
    axios.put('/i/del/'+id)
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
  render() {
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
                          className={''}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <td>{item.name}</td>
                          <td>{item.cals}</td>
                          <td>{item.protein}</td>
                          <td>{item.fat}</td>
                          <td>{item.carbs}</td>
                          <td>{item.quantity+' '+item.unit}</td>
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
          </table>
        </DragDropContext>

        <div className="columns">
          <div className="column"></div>
          <div className="column">
            <ItemForm handleSubmit={this.handleSubmit} />
          </div>
          <div className="column"></div>
        </div>
        <div className={"modal "+(this.state.editing !== -1 ? 'is-active' : '')}>
          <div className="modal-background"></div>
          <div className="modal-card" style={{width:480}}>
            <header className="modal-card-head">
              <p className="modal-card-title">Edit item</p>
              <button className="delete" aria-label="close" onClick={() => {this.setState({editing: -1})}}></button>
            </header>
            <section className="modal-card-body">
              <ItemForm handleSubmit={this.handleEditSubmit} editing={this.state.editing} item={this.state.editing !== -1 ? this.state.items[this.state.editing] : {}} />
            </section>
          </div>
        </div>
      </div>
    );
  }
}
