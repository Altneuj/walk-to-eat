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
        //TODO VALIDATION
        <li className='list-group-item row' key={item.id}>
          <div className='col-9'>
            <a href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.currentLocation.latitude},${this.props.currentLocation.longitude}&destination=${item.position[0]},${item.position[1]}&travelmode=walking`} target="blank">
              <div className="restaurant">
                <div className="title">
                  {item.title}
                </div>
                <div className="details">
                  {item.address} ({item.distance} Miles/{item.caloriesAvailable} Calories burned)
                </div>
              </div>
            </a>
          </div>
          <div className='col-3'>
            <button type='button' onClick={ () => this.toggleFoodList(item)} className="btn btn-primary">Food</button>
          </div>

          <div className="hide" ref={item.id}>
            <ul className="flex">
              {foodList.map(foodItem => {
                return (
                  foodItem.full_nutrients.map(n => {
                    if (n.attr_id === 208 && n.value < item.caloriesAvailable) {
                      return (
                        <li order={n.value} className="foodItems">{foodItem.food_name} ({n.value} Calories)</li>
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



      // this.props.resetRestaurants(categorizedList)
  }

  render() {
    if (this.props.restaurants) {
      return (<div>
        <h3 className="row justify-content-center mt-3">Choices below:</h3>
        <ul className='list-group row justify-content-center'>
          {this.renderListItems()}
        </ul>
      </div>);
    }

    return (
      <div className="row justify-content-center mt-3">
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
