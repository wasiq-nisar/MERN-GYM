import {useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from '../hooks/useWorkoutsContext';
import {useAuthContext} from '../hooks/useAuthContext';

const Home = () => {
    //const [workouts, setWorkouts] = useState(null);
    const {workouts, dispatch} = useWorkoutContext();
    const {user} = useAuthContext();

    useEffect(()=>{
        const fetchWorkout = async()=>{
            const response = await fetch('/api/workouts', {
                headers:{ 'Authorization': `Bearer ${user.token}`}
            });
            const resp = await response.json(); //will parse the json data

            if(response.ok){
                //setWorkouts(resp);
                dispatch({type: 'SET_WORKOUTS', payload: resp});
            }
        }
        if(user){
            fetchWorkout();
        }
    }, [dispatch, user])

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