import { combineReducers } from "redux";
import RestaurantsReducer from './restaurants-reducer';
import CurrentReducer from './current-reducer';

const rootReducer = combineReducers({
  restaurants: RestaurantsReducer,
  currentLocation: CurrentReducer
});

export default rootReducer;
