import React from 'react';
import TopFiveCountriesByGFI from './TopFiveCountriesByGFI';

export default function Home(props) {
  const topFiveCountries = props.topFiveCountries;

  return (
    <div className="row">
      <div className="twelve columns">
        <h1>- Welcome to the Senior Enrichment Project -</h1>
        <TopFiveCountriesByGFI topFiveCountries={topFiveCountries} />
      </div>
    </div>
  );
}
