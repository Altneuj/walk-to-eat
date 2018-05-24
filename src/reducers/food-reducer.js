import _ from 'lodash';
import {FETCH_FOOD} from '../actions';

export default function(state={}, action){
  switch(action.type){
    case FETCH_FOOD:
      return [...action.payload.data.branded, ...action.payload.data.common]
    default:
      return state;
  }
}
