'use strict';

import axios from 'axios';

// ACTION TYPES
const GET_COUNTRIES = 'GET_COUNTRIES';

// ACTION CREATORS
export function getCountries(countries) {
  const action = {
    type: GET_COUNTRIES,
    countries,
  };
  return action;
}

//THUNK CREATORS
export function fetchCountries() {
  return function thunk(dispatch) {
    return axios
      .get('/api/countries')
      .then(res => res.data)
      .then(countries => dispatch(getCountries(countries)))
      .catch(console.error);
  };
}

// REDUCER
const reducer = function(state = [], action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return action.countries;
    // return { ...state, countries: action.countries };
    default:
      return state;
  }
};

export default reducer;
