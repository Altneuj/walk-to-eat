import React, { Component } from "react";
import {fetchRestaurants, fetchCurrent, fetchFoods} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      badQuery: false
    }
    // this.props.fetchCurrent();
  }

  validateQuery = (e) => {
    e.preventDefault();
    document.getElementById('form-input').blur();

    if(this.state.query !== ''){
     this.props.fetchRestaurants(this.state.query, this.props.currentLocation)
     this.props.fetchFoods(this.state.query);

     this.setState({badQuery: false});
    } else {
      this.setState({badQuery: true});
    }
  }

  // remove the error message when the user is focused on the input.
  // this is only relevent after the user has tried to submit a bad request
  // and the error message has appeared. styles are applied with conditional
  // classes depending on its state.
  onFocus = () => {
    this.setState({badQuery: false})
  }

  render() {
    return(
      <div className="search-bar justify-content-center">
        <div className="row">
          <h3 className="app-title col-12 text-center">Walk to Eat</h3>
        </div>
        <form action="" onSubmit={this.validateQuery}>
          <div className="form-row">
            <div className="input-container col-8 offset-2 align-items-center">
              <input
                className={this.state.badQuery ? 'form-control inputError' : "form-control"}
                id="form-input"
                onFocus={this.onFocus}
                onChange={event => this.setState({query: event.target.value})}
                value={this.state.query} placeholder="McDonald's"/>
                <div className={this.state.badQuery ? 'error-message' : "hide"}>
                  Please enter a valid input
                </div>
            </div>
            <div className="col">
              <i
                onClick={this.props.fetchCurrent}
                className="fa fa-crosshairs fa-2x"
                title="Use my location">
              </i>
              <button
                className="btn btn-primary normal-button"
                type="submit">Search
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

};

function mapStateToProps({currentLocation, food}){
  return{currentLocation, food}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRestaurants, fetchCurrent, fetchFoods}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
