import axios from "axios";


const ROOT_URL = "https://places.cit.api.here.com/places/v1/autosuggest";
export const FETCH_RESTAURANTS = "fetch_restaurants";
export const FETCH_CURRENT = "fetch_current";



export function fetchRestaurants(query, current) {
  const config = axios.create({
    app_id:'ywegjljTpyiHoMNwUD6Z',
    app_code: 'ypSNbilqIyvvxhFmG-Mx6g',
    q: query,
    at: `${current.latitude},${current.longitude}`
  })
  const request = axios.get(`${ROOT_URL}`, config);

  return {
    type: FETCH_RESTAURANTS,
    payload: request
  };
}

export function fetchCurrent(){
  // let location = navigator.geolocation.getCurrentPosition();

  // const location = navigator.geolocation.getCurrentPosition((position) => position.coords.longitude);
  // console.log(location);
  //
  //   return {
  //     type: FETCH_CURRENT,
  //     payload: location
  //   }
// navigator.geolocation.getCurrentPosition((position) => {
//   location = position.coords
// });

// return {
//   type: FETCH_CURRENT,
//   payload: navigator.geolocation.getCurrentPosition((position) =>  position.coords)
// }
}
