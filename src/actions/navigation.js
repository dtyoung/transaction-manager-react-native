import { NavigationActions, StackActions } from 'react-navigation';
import firebase from 'firebase';

export const logout = (navigation) => {
  firebase.auth().signOut();
  navigation.navigate('Auth');
  
}