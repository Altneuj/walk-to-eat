import _ from 'lodash';

import {FETCH_RESTAURANTS} from '../actions'

export default function(state = null, action){
  switch(action.type){
    case FETCH_RESTAURANTS:
      return action.payload.data.results;
    default:
      return state;
  }
}
