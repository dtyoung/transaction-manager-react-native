import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Button } from '../common';
import { TransactionValueInput, TransactionDateInput, TransactionNotesInput, TransactionCategoryInput } from '../inputs'
import { addTransaction, hasRedirected, updateTransaction } from '../../actions/addTransaction';
class AddTransactionForm extends Component {
    componentDidUpdate() {
        if(this.props.shouldRedirect) {
            this.props.hasRedirected();
            this.props.navigation.navigate('TransactionOverview');
        }
    }

    render() {
        const { shouldUpdate } = this.props; 

        return (
            <Card>
                <CardSection>
                    <TransactionValueInput />
                </CardSection>
                <CardSection>
                    <TransactionCategoryInput/>
                </CardSection>
                <CardSection>
                    <TransactionDateInput />
                </CardSection>
                <CardSection>
                    <TransactionNotesInput />
                </CardSection>
                <CardSection>
                    <Button onPress={() => {shouldUpdate ? this.updateTransaction() : this.addTransaction()}}>
                        {shouldUpdate ? 'Update Transaction' : 'Add Transaction'}
                    </Button>
                </CardSection>
            </Card>
        );
    }

    addTransaction() {
        const { value, categoryId, date, notes } = this.props;
        const transaction = {
            value, categoryId, date, notes
        };

        this.props.addTransaction(transaction);
    }

    updateTransaction() {
        const { value, categoryId, date, notes, transactionId } = this.props;
        const transaction = {
            value, categoryId, date, notes, transactionId
        };

        this.props.updateTransaction(transaction);
    }

}

const mapStateToProps = (state) => {
    return {
        value: state.addTransaction.value,
        categoryId: state.addTransaction.categoryId,
        date: state.addTransaction.date,
        notes: state.addTransaction.notes,
        shouldRedirect: state.addTransaction.shouldRedirect,
        transactionId: state.addTransaction.transactionId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTransaction: (transaction) => dispatch(addTransaction(transaction)),
        hasRedirected: () => dispatch(hasRedirected()),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AddTransactionForm));