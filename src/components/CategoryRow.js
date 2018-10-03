import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements'
import { CardSection } from '../components/common';
/*
 * Props:
 * iconName - Name of the icon to display
 * categoryName - text of the label
 * onPress - function called when the row has been pressed
 */
const CategoryRow = (props) => {
    const { containerStyle, textStyle, iconStyle } = styles;
    const { iconName, categoryName, onPress } = props;

    return (
        <CardSection>
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
                <Text style={textStyle}>
                    {categoryName}
                </Text>
            </TouchableOpacity>
        </CardSection>
    );
}

export default CategoryRow;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
        
    },
    textStyle: {
        flex: 3
    },
    iconStyle: {
        flex: 1
    }
});