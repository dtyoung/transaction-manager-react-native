import React, { Component } from 'react';
import {  StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { dateChanged } from '../../actions/addTransaction'

class TransactionDateInput2 extends Component {
    constructor(props) {
        super(props)
        this.state = {date: '2018-10-08'}
    }

    render() {
        const { containerStyle, iconStyle, inputStyle } = styles;
        const { dateChanged } = this.props;
        return (
            <View style={containerStyle}>
                <Icon
                    reverse
                    reverseColor='black'
                    color='#dddddd'
                    name='event'
                    containerStyle={iconStyle}
                    size={30}
                />
                <DatePicker 
                    style={{flex: 2, width: 200}}
                    date={this.props.date}
                    mode="date"
                    showIcon={false}
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={dateChanged}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        date: state.addTransaction.date
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dateChanged: (date) => dispatch(dateChanged(date))
    }
}

const TransactionDateInput = connect(mapStateToProps, mapDispatchToProps)(TransactionDateInput2)

export { TransactionDateInput }

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