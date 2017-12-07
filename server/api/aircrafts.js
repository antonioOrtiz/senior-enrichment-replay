'use strict';
const router = require('express').Router();
const { Aircraft } = require('../db/models');
const { Country } = require('../db/models');

// prettier-ignore
router
.route('/')
  .get((req, res, next) => {
    return Aircraft.findAll({
      attributes: { exclude: ['description'] },
      include: [
        {
          model: Country,
          as: 'country',
          attributes: { include: ['name'] },
        },
      ]
    })
      .then(aircrafts => res.json(aircrafts))
      .catch(next)
    })
    .post((req, res, next) => {
      Country.findOrCreate({
        where: {name: req.body.name}
      })
      .spread((country, wasCreatedBool)=>{
        return Aircraft.create({
          make: req.body.make,
          model: req.body.model,
          year: req.body.year,
          type: req.body.type,
          cost: req.body.cost,
          imageUrl: req.body.imageUrl,
          description: req.body.description
        }).then((createdAircraft)=>{
          return createdAircraft.setCountry(country)
        });
      })
      // .then((createdAircraft){ for future use with views!
      //   res.redirect(createdAircraft.route);
      // })
      .then(createdAircraft => res.json(createdAircraft))
      .catch(next);

    });

// prettier-ignore
router
  .route('/:id')
  .get((req, res, next) => {/* populated with only the name of the country that owns the aircraft*/
    return Aircraft.findAll({
      include: [
        {
          model: Country,
          as: 'country',
          attributes: { exclude: ['id', 'GFI','flagUrl'] },
        },
      ],
      where: {
        id: req.params.id,
      },
    })
    .then(country => res.json(country))
    .then(next);
  })
  .put((req, res, next) => {
    req.aircraft
      .update(req.body)
      .then(aircraft => {
        res.json(aircraft);
      })
      .catch(next);
  })
  .delete((req, res,next) => {
     Aircraft.destroy({
      where:{
        id: req.aircraft.id
      }
    })
    .then(() => {
        res.status(204).send('Content deleted.');
      })
    .then(next);
  });

module.exports = router;
