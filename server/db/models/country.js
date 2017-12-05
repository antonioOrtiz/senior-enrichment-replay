'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

var Country = db.define(
  'country',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    GFI: {
      type: Sequelize.DECIMAL,
      validate: {
        max: 10,
        min: 0,
      },
    },
    flagUrl: {
      type: Sequelize.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
    },
  },
  {}
);

// can have many aircrafts assigned (may have none)

// must have a method getTopFive which finds the top 5 strongest nations sorted by GFI (0 is the strongest, 10 is the weakest)

Country.getTopFive = function() {
  return Country.findAll().then(counties => {
    counties.filter(country => {});
  });
};

module.exports = Country;
