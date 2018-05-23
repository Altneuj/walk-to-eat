import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class List extends Component{
  renderListItems(){
    return this.props.restaurants.map(item => {
    return (
      //TODO map through each item. Dont forget set key to item.id
      <li className='list-group-item'> This is going to be individual mapped items </li>
      );
    });
  }

  render(){
    return (
    <div>
      <h3>Choices below:</h3>
      <ul className='list-group'>
        {this.renderListItems()}
      </ul>
    </div>
    );
  }
}

function mapStateToProps({restaurants}){
  return {restaurants}
}

export default connect(mapStateToProps)(List);
