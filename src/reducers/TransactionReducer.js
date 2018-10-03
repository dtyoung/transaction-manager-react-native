import {
   UPDATE_TRANSACTION_DATA, LOGOUT_USER 
} from '../actions/types';

const INITIAL_STATE = {
    transactions: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TRANSACTION_DATA: 
            return { ...state, transactions: action.payload };
        case LOGOUT_USER:
            return { ...state, transactions: null }
        default:
            return state;
    }
}