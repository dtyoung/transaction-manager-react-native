import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
/*
 * Props:
 * iconName - name of the icon that represents the category
 * category - name of category
 * value - amount of the transaction
 */
class TransactionRow extends Component {

    render() {
        const { containerStyle, categoryNameStyle, valueStyle, iconStyle } = styles;
        const { iconName, categoryName, value, onPress } = this.props;
        return (
            <TouchableOpacity 
                style={containerStyle}
                onPress={onPress}>
                <Icon
                    reverse
                    reverseColor='black'
                    color='#dddddd'
                    name={iconName}
                    containerStyle={iconStyle}
                />
                <Text style={categoryNameStyle}>
                    {categoryName}
                </Text>
                <Text style={valueStyle}>
                    ${value}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default TransactionRow;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        flex: 1
    },
    categoryNameStyle: {
        flex: 4
    },
    valueStyle: {
        flex: 2
    }
});