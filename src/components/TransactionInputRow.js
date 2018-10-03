import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { View, TextInput, StyleSheet } from 'react-native';


/*
 * Available props to pass in:
 * iconName - name of the icon to render
 * placeholder - the placeholder text of the text input
 * keyboardType - What type of input is valid for the input
 * onChangeText - a function to perform when the text input changes
 * onIconpress - a function to perform when the icon is pressed
 */
const TransactionInputRow = (props) => {

    const { containerStyle, iconStyle, textInputStyle } = styles;
    const { iconName, placeholder, keyboardType, onIconPress, onChangeText } = props;
    return (
        <View style={containerStyle}>
            <Icon
                reverse
                reverseColor='black'
                color='#dddddd'
                name={iconName}
                containerStyle={iconStyle}
                onPress={onIconPress}
                size={30}
            />
            <TextInput 
                placeholder={placeholder}
                keyboardType={keyboardType}
                style={textInputStyle}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default TransactionInputRow;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        flex: 1
    },
    textInputStyle: {
        flex: 3
    }
});