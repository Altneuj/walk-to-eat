import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import geodist from 'geodist'

class List extends Component{
  renderListItems(){
    const newList = this.props.restaurants.map(item => {
        if(item.position){
            let lat = item.position[0]
            let lon = item.position[1]
            item.distance = geodist({lat: lat, lon: lon}, {lat: this.props.currentLocation.latitude, lon: this.props.currentLocation.longitude})
            item.caloriesAvailable = (item.distance*2)*100
            //sort and slice here. Map newList
        }
        return item
      })
  console.log(newList)
  console.log(this.props.restaurants)
      return newList.map(item => {
    return (
      //TODO VALIDATION
      <li className='list-group-item' key={item.id}>{item.title} --- {item.vicinity} --- {item.distance} Miles </li>
      );
    });
  }

  render(){
    if(this.props.restaurants){
    return (
    <div>
      <h3>Choices below:</h3>
      <ul className='list-group'>
        {this.renderListItems()}
      </ul>
    </div>
    );
  }

  return(
    <h1> Please Search a Restaurant :) </h1>
  )
  }
}

function mapStateToProps({restaurants, currentLocation}){
  return {restaurants, currentLocation}
}

export default connect(mapStateToProps)(List);
