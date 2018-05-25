import _ from 'lodash';

import {FETCH_RESTAURANTS} from '../actions'
import {SHORTENED_LIST} from '../actions'

export default function(state = null, action){
  switch(action.type){
    case FETCH_RESTAURANTS:
      return action.payload.data.results;
    case SHORTENED_LIST:
      return action.payload;
    default:
      return state;
  }
}
