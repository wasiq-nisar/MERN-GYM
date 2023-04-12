const { default: mongoose } = require('mongoose');
const Workout = require('../models/WorkoutModel');

const getAllWorkouts = async(req,res) =>{
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        //sort({createdAt: -1}) will sort by createdAt in descending order
        res.status(200).json(workouts);    
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

const getSingleWorkout = async(req, res)=>{
    const {id:workoutId} = req.params;
    try{
        // if(!mongoose.Types.ObjectId.isValid(workoutId)){
        //     res.status(404).json({msg: `No Workout with ID: ${workoutId}`});
        // }
        const workouts = await Workout.findOne({_id:workoutId});
        if(!workouts)
            res.status(404).json({msg: `No Workout with ID: ${workoutId}`});
        res.status(200).json(workouts);
    }
    catch(error){
        res.status(400).json({msg: error});
    }

}

const addWorkout = async (req, res) => {
    const {title, load, reps} = req.body
  
    // add to the database
    try {
      const workout = await Workout.create({ title, load, reps })
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

const deleteWorkout = async(req,res) =>{
    const {id: workoutId} = req.params;
    try {
        const workout = await Workout.findOneAndDelete({_id: workoutId});
        if(!workout){
            res.status(404).json({msg: `No task with ID: ${workoutId}`});
        }
        res.status(200).json({workout: null, status: 'Success'});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

const updateWorkout = async(req,res) =>{
    const {id: workoutId} = req.params;
    try {
        const workout = await Workout.findOneAndUpdate({_id:workoutId}, req.body, {
            new: true,
            runValidators: true
        });

        if(!workout){
            res.status(404).json({msg: `No task with ID: ${workoutId}`});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout
};