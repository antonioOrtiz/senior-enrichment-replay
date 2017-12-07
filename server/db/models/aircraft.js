'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

var Country = require('./country');

// prettier-ignore
var Aircraft = db.define(
  'aircrafts',
  {
    make: { /* should be good */
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: { /* should be good */
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: { /* should be good */
      type: Sequelize.STRING,
      validate: {
        isDate: true,
        isAfter: "1903-11-30",
      },
    },
    type: { /* should be good */
      type: Sequelize.STRING,
      validate: {
        isIn: [['Attack', 'Bomber', 'Versatile', 'Transport', 'Reconoissance', 'Rescue']],
      },
    },
    cost: { /* should be good */
      type: Sequelize.DECIMAL(7, 2),
    },
    imageUrl: { /* should be good */
      type: Sequelize.STRING,
      defaultValue:
        'http://media.gettyimages.com/photos/the-wright-brothers-give-a-demonstration-of-their-wright-model-a-picture-id530836658?k=6&m=530836658&s=612x612&w=0&h=66RNNerGkWA4C_784UK1-bXRret0CHY8QDl_HRYSY6I=',
    },
    description: {  /* should be good */
      type: Sequelize.TEXT,
    },
  },
  {}
);

// // we want to hook into the "beforeDestroy" lifecycle event
// // this lifecycle event happens before an instance is removed from the database,
// // so we can use this to "clean up" other rows that are also no longer needed
Country.beforeDestroy(countryInstance => {
  console.log('countryInstance', countryInstance);
  // make sure to return any promises inside hooks! This way Sequelize will be sure to
  // wait for the promise to resolve before advancing to the next lifecycle stage!
  return Aircraft.destroy({
    where: {
      countryId: countryInstance.id,
    },
    truncate: true,
  })
    .then(affectedRows => {
      return Aircraft.findAll();
    })
    .then(aircrafts => {
      console.log(aircrafts);
    });
});

// prettier-ignore
// must track the aircraft it succeeds via a reference called 'succeeded'
/* TBD */

// must be assigned to a country
// Aircraft.hook('beforeCreate', aircraft => {   not sure
//   /* not sure*/
//   aircraft.Country.name;
// });

// prettier-ignore
// must have a method getAircraftByType, that gets aircrafts by inputted type
Aircraft.getAircraftByType = function(type) { /* should be good */
  return Aircraft.findAll({ where: { type: type } });
};

// prettier-ignore
// must have a method to change the cost of 1 to $1,000,000 when retrieving records
Aircraft.prototype.costConverter = function() {/* should be good */
  function costConverterHelper(num) {
    var dollars = num / 1 * 1000000;
    return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  Aircraft.findAll().then(aircrafts => {
    // aircrafts will be an array of all Aircraft instances
    return aircrafts.map(aircraft => {
      this.cost = costConverterHelper(aircraft.cost);
    });
  });
};

module.exports = Aircraft;
