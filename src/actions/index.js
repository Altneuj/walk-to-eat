import axios from "axios";


const ROOT_URL_RESTAURANTS = "https://places.cit.api.here.com/places/v1/autosuggest?";
const ROOT_URL_FOOD = 'https://trackapi.nutritionix.com/v2/search/instant'
export const FETCH_RESTAURANTS = "fetch_restaurants";
export const FETCH_CURRENT = "fetch_current";
export const SHORTENED_LIST = "shortened_list"
export const FETCH_FOOD = 'fetch_food';
const app_id = 'ywegjljTpyiHoMNwUD6Z';
const app_code ='ypSNbilqIyvvxhFmG-Mx6g';



export function fetchRestaurants(query, current) {
  const config = {
    app_id:'ywegjljTpyiHoMNwUD6Z',
    app_code:'ypSNbilqIyvvxhFmG-Mx6g',
    q: query,
    in: `${current.latitude},${current.longitude};r=10000`
  }

    const request = axios.get(`${ROOT_URL_RESTAURANTS}`, {params: config});
  return {
    type: FETCH_RESTAURANTS,
    payload: request
  };
}

export function fetchCurrent(){
  var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }


return {
  type: FETCH_CURRENT,
  payload: getPosition()
}
}

export function resetRestaurants(list){
  return {
    type: SHORTENED_LIST,
    payload: list
  }
}

export function fetchFoods(query){
  const config = {
    query: query,
    detailed: true,
  }
  const headersConfig =  {
    'x-app-id': '91ee9f1a',
    'x-app-key': 'a40b3d2bd1b43e6acf6e6821582c0dfe'
}
  const request = axios({
    url: ROOT_URL_FOOD,
      headers: headersConfig,
    method: 'get',
    params: config

});

return {
  type: FETCH_FOOD,
  payload: request
}
}
