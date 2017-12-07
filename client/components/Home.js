import React from 'react';

const Home = () => (
  <div className="row">
    <div className="twelve columns">
      <h1>- Welcome to the Senior Enrichment Project -</h1>
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dave Gamache</td>
            <td>26</td>
            <td>Male</td>
            <td>San Francisco</td>
          </tr>
          <tr>
            <td>Dwayne Johnson</td>
            <td>42</td>
            <td>Male</td>
            <td>Hayward</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Home;
