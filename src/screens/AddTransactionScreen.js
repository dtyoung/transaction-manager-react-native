import React, { Component } from 'react';
import { View } from 'react-native';
import AddTransactionForm from '../components/forms/AddTransactionForm';

class AddTransactionScreen extends Component  {
    static navigationOptions = {
        title: 'Add Transaction',
        headerRight: <View />
    }

    render() {
        return (
            <View>
                <AddTransactionForm />
            </View>
        );
    }
}


export { AddTransactionScreen };