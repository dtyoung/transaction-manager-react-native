import React, { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { valueChanged } from '../../actions/addTransaction';

class TransactionValueInput2 extends Component {
    render() {
        const { containerStyle, iconStyle, inputStyle } = styles;
        const { valueChanged } = this.props;
        return (
            <View style={containerStyle}>
                <Icon
                    reverse
                    reverseColor='black'
                    color='#dddddd'
                    name='attach-money'
                    containerStyle={iconStyle}
                    size={30}
                />
                <TextInput 
                    placeholder='0.00'
                    keyboardType='numeric'
                    style={inputStyle}
                    onChangeText={valueChanged}
                    value={this.props.value.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.addTransaction.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        valueChanged: (value) => dispatch(valueChanged(value))
    }
}

const TransactionValueInput = connect(mapStateToProps, mapDispatchToProps)(TransactionValueInput2);

export { TransactionValueInput }

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        flex: 1
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 18,
        lineHeight: 30,
        flex: 2,
    },
});