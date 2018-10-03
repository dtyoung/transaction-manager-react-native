import firebase from 'firebase';
import {
    TRANSACTION_VALUE_CHANGED,
    TRANSACTION_CATEGORY_CHANGED,
    TRANSACTION_DATE_CHANGED,
    TRANSACTION_NOTES_CHANGED,
    CLEAR_TRANSACTION_FORM_DATA,
    UPDATE_TRANSACTION_DATA,
    REDIRECT_AFTER_ADD_TRANSACTION,
    TRANSACTION_ID_CHANGED,
    PREFILL_TRANSACTION_INFO
} from './types';

export const prefillTransactionInfo = (transaction) => {
    return {
        type: PREFILL_TRANSACTION_INFO,
        payload: transaction
    }
}

export const transactionIdChanged = (transactionId) => {
    return {
        type: TRANSACTION_ID_CHANGED,
        payload: transactonId
    }
}

export const valueChanged = (value) => {
    return {
        type: TRANSACTION_VALUE_CHANGED,
        payload: value
    }
}

export const categoryChanged = (categoryId) => {
    return {
        type: TRANSACTION_CATEGORY_CHANGED,
        payload: categoryId
    }
}

export const dateChanged = (date) => {
    return {
        type: TRANSACTION_DATE_CHANGED,
        payload: date
    }
}

export const notesChanged = (notes) => {
    return {
        type: TRANSACTION_NOTES_CHANGED,
        payload: notes
    }
}

export const hasRedirected = () => {
    return {
        type: REDIRECT_AFTER_ADD_TRANSACTION
    }
}

export const addTransaction = (transaction) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/transactions`).push(transaction)
        dispatch({ type: CLEAR_TRANSACTION_FORM_DATA })
    }
}

export const updateTransaction = (transaction) => {
    return (dispatch) => {
        var update = {};
        const { currentUser } = firebase.auth();
        const transactionUpdate = {
            categoryId: transaction.categoryId,
            date: transaction.date,
            notes: transaction.notes,
            value: transaction.value
        }
        update[`/users/${currentUser.uid}/transactions/`+ transaction.transactionId] = transactionUpdate;

        firebase.database().ref().update(update);
        dispatch({ type: CLEAR_TRANSACTION_FORM_DATA })
    }
}

export const deleteTransaction = (transactionId) => {
    return (dispatch) => {
        var update = {};
        const { currentUser } = firebase.auth();
        update[`/users/${currentUser.uid}/transactions/`+ transactionId] = null;
        firebase.database().ref().update(update)
    }
}

export const loadTransactionsByDate = () => {

    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/transactions`).orderByChild('date').on('value', (snapshot => {
            const transactions = [];
            var prevDate = "";
            snapshot.forEach(childSnapshot => {
                var key = childSnapshot.key;
                
                var childData = childSnapshot.val();
                const transaction = childData;
                transaction.transactionId = key;

                if (childData.date !== prevDate) {
                prevDate = childData.date;
                transactions.unshift([]);
                }
                transactions[0].unshift(transaction);
            });
            dispatch({
                type: UPDATE_TRANSACTION_DATA,
                payload: transactions
            })

        }));
    }
}