import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CardSection } from '../components/common';
import { Icon } from 'react-native-elements';
/*
 * Props:
 * iconName - The name of the icon that will be displayed
 * text - the text that will be displayed next to the icon
 */
const TransactionDetailRow = (props) => {
    const { containerStyle, iconStyle, textStyle } = styles;
    const { iconName, text } = props;
    return (
        <View style={containerStyle}>
            <Icon
                reverse
                reverseColor='black'
                color='#dddddd'
                name={iconName}
                containerStyle={iconStyle}
                size={60}
            />
            <Text style={textStyle}>
                {text}
            </Text>
        </View>
    );
}

export default TransactionDetailRow;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        flex: 1
    },
    textStyle: {
        flex: 3
    }
})