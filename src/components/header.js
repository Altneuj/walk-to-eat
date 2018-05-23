import React, { Component } from "react";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      query: '';
      badQuery: false;
    }
  }

  validateQuery = () => {
    if(this.state.query != ''){

    } else {
      this.state.badQuery = true;
    }
  }

  render() {
    return(
      <div className="search-bar row justify-content-center">
        <h3 className="app-title col-4">Walk to Eat</h3>
        <input
          className={this.state.badQuery ? 'form-control col-6 inputError' : "form-control col-6"}
          onChange={event => this.setState({name: event.target.value})}
          value={this.state.name} placeholder="McDonald"/>
        <button
          className="normal-button col-2 justify-content-center mr-2"
          onClick={this.validateQuery}>Search</button>
      </div>
    )
  }

};
