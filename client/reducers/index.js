/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux';
import axios from 'axios';

const initialState = {
  topFiveCountries: [],
};

// ACTION TYPES

const GET_TOP_COUNTRIES_BY_GFI = 'GET_TOP_COUNTRIES_BY_GFI';

// ACTION CREATORS
export function getTopFiveCountriesByGFI(countries) {
  const action = {
    type: GET_TOP_COUNTRIES_BY_GFI,
    countries,
  };
  return action;
}

export function fetchTopFiveCountriesByGFI() {
  return function thunk(dispatch) {
    return axios
      .get('/api/countries/top-five-countries')
      .then(res => res.data)
      .then(countries => {
        const action = getTopFiveCountriesByGFI(countries);
        dispatch(action);
      });
  };
}

// REDUCER
const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_TOP_COUNTRIES_BY_GFI:
      return { ...state, topFiveCountries: action.countries };
    default:
      return state;
  }
};

export default rootReducer;
