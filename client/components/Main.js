import React, { Component } from 'react';
import store from '../store';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Aircrafts from './Aircrafts';
import Countries from './Countries';
import NotFound from './NotFound';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribeFromStore = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromStore();
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
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/aircrafts" render={() => <Aircrafts />} />
                <Route exact path="/countries" render={() => <Countries />} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
