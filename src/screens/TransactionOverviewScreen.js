import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import TransactionCard from '../components/TransactionCard'
import { FloatingAction } from 'react-native-floating-action';
import { withNavigation } from 'react-navigation';
import { loadTransactionsByDate } from '../actions/addTransaction';
import { loadCategories } from '../actions/category';
import { loginUserCompleted } from '../actions/auth';
class TransactionOverviewScreen2 extends Component {
    
    static navigationOptions = ({navigation}) => ({
        title: 'Transactions',
        headerLeft: <Icon name='menu' onPress={() => navigation.toggleDrawer()} />,
        headerRight: <View />
    });

    componentDidMount() {
        this.props.loginUserCompleted();
        this.props.loadTransactionByDate();
        this.props.loadCategories();
    }

    // Renders a transaction card for each date there are transactions
    renderTransactionCards() {
        const { transactions } = this.props
        
        if(transactions === null) {
            return (
                <View style={styles.loadingContainerStyle}>
                    <Text style={styles.loadingText}>Your transactions are currently loading. Please hold tight!</Text>
                </View>
            )
        }
        if(transactions.length != 0) {
            const transactionCards = (
                <FlatList 
                    data={transactions}
                    renderItem={({item}) => (
                        <TransactionCard key={'transaction-card' + item[0].date} transactions={item}/>
                    )}
                    keyExtractor={(item, index) => item[0].date}
                />
            )
            return transactionCards;
        } else {
            return (
                <View style={styles.loadingContainerStyle}>
                    <Text style={styles.loadingText}>You don't have any transactions. Add some using the button below.</Text>
                </View>
            );
        }
    }
  
    render() {
        const actions = [{
            text: 'Add Transaction',
            icon: <Icon name='add' color="#ffffff"/>,
            name: 'Add Transaction'
        }]
        return (
            <View style={{flex: 1}}>                
                {this.renderTransactionCards()}
                <FloatingAction 
                    onPressItem={() => this.props.navigation.navigate('AddTransaction')}
                    overrideWithAction
                    actions={actions}
                    position='center'
                />
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        transactions: state.transaction.transactions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTransactionByDate: () => dispatch(loadTransactionsByDate()),
        loadCategories: () => dispatch(loadCategories()),
        loginUserCompleted: () => dispatch(loginUserCompleted())
    }
}

const TransactionOverviewScreen = connect(mapStateToProps, mapDispatchToProps)(withNavigation(TransactionOverviewScreen2));

export { TransactionOverviewScreen };

const styles = StyleSheet.create({
    loadingContainerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#666666',
        textAlign: 'center'
    }
})