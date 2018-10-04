import firebase from 'firebase';
import { LOGOUT_USER } from './types';

export const logout = (navigation) => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USER });
        firebase.auth().signOut();
        
        navigation.navigate('Auth');
    }
}