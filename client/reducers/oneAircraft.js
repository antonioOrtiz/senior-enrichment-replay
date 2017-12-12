'use strict';

import axios from 'axios';

// ACTION TYPES
const GET_AIRCRAFT = 'GET_AIRCRAFT';

// ACTION CREATORS
export function getAircraft(oneAircraft) {
  const action = {
    type: GET_AIRCRAFT,
    oneAircraft,
  };
  return action;
}

//THUNK CREATORS

export function fetchAircraft(aircraftId) {
  return function thunk(dispatch) {
    return axios
      .get('/api/aircrafts/' + `${aircraftId}`)
      .then(res => res.data)
      .then(aircraft => {
        const action = getAircraft(aircraft);
        dispatch(action);
      });
  };
}

// REDUCER
const reducer = function(state = [], action) {
  switch (action.type) {
    case GET_AIRCRAFT:
      return action.oneAircraft;
    default:
      return state;
  }
};

export default reducer;
