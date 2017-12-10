import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Aircrafts from './Aircrafts';
import Countries from './Countries';
import SingleCountry from './SingleCountry';
import NotFound from './NotFound';

import { fetchTopFiveCountriesByGFI, fetchCountries } from '../reducers';

import store from '../store';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    // console.log('fetchCountries typeof', typeof fetchCountries);
    // const fetchCountriesThunk = fetchCountries();
    store.dispatch(fetchCountries());
    store.dispatch(fetchTopFiveCountriesByGFI());
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const countries = this.state.countries;
    const topFiveCountries = this.state.topFiveCountries;
    const { singleCountry = [] } = this.state;
    const props = this.props;
    // console.log('topFiveCountries', topFiveCountries);

    return (
      <Router>
        <div className="container">
          <div className="row">
            <header>
              <div className="container">
                <div className="row">
                  <div className="twelve columns">
                    <nav>
                      <table className="u-full-width">
                        <thead>
                          <tr>
                            <th>
                              <Link to="/">Home</Link>
                            </th>
                            <th>
                              <Link to="/aircrafts">Aircrafts</Link>
                            </th>
                            <th>
                              <Link to="/countries">Countries</Link>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </nav>
                  </div>
                </div>
              </div>
            </header>
          </div>

          <div className="row">
            <div className="twelve columns">
              <Switch>
                <Route exact path="/" render={() => <Home topFiveCountries={topFiveCountries} />} />
                <Route exact path="/aircrafts" render={() => <Aircrafts />} />
                <Route
                  exact
                  path="/countries"
                  render={() => {
                    return <Countries countries={countries} />;
                  }}
                />
                <Route
                  exact
                  path="/countries/:id"
                  render={props => <SingleCountry {...props} singleCountry={singleCountry} />}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
