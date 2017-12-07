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
      allowNull: false,
      validate: {
        isIn: [['Attack', 'Bomber', 'Versatile', 'Transport', 'Reconoissance', 'Rescue']],
      },
    },
    cost: { /* should be good */
      type: Sequelize.DECIMAL(7, 2),
    },

    imageUrl: { /* should be good */
      type: Sequelize.STRING,
    },
    description: {  /* should be good */
      type: Sequelize.TEXT,
    },
  },
  {}
);

// prettier-ignore
// must track the aircraft it succeeds via a reference called 'succeeded'
/* TBD */
Aircraft.hook('beforeCreate', function(aircraft){
    var defaultImageBasedOnType = {
      'Attack': 'https://en.wikipedia.org/wiki/Attack_aircraft#/media/File:Boeing_GA-1_on_ground.jpg',
      'Bomber': 'https://en.wikipedia.org/wiki/Bomber#/media/File:14082007-Illya-Muromec-1.jpg',
      'Versatile': 'https://www.historyandheadlines.com/wp-content/uploads/2014/08/6mostversatileaircrafthh.jpg',
      'Transport': 'http://www.gettyimages.com/detail/news-photo/lithograph-of-a-national-air-transport-plane-carrying-us-news-photo/551922767?esource=SEO_GIS_CDN_Redirect#lithograph-of-a-national-air-transport-plane-carrying-us-air-mail-picture-id551922767',
      'Reconoissance': 'http://www.militaryhistoryonline.com/wwi/images/recon5.jpg',
      'Rescue': 'https://i.pinimg.com/originals/26/e7/e3/26e7e3a1ad294eb6acfa4b65a6d56d42.jpg'
    }
    if (aircraft.imageUrl == null) {
      aircraft.imageUrl = defaultImageBasedOnType[aircraft.type];
    }
})

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
