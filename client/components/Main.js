import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Aircrafts from './Aircrafts';
import Countries from './Countries';
import SingleCountry from './SingleCountry';
import SingleAircraft from './SingleAircraft';

import NotFound from './NotFound';

import { fetchTopFiveCountriesByGFI } from '../reducers/topFiveCountriesByGFI';
import { fetchCountries } from '../reducers/countries';
import { fetchAircrafts } from '../reducers/aircrafts';

import store from '../store';
import { connect } from 'react-redux';

class Main extends Component {
  componentDidMount() {
    this.props.fetchTopFiveCountriesByGFI();
    this.props.fetchCountries();
    this.props.fetchAircrafts();
  }

  render() {
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
                <Route exact path="/" render={() => <Home topFiveCountries={this.props.topFiveCountries} />} />
                <Route exact path="/aircrafts" render={() => <Aircrafts aircrafts={this.props.aircrafts} />} />
                <Route
                  exact
                  path="/countries"
                  render={() => {
                    return <Countries countries={this.props.countries} />;
                  }}
                />
                <Route exact path="/countries/:id" component={SingleCountry} />
                <Route exact path="/aircrafts/:id" component={SingleAircraft} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchCountries: () => {
    dispatch(fetchCountries());
  },
  fetchTopFiveCountriesByGFI: () => {
    dispatch(fetchTopFiveCountriesByGFI());
  },
  fetchAircrafts: () => {
    dispatch(fetchAircrafts());
  },
});

const mapState = state => ({
  topFiveCountries: state.topFiveCountries,
  countries: state.countries,
  aircrafts: state.aircrafts,
});

export default connect(mapState, mapDispatch)(Main);
