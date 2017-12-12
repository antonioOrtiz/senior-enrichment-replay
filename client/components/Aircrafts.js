'use strict';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default function Aircrafts(props) {
  const aircrafts = props.aircrafts;
  console.log('aircrafts', aircrafts);

  const imageStyle = {
    height: '50px',
    width: '100px',
  };
  return (
    <div className="row">
      <div className="twelve columns">
        <h2> - Aircrafts -</h2>
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year </th>
              <th>Type</th>
              <th>Cost</th>
              <th>Visual </th>
            </tr>
          </thead>

          {aircrafts.map(function(aircraft) {
            return (
              <tbody key={aircraft.id}>
                <tr>
                  <td>
                    <Link className="aircraft-page-link" to={`/aircrafts/${aircraft.id}`}>
                      {aircraft.make}
                    </Link>
                  </td>
                  <td>{aircraft.model}</td>
                  <td>{aircraft.year}</td>
                  <td>{aircraft.type}</td>
                  <td>{aircraft.cost}</td>
                  <td>
                    <img style={imageStyle} src={aircraft.imageUrl} />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
