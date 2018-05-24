import _ from 'lodash';

import {FETCH_RESTAURANTS} from '../actions'

export default function(state = null, action){
  switch(action.type){
    case FETCH_RESTAURANTS:
    console.log(action.payload)
      return action.payload.results;
    default:
      return state;
  }
}
