import React, { Component } from 'react';
import { fetchCountry } from '../reducers/oneCountry';
import { connect } from 'react-redux';
import store from '../store';

class SingleCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const countryId = this.props.match.params.id;
    this.props.getCountry(countryId);
  }

  render() {
    const oneCountry = this.props.oneCountry[0] || [];
    const flagStyle = {
      height: '50px',
      width: '100px',
    };

    // const loading = this.state.loading;
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

          {/* <div className="row">
            <div className="twelve columns">
              <div className="airplane-container">
                <div className="wings" />
                <div className="circle" />
                <div className="arc" />
                <div className="arc2" />
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    oneCountry: state.oneCountry,
  };
};

const mapDispatch = dispatch => {
  return {
    getCountry: function(countryId) {
      dispatch(fetchCountry(countryId));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleCountry);
