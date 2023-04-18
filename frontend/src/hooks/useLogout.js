import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from './useWorkoutsContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: workoutsDispatch} = useWorkoutContext();

    const logout = () => {
        //Remove user from local storage
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null});
    }

    return {logout};
}