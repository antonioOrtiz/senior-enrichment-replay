import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import topFiveCountriesByGFIReducer from './reducers/topFiveCountriesByGFI';
import countriesReducer from './reducers/countries';
import oneCountryReducer from './reducers/oneCountry';
import aircraftsReducer from './reducers/aircrafts';
import oneAircraft from './reducers/oneAircraft';

import { reducer as myFormReducer } from 'redux-form';

const middleware = [loggingMiddleware, thunkMiddleware];

const rootReducer = combineReducers({
  topFiveCountries: topFiveCountriesByGFIReducer,
  countries: countriesReducer,
  oneCountry: oneCountryReducer,
  aircrafts: aircraftsReducer,
  oneAircraft: oneAircraft,
  form: myFormReducer,
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
