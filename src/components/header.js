import React, { Component } from "react";
import {fetchRestaurants, fetchCurrent} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      badQuery: false
    }

    this.props.fetchCurrent();

  }

  validateQuery = () => {
    if(this.state.query !== ''){
   this.props.fetchRestaurants(this.state.query, this.props.currentLocation)
       this.props.fetchFoods(this.state.query);
    } else {
      this.setState({badQuery: true});
    }
  }

  render() {
    return(
      <div className="search-bar row justify-content-center p-2 mt-2">
        <h3 className="app-title col-3 text-center">Walk to Eat</h3>
        <input
          className={this.state.badQuery ? 'form-control col-5 inputError' : "form-control col-6"}
          onChange={event => this.setState({query: event.target.value})}
          value={this.state.query} placeholder="McDonald"/>
        <button
          className="normal-button col-2 justify-content-center"
          onClick={this.validateQuery}>Search</button>
      </div>
    )
  }

};

function mapStateToProps({currentLocation}){
  return{currentLocation}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRestaurants, fetchCurrent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
