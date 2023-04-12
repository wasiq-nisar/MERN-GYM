import {useState, useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';



const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(()=>{
        const fetchWorkout = async()=>{
            const response = await fetch('/api/workouts');
            const resp = await response.json(); //will parse the json data

            if(response.ok){
                setWorkouts(resp);
            }
        }

        fetchWorkout();
    }, [])

  return (
    <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout) =>(
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
    </div>
  )
}

export default Home