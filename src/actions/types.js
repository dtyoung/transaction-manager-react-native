// Authentication Types
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const ATTEMPTING_LOGIN = 'attempting_login';
export const LOGIN_USER_COMPLETED = 'login_user_completed';
export const LOGOUT_USER = 'logout_user';
export const CREATE_ACCOUNT_EMAIL_CHANGED = 'create_account_email_changed';
export const CREATE_ACCOUNT_PASSWORD_CHANGED = 'create_account_password_changed';
export const CREATE_ACCOUNT_CONFIRM_PASSWORD_CHANGED = 'create_account_confirm_password_changed';
export const ATTEMPT_CREATE_ACCOUNT = 'attempt_create_account';
export const CREATE_ACCOUNT_SUCCESS = 'create_account_success';
export const CREATE_ACCOUNT_FAIL = 'create_account_fail';

// Add Transaction Types
export const TRANSACTION_VALUE_CHANGED = 'transaction_value_changed';
export const TRANSACTION_CATEGORY_CHANGED = 'transaction_category_changed';
export const TRANSACTION_DATE_CHANGED = 'transaction_date_changed';
export const TRANSACTION_NOTES_CHANGED = 'transaction_notes_changed';
export const CLEAR_TRANSACTION_FORM_DATA = 'clear_transaction_form_data';
export const REDIRECT_AFTER_ADD_TRANSACTION = 'redirect_after_add_transaction';

// Transaction Management Types
export const UPDATE_TRANSACTION_DATA = 'update_transaction_data';
export const SET_DETAILED_TRANSACTION = 'set_detailed_transaction';
export const RESET_TRANSACTION_DETAIL = 'reset_transaction_detail';
export const TRANSACTION_DETAIL_VALUE_CHANGED = 'transaction_detail_value_changed';
export const TRANSACTION_DETAIL_CATEGORY_CHANGED = 'transaction_detail_category_changed';
export const TRANSACTION_DETAIL_DATE_CHANGED = 'transaction_detail_date_changed';
export const TRANSACTION_DETAIL_NOTES_CHANGED = 'transaction_detail_notes_changed';
export const TRANSACTION_ID_CHANGED = 'transaction_id_changed';
export const PREFILL_TRANSACTION_INFO = 'prefill_transaction_info';

// Category Management Types
export const CATEGORY_NAME_CHANGED = 'category_name_changed';
export const CATEGORY_ICON_CHANGED = 'category_icon_changed';
export const CATEGORY_ADDED = 'category_added';
export const REDIRECT_AFTER_ADD_CATEGORY = 'redirect_after_add_category';
export const UPDATE_CATEGORY_DATA = 'update_category_data';