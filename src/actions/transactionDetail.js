import {
    SET_DETAILED_TRANSACTION,
    RESET_TRANSACTION_DETAIL,
    TRANSACTION_DETAIL_VALUE_CHANGED,
    TRANSACTION_DETAIL_CATEGORY_CHANGED,
    TRANSACTION_DETAIL_DATE_CHANGED,
    TRANSACTION_DETAIL_NOTES_CHANGED
} from './types'

export const setDetailedTransaction = (transaction) => {
    return {
        type: SET_DETAILED_TRANSACTION,
        payload: {
            transactionId: transaction.transactionId,
            value: transaction.value,
            date: transaction.date,
            categoryId: transaction.categoryId,
            notes: transaction.notes
        }
    }
}

export const resetTransactionDetail = () => {
    return {
        type: RESET_TRANSACTION_DETAIL
    }
}

export const valueChanged = (value) => {
    return {
        type: TRANSACTION_DETAIL_VALUE_CHANGED,
        payload: value
    }
}

export const categoryChanged = (categoryId) => {
    return {
        type: TRANSACTION_DETAIL_CATEGORY_CHANGED,
        payload: categoryId
    }
}

export const dateChanged = (date) => {
    return {
        type: TRANSACTION_DETAIL_DATE_CHANGED,
        payload: date
    }
}

export const notesChanged = (notes) => {
    return {
        type: TRANSACTION_DETAIL_NOTES_CHANGED,
        payload: notes
    }
}