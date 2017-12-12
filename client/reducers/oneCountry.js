'use strict';

import axios from 'axios';

// ACTION TYPES
const GET_COUNTRY = 'GET_COUNTRY';

// ACTION CREATORS
export function getCountry(oneCountry) {
  const action = {
    type: GET_COUNTRY,
    oneCountry,
  };
  return action;
}

//THUNK CREATORS

export function fetchCountry(countryId) {
  return function thunk(dispatch) {
    return axios
      .get('/api/countries/' + `${countryId}`)
      .then(res => res.data)
      .then(country => {
        const action = getCountry(country);
        dispatch(action);
      });
  };
}

// REDUCER
const reducer = function(state = [], action) {
  switch (action.type) {
    case GET_COUNTRY:
      return action.oneCountry;
    default:
      return state;
  }
};

export default reducer;
