// Import Types
var moment = require('moment');
import {
    TRANSACTION_VALUE_CHANGED,
    TRANSACTION_CATEGORY_CHANGED,
    TRANSACTION_DATE_CHANGED,
    TRANSACTION_NOTES_CHANGED,
    CLEAR_TRANSACTION_FORM_DATA,
    REDIRECT_AFTER_ADD_TRANSACTION,
    TRANSACTION_ID_CHANGED,
    PREFILL_TRANSACTION_INFO
} from '../actions/types'

const INITIAL_STATE = {
    transactionId: null,
    value: 0,
    categoryId: null,
    date: moment().format('YYYY-MM-DD'),
    notes: '',
    shouldRedirect: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TRANSACTION_VALUE_CHANGED:
            return { ...state, value: action.payload };
        case TRANSACTION_CATEGORY_CHANGED:
            return { ...state, categoryId: action.payload };
        case TRANSACTION_DATE_CHANGED:
            return { ...state, date: action.payload };
        case TRANSACTION_NOTES_CHANGED:
            return { ...state, notes: action.payload };
        case CLEAR_TRANSACTION_FORM_DATA:
            return { ...state, value: INITIAL_STATE.value, categoryId: INITIAL_STATE.categoryId, date: INITIAL_STATE.date, notes: INITIAL_STATE.notes, shouldRedirect: true };
        case REDIRECT_AFTER_ADD_TRANSACTION: 
            return { ...state, shouldRedirect: false };
        case TRANSACTION_ID_CHANGED: 
            return { ...state, transactionId: action.payload }
        case PREFILL_TRANSACTION_INFO:
            return { ...state, transactionId: action.payload.transactionId, value: action.payload.value, categoryId: action.payload.categoryId, date: action.payload.date, notes: action.payload.notes }
        default:
            return state;
    }
}