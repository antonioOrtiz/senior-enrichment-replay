'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

var Country = require('./country');

var Aircraft = db.define(
'aircraft',
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
        isAfter: "1903-12-31",
      }
    },
    type: {
      type: Sequelize.STRING,
      validate: {
        isIn: ['Attack', 'Bomber', 'Versatile', 'Transport', 'Reconoissance' ,'Rescue'],
      },
    },
    cost: {
      type: Sequelize.DECIMAL(7, 2)
    },
    imageUrl: {
      defaultValue:
    },
    description: {
      type: Sequelize.TEXT,
    }
  },
{}
);

// must track the aircraft it succeeds via a reference called 'succeeded'

// must be assigned to a country
Aircraft.hook('beforeCreate', (aircraft) => {
  aircraft.Country.name;
});

// must have a method getAircraftByType, that gets aircrafts by inputted type
Aircraft.getAircraftByType = function(type){
  return Aircraft.findAll({ where: { type: type } });
}

// must have a method to change the cost of 1 to $1,000,000 when retrieving records


module.exports = Aircraft;
