import React, { Component } from 'react';
import { fetchAircraft } from '../reducers/oneAircraft';
import { connect } from 'react-redux';
import store from '../store';

class SingleAircraft extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const airAircaftId = this.props.match.params.id;
    this.props.fetchAircraft(airAircaftId);
  }

  render() {
    const oneAircraft = this.props.oneAircraft[0] || [];
    const imageStyle = {
      height: '50px',
      width: '100px',
    };

    // const loading = this.state.loading;
    return (
      <div className="row">
        <div className="twelve columns">
          <h2> - Single Aircrafts -</h2>

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
            <tbody>
              <tr>
                <td>{oneAircraft.make}</td>
                <td>{oneAircraft.model}</td>
                <td>{oneAircraft.year}</td>
                <td>{oneAircraft.type}</td>
                <td>{oneAircraft.cost}</td>
                <td>
                  <img style={imageStyle} src={oneAircraft.imageUrl} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    oneAircraft: state.oneAircraft,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAircraft: function(airAircaftId) {
      dispatch(fetchAircraft(airAircaftId));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleAircraft);
