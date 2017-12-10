'use strict';
const router = require('express').Router();

const { Aircraft } = require('../db/models');
const { Country } = require('../db/models');

// prettier-ignore
router.param('id', function(req, res, next, id) {
  Country.findById(id)
    .then(function(country) {
      if (country) {
        req.country = country;
        next();
      } else {
        return res.sendStatus(404);
      }
    })
    .catch(next);
});

router
  .route('/')
  .get((req, res, next) => {
    return Country.findAll({ include: [Aircraft] })
      .then(countries => {
        return countries.filter(country => {
          return country.aircrafts.length > 0;
        });
      })
      .then(countries => res.json(countries))
      .catch(next);
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
      .then(country => {
        res.json(country);
      })
      .then(next);
  })
  .put((req, res, next) => {
    req.country
      .update(req.body)
      .then(country => res.json(country))
      .catch(next);
  })
  .delete((req, res, next) => {
    req.country.destroy().then(() => res.status(204).end());
  });

module.exports = router;
