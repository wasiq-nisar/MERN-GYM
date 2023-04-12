const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    load:{
        type: Number,
        required: true
    }
    
}, {timestamps: true})  //{timestamps: true} will automatically add a Created At property when a new document is added

module.exports = mongoose.model('Workout', WorkoutSchema);