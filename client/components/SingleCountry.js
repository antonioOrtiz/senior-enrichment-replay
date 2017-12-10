import React, { Component } from 'react';
import { fetchCountry } from '../reducers';
import store from '../store';

export default class SingleCountry extends Component {
  constructor(props) {
    super(props);
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
    console.log('this.props: ', this.props);
    console.log('this.state: ', this.state);
    const oneCountry = this.state.oneCountry[0] || [];
    console.log('oneCountry', oneCountry);
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
                <td>{oneCountry.name}</td>
                <td>{oneCountry.GFI}</td>
                <td>
                  <img style={flagStyle} src={oneCountry.flagUrl} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

SingleCountry.defaultProps = {
  singleCountry: [],
};
