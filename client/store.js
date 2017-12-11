import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import topFiveCountriesByGFIReducer from './reducers/topFiveCountriesByGFI';
import countriesReducer from './reducers/countries';
import oneCountryReducer from './reducers/oneCountry';

const middleware = [loggingMiddleware, thunkMiddleware];

const rootReducer = combineReducers({
  topFiveCountries: topFiveCountriesByGFIReducer,
  countries: countriesReducer,
  oneCountry: oneCountryReducer,
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
