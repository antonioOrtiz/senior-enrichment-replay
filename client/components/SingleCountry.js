import React, { Component } from 'react';
import { fetchCountry } from '../reducers';
import store from '../store';

export default class SingleCountry extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

    const countryId = this.props.match.params.id;
    const fetchCountryThunk = fetchCountry(countryId);

    store.dispatch(fetchCountryThunk);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const flagStyle = {
      height: '50px',
      width: '100px',
    };

    const country = this.state;
    const singleCountry = country[0];
    return (
      <div className="row">
        <div className="twelve columns">
          <h2> - Single Country -</h2>

          <table className="u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>GFI</th>
                <th>Flag </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{singleCountry && singleCountry.name}</td>
                <td>{singleCountry && singleCountry.GFI}</td>
                <td>
                  <img style={flagStyle} src={singleCountry && singleCountry.flagUrl} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
