import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import TransactionDetailCard from '../components/TransactionDetailCard'
import { Icon } from 'react-native-elements';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { deleteTransaction, prefillTransactionInfo } from '../actions/addTransaction';
import { resetTransactionDetail } from '../actions/transactionDetail';

class _TransactionDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Transaction Detail',
            headerRight: (
                <Menu>
                    <MenuTrigger>
                        <Icon name='mode-edit' />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption 
                            text='Edit'
                            onSelect={() => {
                                navigation.getParam('updateTransaction')();
                            }}
                        />
                        <MenuOption 
                            text='Delete'
                            onSelect={() => {
                                navigation.getParam('deleteTransaction')();
                                navigation.getParam('resetTransactionDetail')();
                                navigation.navigate('TransactionOverview');
                                
                            }}
                        />
                    </MenuOptions>
                </Menu>
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            deleteTransaction: this.deleteTransaction,
            transaction: this.props.transactionId,
            resetTransactionDetail: this.props.resetTransactionDetail,
            updateTransaction: this.updateTransaction
        });
    }

    deleteTransaction = () => {
        this.props.deleteTransaction(this.props.transaction);
    }

    updateTransaction = () => {
        // Prefills the add transaction form
        const transaction = this.getTransactionFromId(this.props.transaction);
        const transactionUpdate = {
            value: transaction[0].value,
            date: transaction[0].date,
            notes: transaction[0].notes,
            categoryId: transaction[0].categoryId,
            transactionId: this.props.transaction
        }
        this.props.updateTransaction(transactionUpdate);

        // Navigates to form
        this.props.navigation.navigate('UpdateTransaction');
    }

    resetTransactionDetail = () => {
        this.props.resetTransactionDetail();
    }

    getTransactionFromId(transactionId) {
        return this.props.transactions.find((element) => {
            return element.transactionId = transactionId;
        });
    }

    render() {
        return (
            <View>
                <TransactionDetailCard />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transaction: state.transactionDetail.transactionId,
        transactions: state.transaction.transactions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTransaction: (transactionId) => dispatch(deleteTransaction(transactionId)),
        resetTransactionDetail: () => dispatch(resetTransactionDetail()),
        updateTransaction: (transaction) => dispatch(prefillTransactionInfo(transaction))
    }
}

const TransactionDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_TransactionDetailScreen);

export { TransactionDetailScreen };