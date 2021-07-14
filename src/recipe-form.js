
import React from 'react';

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      name: props.name || '',
      servings: props.servings || '4'
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
        servings: this.props.item.servings
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
                        id="servings"
                        className="input is-small" 
                        type="text" 
                        placeholder="Servings"
                        onChange={this.handleChange}
                        value={this.state.servings} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
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
      servings: this.state.servings
    };
    this.props.handleSubmit(newItem);
    this.setState(state => ({
      id: -1,
      name: '',
      servings: '4'
    }));
    this.nameInput.focus();
  }
}