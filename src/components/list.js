import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import geodist from 'geodist'
import {resetRestaurants} from '../actions'


class List extends Component {
  renderListItems() {
    const newListFormat = []
    let foodList = this.props.food

    this.props.restaurants.forEach(item => {
      if (item.position && item.vicinity && item.category.includes("food")) {
        let lat = item.position[0]
        let lon = item.position[1]
        item.distance = geodist({
          lat: lat,
          lon: lon
        }, {
          lat: this.props.currentLocation.latitude,
          lon: this.props.currentLocation.longitude
        })
        item.caloriesAvailable = (item.distance * 2) * 100
        item.address = item.vicinity.split('<br/>').join(' ');

        newListFormat.push(item);
      }
    })

    let categorizedList = newListFormat.filter(function(item) {
      if(item.distance >1){
        return item;
      }
    })

    categorizedList.sort((a, b) => {
      if (a.distance > b.distance) {
        return -1;
      }
      if (a.distance < b.distance) {
        return 1;
      }
      return 0;
    });

    return categorizedList.map(item => {
      return (
      //TODO VALIDATION
      <li className='list-group-item' key={item.id}>
        <div className="restarant-details">
          {item.title} --- {item.address} --- {item.distance} Miles
        </div>
        <div className="foods-available">
          <ul>
            {foodList.map(foodItem => {
              foodItem.full_nutrients.map(n => {
                if (n.attr_id === 208 && n.value < item.caloriesAvailable) {
                  return (
                    <li>{foodItem.food_name}</li>
                  );
                }
              })
            })}
          </ul>

        </div>

      </li>);
    });

      this.props.resetRestaurants(categorizedList)
  }

  render() {
    if (this.props.restaurants) {
      return (<div>
        <h3 className="row justify-content-center">Choices below:</h3>
        <ul className='list-group row justify-content-center'>
          {this.renderListItems()}
        </ul>
      </div>);
    }

    return (
      <div className="row justify-content-center">
        <h1>Please Search a Restaurant :)</h1>
      </div>)
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({resetRestaurants}, dispatch)
}

function mapStateToProps({restaurants, currentLocation, food}){
  return {restaurants, currentLocation, food}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
