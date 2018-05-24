import { combineReducers } from "redux";
import RestaurantsReducer from './restaurants-reducer';
import CurrentReducer from './current-reducer';
import FoodReducer from './food-reducer';

const rootReducer = combineReducers({
  restaurants: RestaurantsReducer,
  currentLocation: CurrentReducer,
  food: FoodReducer
});

export default rootReducer;
