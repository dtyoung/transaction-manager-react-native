import React, { Component } from 'react';
import { View } from 'react-native';
import CreateAccountForm from '../components/forms/CreateAccountForm'

class CreateAccountScreen extends Component {
    static navigationOptions = {
        title: 'Create Account',
        headerRight: <View />
    }

    render() {
        return (
            <View>
                <CreateAccountForm />
            </View>
        );
    }
}

export { CreateAccountScreen };