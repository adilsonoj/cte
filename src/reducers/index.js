import {userLogged} from './loginReducer';
import {alunoReducer} from './alunoReducer';
import {combineReducers} from 'redux';

export const Reducers = combineReducers({
  userLogged,
  alunoReducer,
});
