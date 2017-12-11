import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default function TopFiveCountriesByGFI(props) {
  console.log('this.props!', props.topFiveCountries);
  const topFiveCountries = props.topFiveCountries;

  const flagStyle = {
    height: '50px',
    width: '100px',
  };

  return (
    <div className="row">
      <div className="twelve columns">
        <h2> - Top Five Coutries By GFI -</h2>
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>GFI</th>
              <th>Flag </th>
            </tr>
          </thead>

          {topFiveCountries.map(function(country) {
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
        </table>
      </div>
    </div>
  );
}

// const mapDispatch = dispatch => ({

//   fetchTopFiveCountriesByGFI: () => {
//     dispatch(fetchTopFiveCountriesByGFI());
//   },
// });

// const mapState = state => ({
//   topFiveCountries: state.topFiveCountries,
// });

// export default connect(mapState, mapDispatch)(TopFiveCountriesByGFI);
