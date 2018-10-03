import {
    SET_DETAILED_TRANSACTION,
    RESET_TRANSACTION_DETAIL,
    TRANSACTION_DETAIL_VALUE_CHANGED,
    TRANSACTION_DETAIL_CATEGORY_CHANGED,
    TRANSACTION_DETAIL_DATE_CHANGED,
    TRANSACTION_DETAIL_NOTES_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    transactionId: null,
    value: 0,
    categoryId: null,
    date: '',
    notes: '',
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_DETAILED_TRANSACTION:
            return {
                ...state,
                transactionId: action.payload.transactionId,
                value: action.payload.value,
                categoryId: action.payload.categoryId,
                date: action.payload.date,
                notes: action.payload.notes
            }
        case RESET_TRANSACTION_DETAIL:
            return INITIAL_STATE;
        case TRANSACTION_DETAIL_CATEGORY_CHANGED:
            return { ...state, categoryId: action.payload };
        case TRANSACTION_DETAIL_VALUE_CHANGED: 
            return { ...state, value: action.payload };
        case TRANSACTION_DETAIL_DATE_CHANGED:
            return { ...state, date: action.payload };
        case TRANSACTION_DETAIL_NOTES_CHANGED:
            return { ...state, notes: action.payload };
        default:
            return state;
    }
}

