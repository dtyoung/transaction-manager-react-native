import {
    CATEGORY_NAME_CHANGED,
    CATEGORY_ICON_CHANGED,
    CATEGORY_ADDED,
    REDIRECT_AFTER_ADD_CATEGORY,
    UPDATE_CATEGORY_DATA,
    LOGOUT_USER
} from '../actions/types';

import { CATEGORY_ICONS } from '../data/categoryIcons';

const INITIAL_STATE = {
    categories: [],
    categoryName: '',
    categoryIcon: '',
    categoryIcons: CATEGORY_ICONS,
    shouldRedirect: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CATEGORY_NAME_CHANGED: 
            return { ...state, categoryName: action.payload };
        case CATEGORY_ICON_CHANGED:
            return { ...state, categoryIcon: action.payload };
        case CATEGORY_ADDED:
            return { ...state, categoryName: INITIAL_STATE.categoryName, categoryIcon: INITIAL_STATE.categoryIcon, shouldRedirect: true }
        case REDIRECT_AFTER_ADD_CATEGORY:
            return { ...state, shouldRedirect: false};
        case UPDATE_CATEGORY_DATA:
            return { ...state, categories: action.payload };
        case LOGOUT_USER:
            return { ...state, categories: [] }    
        default:
            return state;
    }
}