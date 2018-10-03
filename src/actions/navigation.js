import firebase from 'firebase';
import { LOGOUT_USER } from './types';

export const logout = (navigation) => {
    firebase.auth().signOut();
    navigation.navigate('Auth');
    return {
        type: LOGOUT_USER
    }
}