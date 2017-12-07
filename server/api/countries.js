'use strict';
const router = require('express').Router();

const { Aircraft } = require('../db/models');
const { Country } = require('../db/models');

// prettier-ignore
router
.route('/')
  .get((req, res, next) => {
    return Country.findAll({include: [Aircraft]})
     .then(countries => {
       return countries.filter((country) => {
        return country.aircrafts.length > 0
       })
     })
     .then(countries => res.json(countries))
     .catch(next)
    })
    .post((req, res, next) => {
      if (req.body) {
        Country.create(req.body)
          .then(country => {
            country.save();
            res.json(country);
          })
          .catch(next);
      }
    });

// prettier-ignore
router
.route('/top-five-countries')
  .get((req, res, next) => {
    return Country.getTopFive()
      .then((topFiveCountries) => {res.json(topFiveCountries)})
      .catch(next);
  });

router
  .route('/:id')
  .get((req, res, next) => {
    return Country.findAll({
      include: [
        {
          model: Aircraft,
          attributes: { exclude: ['description'] },
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
    req.country
      .update(req.body)
      .then(country => res.json(country))
      .catch(next);
  })
  .delete((req, res, next) => {
    /* deletes all aircrafts associated with the country */
    // return Country.findAll({
    //   include: [
    //     {
    //       model: Aircraft,
    //     },
    //   ],
    //   where: {
    //     id: +req.params.id,
    //   },
    // })
    //   .then(country => {
    //     return country.destroy();
    //   })
    //   .then(country => {
    //     res.json(country);
    //   });
    return Country.destroy({
      include: [
        {
          model: Aircraft,
        },
      ],
      where: { id: req.params.id },
    }).then(country => {
      res.json(country);
    });
  });

module.exports = router;
