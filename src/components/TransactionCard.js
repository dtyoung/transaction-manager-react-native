import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View } from 'react-native';
import { Card, CardSection } from './common';
import TransactionCardHeader from './TransactionCardHeader';
import TransactionRow from './TransactionRow';
import { setDetailedTransaction } from '../actions/transactionDetail';

/*
 * Props:
 * dateBucket - an array containing all the elements for a certain date
 */
class TransactionCard extends Component {

    render() {
        const { transactions } = this.props;

        return (
            <Card>
                <CardSection>
                    <TransactionCardHeader date={transactions[0].date} dateFormat="MMMM Do YYYY"/>
                </CardSection>
                {this.renderTransactions()}
            </Card>
        );
    }

    renderTransactions() {
        const { transactions } = this.props;
        const transactionRows = transactions.map(transaction => (
            <TransactionRow 
                key={'transaction-' + transaction.transactionId}
                iconName={this.getCategoryIconFromId(transaction.categoryId)}
                categoryName={this.getCategoryNameFromId(transaction.categoryId)}
                value={transaction.value}
                onPress={() => this.viewTransactionDetail(transaction.transactionId)}
            />
        ))

        return (
            <CardSection>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {transactionRows}
                </View>
            </CardSection>
        );
    }

    getCategoryNameFromId(categoryId) {
        const category = this.props.categories.find((element) => {
            return element.key == categoryId;
        })

        if(category) {
            return category.name;
        } else {
            return 'Category'
        }
    }

    getCategoryIconFromId(categoryId) {
        const category = this.props.categories.find((element) => {
            return element.key == categoryId;
        })
        if(category) {
            return category.icon;
        } else {
            return 'attach-money'
        }
    }

    viewTransactionDetail(transactionId) {
        // Set detailed transaction
        const transaction = this.getTransactionFromId(transactionId);
        this.props.setDetailedTransaction({
            transactionId: transactionId,
            value: transaction.value,
            date: transaction.date,
            notes: transaction.notes,
            categoryId: transaction.categoryId
        })
        this.props.navigation.navigate('TransactionDetail');
    }

    getTransactionFromId(transactionId) {
        return this.props.transactions.find((element) => {
            return element.transactionId = transactionId;
        });
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category.categories,
        transaction: state.transaction.transactions
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDetailedTransaction: (transaction) => {dispatch(setDetailedTransaction(transaction))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(TransactionCard));