import { clickReducer } from './clickReducer';
import { userLogged } from './loginReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
    userLogged
});