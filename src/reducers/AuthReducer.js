import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    ATTEMPTING_LOGIN,
    LOGIN_USER_COMPLETED,
    CREATE_ACCOUNT_EMAIL_CHANGED,
    CREATE_ACCOUNT_PASSWORD_CHANGED,
    CREATE_ACCOUNT_CONFIRM_PASSWORD_CHANGED,
    ATTEMPT_CREATE_ACCOUNT,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAIL
} from '../actions/types'

const INITIAL_STATE = { 
    email: 'test@test.com',
    password: 'password',
    createEmail: '',
    createPassword: '',
    createConfirmPassword: '',
    createError: '',
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
        case CREATE_ACCOUNT_EMAIL_CHANGED:
            return { ...state, createEmail: action.payload }
        case CREATE_ACCOUNT_PASSWORD_CHANGED:
            return { ...state, createPassword: action.payload }
        case CREATE_ACCOUNT_CONFIRM_PASSWORD_CHANGED:
            return { ...state, createConfirmPassword: action.payload }
        case ATTEMPT_CREATE_ACCOUNT:
            return { ...state, loading: true, error: '' }
        case CREATE_ACCOUNT_SUCCESS:
            return { ...state, createEmail: '', createConfirmPassword: '', createPassword: '', loading: false, sucess: true }
        case CREATE_ACCOUNT_FAIL:
            return { ...state, error: action.payload.error, createConfirmPassword: '', createPassword: ''}
        default: 
            return state;
    }
}