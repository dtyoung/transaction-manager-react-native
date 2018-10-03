import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AddTransactionReducer from './AddTransactionReducer';
import TransactonReducer from './TransactionReducer';
import CategoryReducer from './CategoryReducer';
import TransactionDetailReducer from './TransactionDetailReducer';

export default combineReducers({
    auth: AuthReducer,
    addTransaction: AddTransactionReducer,
    transactionDetail: TransactionDetailReducer,
    transaction: TransactonReducer,
    category: CategoryReducer
});