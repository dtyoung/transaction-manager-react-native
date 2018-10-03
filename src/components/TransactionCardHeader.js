import React, { Component } from 'react';
import { Text, View } from 'react-native'
var moment = require('moment');
/*
 * currentDateFormat? - String reprenting the format of the current date
 * date - string containing the date to format
 * dateFormat - a string representing how to format the date
 */
class TransactionCardHeader extends Component {

    constructor(props) {
        super(props);

        const { currentDateFormat, date, dateFormat } = this.props;

        const momentDate = currentDateFormat ? moment(date, currentDateFormat) : moment(date);
        const formattedDate = momentDate.format(dateFormat);

        this.state = {
            formattedDate
        }
    }

    render() {
        return (
            <View>
                <Text>
                    {this.state.formattedDate}
                </Text>
            </View>
        );
    }
}

export default TransactionCardHeader;