import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import TransactionDetailRow from './TransactionDetailRow'
import { valueChanged, categoryChanged, dateChanged, notesChanged } from '../actions/transactionDetail';

/*
 * Props:
 * value - the amount of the transaction
 * iconName - the name of the icon
 * categoryName - the name of the category
 * date - the date of the transaction
 * notes - the notes
 */
class TransactionDetailCard extends Component {

    render() {

        return (
            <Card>
                <CardSection>
                    <TransactionDetailRow
                        iconName='attach-money'
                        text={'$' + this.props.value}
                    />
                </CardSection>
                <CardSection>
                    <TransactionDetailRow 
                        iconName={this.getCategoryIconFromId(this.props.categoryId)}
                        text={this.getCategoryNameFromId(this.props.categoryId)}
                    />
                </CardSection>
                <CardSection>
                    <TransactionDetailRow 
                        iconName='event'
                        text={this.props.date}
                    />
                </CardSection>
                <CardSection>
                    <TransactionDetailRow 
                        iconName='note'
                        text={this.props.notes}
                    />
                </CardSection>
            </Card>
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
}

const mapStateToProps = (state) => {
    return {
        value: state.transactionDetail.value,
        categoryId: state.transactionDetail.categoryId,
        date: state.transactionDetail.date,
        notes: state.transactionDetail.notes,
        categories: state.category.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        valueChanged: (value) => dispatch(valueChanged(value)),
        categoryChanged: (categoryId) => dispatch(categoryChanged(categoryId)),
        dateChanged: (date) => dispatch(dateChanged(date)),
        notesChanged: (notes) => dispatch(notesChanged(notes))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailCard);