import React from 'react';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

import RecipeForm from './recipe-form';


export default class RecipeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      editing: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);

    axios.defaults.baseURL = 'http://localhost:5000';
  }
  componentDidMount() {
    axios.get('/r/get')
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
    axios.post('/r/add', newItem)
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
    axios.put('/r/edit/'+editedItem.id, editedItem)
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
    axios.put('/r/del/'+id)
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
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Servings</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr>
                <td><Link to={"/recipe/"+item.id}>{item.name}</Link></td>
                <td>{item.servings}</td>
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
            ))}
          </tbody>
        </table>

        <div className="columns">
          <div className="column"></div>
          <div className="column">
            <RecipeForm handleSubmit={this.handleSubmit} />
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
              <RecipeForm handleSubmit={this.handleEditSubmit} editing={this.state.editing} item={this.state.editing !== -1 ? this.state.items[this.state.editing] : {}} />
            </section>
          </div>
        </div>
      </div>
    );
  }
}
