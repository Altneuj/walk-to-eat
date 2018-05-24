import _ from 'lodash';
import {FETCH_FOOD} from '../actions';

export default function(state={}, action){
  switch(action.type){
    case FETCH_FOOD:
    console.log(action.payload)
      return action.payload.data;
    default:
      return state;
  }
}
