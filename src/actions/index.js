import axios from "axios";


const ROOT_URL = "https://places.cit.api.here.com/places/v1/autosuggest?";
export const FETCH_RESTAURANTS = "fetch_restaurants";
export const FETCH_CURRENT = "fetch_current";
export const SHORTENED_LIST = "shortened_list"
const app_id = 'ywegjljTpyiHoMNwUD6Z';
const app_code ='ypSNbilqIyvvxhFmG-Mx6g';



export function fetchRestaurants(query, current) {
  const config = {
    app_id:'ywegjljTpyiHoMNwUD6Z',
    app_code:'ypSNbilqIyvvxhFmG-Mx6g',
    q: query,
    in: `${current.latitude},${current.longitude};r=10000`
  }

    const request = axios.get(`${ROOT_URL}`, {params: config});
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
