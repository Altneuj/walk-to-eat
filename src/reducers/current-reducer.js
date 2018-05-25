import _ from 'lodash';

import {FETCH_CURRENT} from '../actions';

export default function(state = {
 latitude: 36.0015886,
 longitude: -78.9005222
   }, action){
  switch(action.type){
    case FETCH_CURRENT:
      return {...state, latitude: action.payload.coords.latitude, longitude: action.payload.coords.longitude};
    default:
      return state;
  }
}
