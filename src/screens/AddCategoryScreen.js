import React, { Component } from 'react'
import { View } from 'react-native'
import AddCategoryForm from '../components/forms/AddCategoryForm'

class AddCategoryScreen extends Component {

    static navigationOptions = {
        title: 'Add Category',
        headerRight: <View />
    }

    render() {
        return (
            <View>
                <AddCategoryForm />
            </View>
        );
    }
}

export { AddCategoryScreen };