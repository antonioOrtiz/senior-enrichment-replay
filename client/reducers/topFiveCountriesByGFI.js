'use strict';

import axios from 'axios';

// ACTION TYPES
const GET_TOP_COUNTRIES_BY_GFI = 'GET_TOP_COUNTRIES_BY_GFI';

// ACTION CREATORS
export function getTopFiveCountriesByGFI(topFiveCountries) {
  const action = {
    type: GET_TOP_COUNTRIES_BY_GFI,
    topFiveCountries,
  };
  return action;
}

//THUNK CREATORS
export function fetchTopFiveCountriesByGFI() {
  return function thunk(dispatch) {
    return axios
      .get('/api/countries/top-five-countries')
      .then(res => res.data)
      .then(countries => {
        const action = getTopFiveCountriesByGFI(countries);
        dispatch(action);
      })
      .catch(console.error);
  };
}

// REDUCER
const reducer = function(state = [], action) {
  switch (action.type) {
    case GET_TOP_COUNTRIES_BY_GFI:
      return action.topFiveCountries;
    // return { ...state, topFiveCountries: action.topFiveCountries };
    default:
      return state;
  }
};

export default reducer;
