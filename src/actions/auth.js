import firebase from 'firebase';
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
} from './types';



export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: ATTEMPTING_LOGIN });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user);
            })
            .catch(() => loginUserFail(dispatch));
    };
};

export const loginUserCompleted = () => {
    return {
        type: LOGIN_USER_COMPLETED
    }
}

export const createEmailChanged = (text) => {
    return {
        type: CREATE_ACCOUNT_EMAIL_CHANGED,
        payload: text
    }
}

export const createPasswordChanged = (text) => {
    return {
        type: CREATE_ACCOUNT_PASSWORD_CHANGED,
        payload: text
    }
}

export const createConfirmPasswordChanged = (text) => {
    return {
        type: CREATE_ACCOUNT_CONFIRM_PASSWORD_CHANGED,
        payload: text
    }
}

export const createAccount = (email, password, confirmPassword) => {
    return (dispatch) => {
        dispatch({ type: ATTEMPT_CREATE_ACCOUNT })

        console.log('1');
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(email === '' || password === '') {
            console.log('1');
            createAccountFail(dispatch, 'Please enter an email and password');
        } else if(reg.test(email) === false) {
            console.log('2');
            createAccountFail(dispatch, 'Invalid email address');
        } else if(password.length < 6) {
            console.log('3');
            createAccountFail(dispatch, 'Password is too short. Password should be longer than 5 characters');
        } else if(confirmPassword === '') {
            console.log('4');
            createAccountFail(dispatch, 'Please confirm your password')
        } else if(password !== confirmPassword) {
            console.log('5');
            createAccountFail(dispatch, 'Passwords do not match')
        } else {
            console.log('6');
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    dispatch({ type: CREATE_ACCOUNT_SUCCESS })
                })
                .catch((error) => {
                    createAccountFail(dispatch, 'This email address is already in use');
                })
        }

    }
} 

const createAccountFail = (dispatch, error) => {
    dispatch({
        type: CREATE_ACCOUNT_FAIL,
        payload: error
    })
}

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};