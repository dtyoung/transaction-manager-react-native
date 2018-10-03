import {
   UPDATE_TRANSACTION_DATA 
} from '../actions/types';

const INITIAL_STATE = {
    transactions: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TRANSACTION_DATA: 
            return { ...state, transactions: action.payload };
        default:
            return state;
    }
}