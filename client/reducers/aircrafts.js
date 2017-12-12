'use strict';

import axios from 'axios';

// ACTION TYPES
const GET_AIRCRAFTS = 'GET_AIRCRAFTS';

// ACTION CREATORS
export function getAircrafts(aircrafts) {
  const action = {
    type: GET_AIRCRAFTS,
    aircrafts,
  };
  return action;
}

//THUNK CREATORS
export function fetchAircrafts() {
  return function thunk(dispatch) {
    return axios
      .get('/api/aircrafts')
      .then(res => res.data)
      .then(aircrafts => dispatch(getAircrafts(aircrafts)))
      .catch(console.error);
  };
}

// REDUCER
const reducer = function(state = [], action) {
  switch (action.type) {
    case GET_AIRCRAFTS:
      return action.aircrafts;
    default:
      return state;
  }
};

export default reducer;
