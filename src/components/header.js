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
    // const handleLocation = () =>{
    //   console.log("handle location works");
    //   // this.props.fetchCurrent()
    // }
    // handleLocation();
  }

  validateQuery = () => {
    if(this.state.query !== ''){
      debugger;
      // this.props.fetchRestaurants(this.state.query, this.props.currentLocation)
      console.log( state.currentLocation, state.currentLocation.latitude)
    } else {
      this.setState({badQuery: true});
    }
  }

  render() {
    return(
      <div className="search-bar row justify-content-center">
        <h3 className="app-title col-4">Walk to Eat</h3>
        <input
          className={this.state.badQuery ? 'form-control col-6 inputError' : "form-control col-6"}
          onChange={event => this.setState({query: event.target.value})}
          value={this.state.query} placeholder="McDonald"/>
        <button
          className="normal-button col-2 justify-content-center mr-2"
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
