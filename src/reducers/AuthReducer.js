import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    ATTEMPTING_LOGIN,
    LOGIN_USER_COMPLETED
} from '../actions/types'

const INITIAL_STATE = { 
    email: 'test@test.com',
    password: 'password',
    user: null,
    error: '',
    loading: false,
    success: false
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case ATTEMPTING_LOGIN:
            return { ...state, loading: true, error: '', };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload, loading: false, success: true };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed', password: '', loading: false };
        case LOGIN_USER_COMPLETED:
            return INITIAL_STATE;
        default: 
            return state;
    }
}