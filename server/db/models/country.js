'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

// prettier-ignore
var Country = db.define(
  'country',
  {
    name: { /* should be good */
      type: Sequelize.STRING,
      allowNull: false,
    },
    GFI: { /* should be good */
      type: Sequelize.INTEGER,
      validate: {
        max: 10,
        min: 0,
      },
    },
    flagUrl: {/* should be good */
      type: Sequelize.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
    },
  },
  {}
);

// must have a method getTopFive which finds the top 5 strongest nations sorted by GFI (0 is the strongest, 10 is the weakest)

// prettier-ignore
Country.getTopFive = function() { /* should be good */
  return Country.findAll({
    limit:5,
    order: [
      ['GFI', 'ASC']
    ]
  });
};

module.exports = Country;
