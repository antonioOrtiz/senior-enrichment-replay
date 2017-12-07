// Require all the models
// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/_db.js`)
// Exporting all models from here seems like a good idea!
const Aircraft = require('./aircraft');
const Country = require('./country');

// This is also probably a good place for you to set up your associations
Aircraft.belongsTo(Country, { as: 'country', onDelete: 'cascade' });
// Country.belongsTo(Aircraft, { as: 'aircraft' });

Country.hasMany(Aircraft, {
  onDelete: 'cascade',
});

module.exports = {
  Aircraft,
  Country,
};
