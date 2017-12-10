/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux';
import axios from 'axios';

const initialState = {
  topFiveCountries: [],
  oneCountry: [],
  countries: [],
};

// ACTION TYPES

const GET_TOP_COUNTRIES_BY_GFI = 'GET_TOP_COUNTRIES_BY_GFI';
const GET_COUNTRY = 'GET_COUNTRY';
const GET_COUNTRIES = 'GET_COUNTRIES';

// ACTION CREATORS
export function getTopFiveCountriesByGFI(topFiveCountries) {
  const action = {
    type: GET_TOP_COUNTRIES_BY_GFI,
    topFiveCountries,
  };
  return action;
}

export function getCountry(oneCountry) {
  const action = {
    type: GET_COUNTRY,
    oneCountry,
  };
  return action;
}

export function getCountries(countries) {
  const action = {
    type: GET_COUNTRIES,
    countries,
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
      });
  };
}

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
export function fetchCountries() {
  return function thunk(dispatch) {
    return axios
      .get('/api/countries')
      .then(res => res.data)
      .then(countries => dispatch(getCountries(countries)))
      .catch(console.error);
  };
}
// export const fetchCountries = () => dispatch => {
//   return axios
//     .get('/api/countries')
//     .then(res => res.data)
//     .then(countries => {
//       dispatch(getCountries(countries));
//       return countries;
//     })
//     .catch(console.error.bind(console));
// };

// REDUCER
const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      // return action.countries;
      return { ...state, countries: action.countries };
    // return (state.countries = state.countries.concat(action.countries));
    case GET_TOP_COUNTRIES_BY_GFI:
      // return action.topFiveCountries;
      return { ...state, topFiveCountries: action.topFiveCountries };
    case GET_COUNTRY:
      // return action.oneCountry;
      return { ...state, oneCountry: action.oneCountry };

    default:
      return state;
  }
};

export default rootReducer;
