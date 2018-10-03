import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { notesChanged } from '../../actions/addTransaction';

const TransactionNotesInput2 = (props) => {
    const { containerStyle, iconStyle, inputStyle } = styles;
    const { notesChanged, notes } = props;
    return (
        <View style={containerStyle}>
            <Icon
                reverse
                reverseColor='black'
                color='#dddddd'
                name='note'
                containerStyle={iconStyle}
                size={30}
            />
            <TextInput 
                placeholder='notes'
                style={inputStyle}
                onChangeText={notesChanged}
                value={notes}
            />
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        notes: state.addTransaction.notes
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        notesChanged: (notes) => dispatch(notesChanged(notes))
    };
}

const TransactionNotesInput = connect(mapStateToProps, mapDispatchToProps)(TransactionNotesInput2);

export { TransactionNotesInput };

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