import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import geodist from 'geodist'
import {resetRestaurants} from '../actions'


class List extends Component {
  constructor(props) {
  super(props);
  }

  toggleFoodList = (item) => {
    let list = ReactDOM.findDOMNode(this.refs[item.id]);
    list.classList.toggle('hide');

    let button =ReactDOM.findDOMNode(this.refs[item.id+"button"]);
    button.classList.toggle('fa-angle-double-down');
    button.classList.toggle('fa-angle-double-up');
  }

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

    if (foodList.length > 0) {
      return categorizedList.map(item => {
        return (
        <li className='list-group-item' key={item.id}>
          <div className='col-12 restaurant'>
            <div className="title">
              {item.title}
            </div>
            <div className="details">
              <a href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.currentLocation.latitude},${this.props.currentLocation.longitude}&destination=${item.position[0]},${item.position[1]}&travelmode=walking`} target="blank">
                <span>
                  {item.address} ({item.distance} Miles/{item.caloriesAvailable} Calories burned)
                </span>
              </a>
              <span
                onClick={() => this.toggleFoodList(item)}
                className="show-food-list">
                Show List <i
                  ref={`${item.id}button`}
                  className="fa fa-angle-double-down">
                </i>

              </span>
            </div>
          </div>
          <div className="hide" ref={item.id}>
            <ul className="food-list">
              {foodList.map(foodItem => {
                return (
                  foodItem.full_nutrients.map((n, index) => {
                    if (n.attr_id === 208 && n.value < item.caloriesAvailable) {
                      return (
                        <li key={index} className="food-item">{foodItem.food_name} ({n.value} Calories)</li>
                      );
                    }
                  })
                )
              })}
            </ul>
          </div>
        </li>);
      });
    }
  }

  render() {
    if (this.props.restaurants) {
      return (
        <div className="restaurants">
          <ul className='list-group justify-content-center'>
            {this.renderListItems()}
          </ul>
        </div>
      );
    }

    return (
      <div className="row justify-content-center mt-3">
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
