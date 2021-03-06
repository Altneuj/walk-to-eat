import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import geodist from 'geodist'
import {resetRestaurants} from '../actions'


class List extends Component {
  constructor(props) {
  super(props);

  this.state = {
    filterMode: "walk",
    lapNumber: 0
  }
  }

  changeCalories = (item) => {
    switch(this.state.filterMode){
      case 'walk':
        return item.caloriesAvailable;
      case 'burpee':
        return item.caloriesBurpee;
      case 'bear-crawl':
        return item.caloriesBearCrawl;
      case 'parking-lot':
        return item.caloriesLap + (this.state.lapNumber * 100)
      }
  }

  parkingLot = () => {
        this.state.lapNumber++
        this.setState({filterMode: 'parking-lot'})
  }

  burpeeButton = () => {
    let list = ReactDOM.findDOMNode(this.refs['parking-button']);
    if(!list.classList.contains('hide')){
      list.classList.add('hide')
    }
    let reset = ReactDOM.findDOMNode(this.refs['reset-button']);
    if(!reset.classList.contains('hide')){
      reset.classList.add('hide')
    }
  let laps = ReactDOM.findDOMNode(this.refs['laps']);
  if(!laps.classList.contains('hide')){
    laps.classList.add('hide')
  }
     this.setState({filterMode: 'burpee'})
  }

  bearButton = () =>{
    let list = ReactDOM.findDOMNode(this.refs['parking-button']);
    if(!list.classList.contains('hide')){
      list.classList.add('hide')
    }
    let reset = ReactDOM.findDOMNode(this.refs['reset-button']);
    if(!reset.classList.contains('hide')){
      reset.classList.add('hide')
    }
  let laps = ReactDOM.findDOMNode(this.refs['laps']);
  if(!laps.classList.contains('hide')){
    laps.classList.add('hide')
  }

    this.setState({filterMode: 'bear-crawl'})
  }

  walkButton = () => {
    let list = ReactDOM.findDOMNode(this.refs['parking-button']);
    list.classList.remove('hide');

    let reset = ReactDOM.findDOMNode(this.refs['reset-button']);
    reset.classList.remove('hide');

    let laps = ReactDOM.findDOMNode(this.refs['laps']);
    if(laps.classList.contains('hide')){
      laps.classList.remove('hide')
    }
     this.setState({filterMode: 'walk'})
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
        let roundTrip = (item.distance * 2)
        item.caloriesAvailable = (roundTrip) * 100
        item.caloriesBurpee = (((roundTrip * 15) * 10) + (roundTrip * 100))
        item.caloriesBearCrawl = (roundTrip * 600)
        item.caloriesLap = (roundTrip) * 100
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
                {item.address} ({item.distance} Miles/{this.changeCalories(item)} Calories burned)
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
                switch(this.state.filterMode){
                  case 'walk':
                    return (
                      foodItem.full_nutrients.map((n, index) => {
                        if (n.attr_id === 208 && n.value < item.caloriesAvailable) {
                          return (
                            <li key={index} className="food-item">{foodItem.food_name} ({n.value} Calories)</li>
                          );
                        }
                      })
                    );
                case 'burpee':
                  return (
                    foodItem.full_nutrients.map((n, index) => {
                      if (n.attr_id === 208 && n.value < item.caloriesBurpee) {
                        return (
                          <li key={index} className="food-item">{foodItem.food_name} ({n.value} Calories)</li>
                        );
                      }
                    })
                  );
              case 'bear-crawl':
                  return (
                    foodItem.full_nutrients.map((n, index) => {
                      if (n.attr_id === 208 && n.value < item.caloriesBearCrawl) {
                        return (
                          <li key={index} className="food-item">{foodItem.food_name} ({n.value} Calories)</li>
                        );
                      }
                    })
                  );
              case 'parking-lot':
              item.caloriesLap = item.caloriesAvailable + (100 * this.state.lapNumber)
              return (
                foodItem.full_nutrients.map((n, index) => {
                  if (n.attr_id === 208 && n.value < item.caloriesLap) {
                    return (
                      <li key={index} className="food-item">{foodItem.food_name} ({n.value} Calories)</li>
                    );
                  }
                })
              );
              }
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
          <button  className='btn' type='button' onClick={()=> this.walkButton()}>Walk</button>
          <button  className='btn' onClick={()=> this.burpeeButton()}>Burpee</button>
          <button  className='btn' onClick={()=> this.bearButton()}>Bear-Crawl</button>
          <button ref="parking-button" className='btn' onClick={()=> this.parkingLot()}>Parking-lot Lap</button>
          <button ref='reset-button' className='btn' onClick={() => this.setState({lapNumber: 0})}>Reset Laps</button>
          <h4 ref="laps">Lap Number {this.state.lapNumber}</h4>
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
