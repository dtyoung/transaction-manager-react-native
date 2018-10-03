import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Card, CardSection } from '../components/common';
import TransactionRow from '../components/TransactionRow';
import TransactionCardHeader from '../components/TransactionCardHeader'
import Pie from '../components/PieChart';
var moment = require('moment');
var group = require('group-reduce');

class _AnalyticsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        drawerLabel: 'Analytics',
        title: 'Analytics',
        headerLeft: <Icon name='menu' onPress={() => navigation.toggleDrawer()} />,
        headerRight: <View />
    })

    constructor() {
        super();
        this.state = {
            totalsByCategoryGraph: [],
            totalsByCategory: [],
            startDate: '2018-10-01',
            endDate: '2018-10-10'
        }
    }

    componentDidMount() {
        this.setTransactionData(this.state.startDate, this.state.endDate)
        console.log('graph', this.state.totalsByCategoryGraph);
    }

    render() {
        console.log('transactions', this.state.totalsByCategoryGraph);
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>

                    <Card>
                        <CardSection>
                            <Text style={styles.labelStyle}>Start Date</Text>
                            <DatePicker
                                style={{ flex: 2, width: 200 }}
                                date={this.state.startDate}
                                mode="date"
                                showIcon={false}
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={this.setStartDate.bind(this)}
                            />
                        </CardSection>
                        <CardSection>
                            <Text style={styles.labelStyle}>End Date</Text>
                            <DatePicker
                                style={{ flex: 2, width: 200 }}
                                date={this.state.endDate}
                                mode="date"
                                showIcon={false}
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={this.setEndDate.bind(this)}
                            />
                        </CardSection>
                    </Card>

                    <Card>
                        <CardSection>
                            {this.renderPieChart()}
                        </CardSection>
                    </Card>

                    {this.state.totalsByCategory.length !== 0 ?
                        <Card>
                            <CardSection>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ flex: 5 }}>Category</Text>
                                    <Text style={{ flex: 2 }}>Total</Text>
                                </View>
                            </CardSection>
                            {this.renderTransactionsByCategoryList()}
                        </Card>
                        :
                        null
                    }
                </View>
            </ScrollView>
        );
    }

    renderTransactionsByCategoryList() {
        console.log('test1', this.state.totalsByCategory);
        const categoryRows = this.state.totalsByCategory.map(categoryBucket => (
            <CardSection key={'category-' + categoryBucket.category}>
                <TransactionRow
                    iconName={categoryBucket.icon}
                    categoryName={categoryBucket.category}
                    value={categoryBucket.total}
                    onPress={() => { }}
                />
            </CardSection>
        ))

        return (
            <View>
                {categoryRows}
            </View>
        );
    }

    renderPieChart() {
        if(this.state.totalsByCategoryGraph.length === 0) {
            return(
                <Text>There are no transactions within this date range</Text>
            );
        } else {
            return <Pie transactions={this.state.totalsByCategoryGraph} /> 
        }
        
    }

    setTransactionData(startDate, endDate) {
        const totalsByCategory = this.getTotalByCategory(startDate, endDate);
        this.setState({ totalsByCategory: totalsByCategory });
        // Show 'Other Categories in graph'
        console.log('1', totalsByCategory);
        if (totalsByCategory.length > 4) {

            const extraCategories = totalsByCategory.slice(4);
            const totalOfExtraCategories = Math.round(extraCategories.map(this.getTotal).reduce(this.sumTotal) * 100) / 100;
            const totalsByCategoryGraph = totalsByCategory.slice(0, 4)

            totalsByCategoryGraph.push({ category: 'Other', total: totalOfExtraCategories, icon: '' })
            this.setState({ totalsByCategoryGraph: totalsByCategoryGraph })
            console.log('2', totalsByCategoryGraph);
        } else {
            console.log('3')
            this.setState({ totalsByCategoryGraph: totalsByCategory });
        }
        console.log('4', this.state.totalsByCategoryGraph);
    }

    getTotalByCategory(startDate, endDate) {
        // Get all the transactions between the start and end dates
        const momentStartDate = moment(startDate, "YYYY-MM-DD");
        const momentEndDate = moment(endDate, "YYYY-MM-DD");
        console.log('transactions', this.props.transactions);
        const transactionsByCategory = this.props.transactions.filter(transactionBucket => {
            const momentCurrentDate = moment(transactionBucket[0].date, "YYYY-MM-DD");
            return momentCurrentDate.isSameOrAfter(momentStartDate) && momentCurrentDate.isSameOrBefore(momentEndDate);
        });

        console.log('transactionsByCategory', transactionsByCategory)

        // Create an array mapping from the category to total amount spent
        const flatTransactions = ([].concat.apply([], transactionsByCategory))
        console.log('flattransactions', flatTransactions);
        const totalsByCategory = group(flatTransactions).by('categoryId')
            .reduce((category, entries) => {
                return {
                    category: this.getNameFromCategoryId(category),
                    total: entries.map(this.getValue).reduce(this.sumTotal),
                    icon: this.getIconFromCategoryId(category)
                }
            })

        totalsByCategory.sort((a, b) => { return b.total - a.total });

        console.log('totalsByCategory', totalsByCategory)
        return totalsByCategory;
    }

    // Reduce and Map helpers
    getValue(entry) {
        return +entry.value;
    }

    getTotal(entry) {
        return +entry.total;
    }

    sumTotal(a, b) {
        return a + b;
    }

    getNameFromCategoryId(categoryId) {
        console.log(this.props.categories);
        const category = this.props.categories.find((element) => {
            return element['key'] === categoryId;
        })
        return category.name;
    }

    getIconFromCategoryId(categoryId) {
        const category = this.props.categories.find((element) => {
            return element['key'] === categoryId;
        });
        return category.icon;
    }

    setStartDate(startDate) {
        this.setState({ startDate: startDate })
        this.setTransactionData(startDate, this.state.endDate);
    }

    setEndDate(endDate) {
        this.setState({ endDate: endDate })
        this.setTransactionData(this.state.startDate, endDate);
    }

}

const mapStateToProps = (state) => {
    return {
        transactions: state.transaction.transactions,
        categories: state.category.categories
    }
}


const AnalyticsScreen = connect(mapStateToProps, {})(_AnalyticsScreen)

export { AnalyticsScreen };

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        alignSelf: 'center'
    },
});