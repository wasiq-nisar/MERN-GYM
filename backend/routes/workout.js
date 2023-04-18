const express = require('express');
const router = express.Router();
const {getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout, addWorkout} = require('../controller/workout');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
router.route('/').get(getAllWorkouts).post(addWorkout)
router.route('/:id').get(getSingleWorkout).delete(deleteWorkout).patch(updateWorkout)

module.exports = router;