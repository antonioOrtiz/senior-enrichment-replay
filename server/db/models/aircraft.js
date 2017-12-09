'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

var Country = require('./country');

var Aircraft = db.define(
  'aircrafts',
  {
    make: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING,
      validate: {
        isDate: true,
        isAfter: '1903-12-31',
      },
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['Attack', 'Bomber', 'Versatile', 'Transport', 'Reconoissance', 'Rescue']],
      },
    },
    cost: {
      type: Sequelize.DECIMAL(7, 2),
    },

    imageUrl: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  },
  {}
);

/* TBD */
// must track the aircraft it succeeds via a reference called 'succeeded'
/* TBD */

// Aircraft.hook('beforeCreate', function(newAircraft) {
//   Aircraft.findAll()
//   .then(aircraftInstances => {
//     aircraftInstances.map((aircraft)=> {
//       if (newAircraft.model)
//     })
//   })
// });

Aircraft.hook('beforeCreate', function(aircraft) {
  var defaultImageBasedOnType = {
    Attack: 'https://en.wikipedia.org/wiki/Attack_aircraft#/media/File:Boeing_GA-1_on_ground.jpg',
    Bomber: 'https://en.wikipedia.org/wiki/Bomber#/media/File:14082007-Illya-Muromec-1.jpg',
    Versatile: 'https://www.historyandheadlines.com/wp-content/uploads/2014/08/6mostversatileaircrafthh.jpg',
    Transport:
      'http://www.gettyimages.com/detail/news-photo/lithograph-of-a-national-air-transport-plane-carrying-us-news-photo/551922767?esource=SEO_GIS_CDN_Redirect#lithograph-of-a-national-air-transport-plane-carrying-us-air-mail-picture-id551922767',
    Reconoissance: 'http://www.militaryhistoryonline.com/wwi/images/recon5.jpg',
    Rescue: 'https://i.pinimg.com/originals/26/e7/e3/26e7e3a1ad294eb6acfa4b65a6d56d42.jpg',
  };
  if (aircraft.imageUrl == null) {
    aircraft.imageUrl = defaultImageBasedOnType[aircraft.type];
  }
});

Aircraft.getAircraftByType = function(type) {
  return Aircraft.findAll({ where: { type: type } });
};

Aircraft.prototype.modelTracker = function() {
  Aircraft.findAll;
};

Aircraft.prototype.costConverter = function() {
  function costConverterHelper(num) {
    var dollars = num / 1 * 1000000;
    return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  Aircraft.findAll().then(aircrafts => {
    return aircrafts.map(aircraft => {
      this.cost = costConverterHelper(aircraft.cost);
    });
  });
};

module.exports = Aircraft;
