import React, { Component } from 'react';
import { View } from 'react-native';
import AddTransactionForm from '../components/forms/AddTransactionForm';

class UpdateTransactionScreen extends Component  {
    static navigationOptions = {
        title: 'Update Transaction',
        headerRight: <View />
    }

    render() {
        return (
            <View>
                <AddTransactionForm shouldUpdate={true}/>
            </View>
        );
    }
}

export { UpdateTransactionScreen };