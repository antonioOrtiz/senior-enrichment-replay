import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default function Countries(props) {
  // console.log('props', props.countries);

  const countries = props.countries;
  const flagStyle = {
    height: '50px',
    width: '100px',
  };
  return (
    <div className="row">
      <div className="twelve columns">
        <h2> - Countries -</h2>
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>GFI</th>
              <th>Flag </th>
            </tr>
          </thead>

          {countries.map(function(country) {
            return (
              <tbody key={country.id}>
                <tr>
                  <td>
                    <Link className="country-page-link" to={`/countries/${country.id}`}>
                      {country.name}
                    </Link>
                  </td>
                  <td>{country.GFI}</td>
                  <td>
                    <img style={flagStyle} src={country.flagUrl} />
                  </td>
                </tr>
              </tbody>
            );
          })}

          {/*  {countries ? (
            countries.map(country => {
              return (
                <tbody key={country.id}>
                  <tr>
                    <td>
                      <Link className="country-page-link" to={`/countries/${country.id}`}>
                        {country.name}
                      </Link>
                    </td>
                    <td>{country.GFI}</td>
                    <td>
                      <img style={flagStyle} src={country.flagUrl} />
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <div>Sorry no content yet!</div>
          )}*/}
        </table>
      </div>
    </div>
  );
}
