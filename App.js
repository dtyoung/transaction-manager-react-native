import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';
import configureStore from './src/store/configureStore';
import { MenuProvider } from 'react-native-popup-menu';

import RootNav from './src/navigators'

import {
    FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN,
    FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID
} from 'react-native-dotenv';

// Supress firebase timer warning
// See https://github.com/facebook/react-native/issues/12981
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// ***************************************

const store = configureStore();

export default class App extends Component {

    componentDidMount() {
        
        const config = {
            apiKey: FIREBASE_APIKEY,
            authDomain: FIREBASE_AUTHDOMAIN,
            databaseURL: FIREBASE_DATABASEURL,
            projectId: FIREBASE_PROJECTID,
            storageBucket: FIREBASE_STORAGEBUCKET,
            messagingSenderId: FIREBASE_MESSAGINGSENDERID
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={store}>
                <MenuProvider>
                    <View style={styles.container}>
                        <RootNav />
                    </View>
                </MenuProvider>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
