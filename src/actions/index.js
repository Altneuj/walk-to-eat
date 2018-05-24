import axios from "axios";


const ROOT_URL = "https://places.cit.api.here.com/places/v1/autosuggest?";
export const FETCH_RESTAURANTS = "fetch_restaurants";
export const FETCH_CURRENT = "fetch_current";
const app_id = 'ywegjljTpyiHoMNwUD6Z';
const app_code ='ypSNbilqIyvvxhFmG-Mx6g';



export function fetchRestaurants(query, current) {
  const config = {
    app_id:'ywegjljTpyiHoMNwUD6Z',
    app_code:'ypSNbilqIyvvxhFmG-Mx6g',
    q: query,
    in: `${current.latitude},${current.longitude};r=10000`
  }
  // const request = axios.get(`${ROOT_URL}in=${current.latitude},${current.longitude};r=10000&q${query}&app_id=${app_id}&app_code=${app_code}`);
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

  console.log(getPosition());
  // getPosition()
  //   .then((position) => {
  //     console.log(position);
  //   })
  //   .catch((err) => {
  //     console.error(err.message);
  //   });

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

return {
  type: FETCH_CURRENT,
  payload: getPosition()
}
}
