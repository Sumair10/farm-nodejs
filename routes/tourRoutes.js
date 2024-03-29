const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router()

// router.param("id" , tourController.checkId)

router.route('/')
.get(tourController.getAllTours)
.post(  tourController.createNewTour) 

router.route('/:id')
.get(tourController.getSingleTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router;
