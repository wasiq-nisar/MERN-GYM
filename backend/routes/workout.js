const express = require('express');
const router = express.Router();
const {getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout, addWorkout} = require('../controller/workout');

router.route('/').get(getAllWorkouts).post(addWorkout)
router.route('/:id').get(getSingleWorkout).delete(deleteWorkout).patch(updateWorkout)

module.exports = router;