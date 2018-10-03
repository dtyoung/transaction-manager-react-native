import React, { Component } from 'react';
import { View } from 'react-native';
import LoginForm from '../components/forms/LoginForm';

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',      
    }

    render() {
        return (
            <View>
                <LoginForm />
            </View>
        );
    }
}

export { LoginScreen };