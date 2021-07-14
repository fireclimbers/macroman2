
import React from 'react';

export default class RecipeIngredientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      name: props.name || '',
      cals: props.cals || '',
      protein: props.protein || '0',
      fat: props.fat || '0',
      carbs: props.carbs || '0',
      quantity: props.quantity || "1",
      unit: props.unit || "oz",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    console.log('huh', prevProps.editing, this.props.editing);
    if (prevProps.editing !== this.props.editing) {
      this.setState({
        id: this.props.item.id || -1,
        name: this.props.item.name,
        cals: this.props.item.cals,
        protein: this.props.item.protein,
        fat: this.props.item.fat,
        carbs: this.props.item.carbs,
        quantity: this.props.item.recipe_quantity,
        unit: this.props.item.unit
      })
    }
  }
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="columns">
            <div className="column">
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input 
                        id="name"
                        className="input is-small" 
                        type="text" 
                        placeholder="Name"
                        ref={(input) => { this.nameInput = input; }}
                        onChange={this.handleChange}
                        value={this.state.name} />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <input 
                        id="cals"
                        className="input is-small" 
                        type="text" 
                        placeholder="Cals"
                        value={this.state.cals} disabled />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input 
                        id="protein"
                        className="input is-small" 
                        type="text" 
                        placeholder="Protein"
                        value={this.state.protein} disabled />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <input 
                        id="fat"
                        className="input is-small" 
                        type="text" 
                        placeholder="Fat"
                        value={this.state.fat} disabled />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <input 
                        id="carbs"
                        className="input is-small" 
                        type="text" 
                        placeholder="Carbs"
                        value={this.state.carbs} disabled />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input 
                        id="quantity"
                        className="input is-small" 
                        type="text" 
                        placeholder="Quantity"
                        onChange={this.handleChange}
                        value={this.state.quantity} />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <input 
                        id="unit"
                        className="input is-small" 
                        type="text" 
                        placeholder="Unit"
                        value={this.state.unit} disabled/>
                    </p>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button className="button is-primary">
                        Add item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    );
  }

  handleChange(e) {
    var args = {};
    args[e.target.id] = e.target.value;
    this.setState(args);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*if (!this.state.text.length) {
      return;
    }*/
    const newItem = {
      id: this.state.id,
      name: this.state.name,
      quantity: this.state.quantity
    };
    this.props.handleSubmit(newItem);
    this.setState(state => ({
      id: -1,
      name: '',
      cals: '',
      protein: '0',
      fat: '0',
      carbs: '0',
      quantity: '1',
      unit: 'oz'
    }));
    this.nameInput.focus();
  }
}