import firebase from 'firebase'

import {
    CATEGORY_NAME_CHANGED,
    CATEGORY_ICON_CHANGED,
    CATEGORY_ADDED,
    REDIRECT_AFTER_ADD_CATEGORY,
    UPDATE_CATEGORY_DATA
} from './types';

export const categoryNameChanged = (name) => {
    return {
        type: CATEGORY_NAME_CHANGED,
        payload: name
    };
}

export const categoryIconChanged = (icon) => {
    return {
        type: CATEGORY_ICON_CHANGED,
        payload: icon
    };
}

export const hasRedirected = () => {
    return {
        type: REDIRECT_AFTER_ADD_CATEGORY
    };
}

export const addCategory = (name, icon) => {
    return (dispatch) => {
        const {currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/categories`).push({
            name, icon
        })
        dispatch({ type: CATEGORY_ADDED });
    }
}

export const loadCategories = () => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/categories`).on('value', snapshot => {
            const categories = [];
            snapshot.forEach(childSnapshot => {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                const category = {
                    key: key,
                    icon: childData.icon,
                    name: childData.name
                }
                categories.push(category);
            })

            dispatch({
                type: UPDATE_CATEGORY_DATA,
                payload: categories
            });
        });
    }
}
