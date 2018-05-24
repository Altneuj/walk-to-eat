import _ from 'lodash';

import {FETCH_CURRENT} from '../actions';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_CURRENT:
    console.log(action.payload)
      return {...state, latitude: action.payload.coords.latitude, longitude: action.payload.coords.longitude};
    default:
      return state;
  }
}
