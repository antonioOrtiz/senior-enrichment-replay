import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Aircrafts from './Aircrafts';
import Countries from './Countries';
import NotFound from './NotFound';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {};
    // this.nextJoke = this.nextJoke.bind(this)
    // this.answer = this.answer.bind(this)
  }

  componentDidMount() {
    // this.nextJoke()
  }

  // nextJoke() {
  //   this.setState({
  //     joke: randomJoke(),
  //     answered: false,
  //   })
  // }

  // answer() {
  //   this.setState({answered: true})
  // }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <header>
                <div className="row">
                  <div className="six columns">
                    <Link to="/aircrafts">Aircrafts</Link>
                  </div>
                  <div className="six columns">
                    <Link to="/countries">Countries</Link>
                  </div>
                </div>
              </header>
            </div>
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
