import { createStore } from 'redux';
import { Reducers } from '../reducers';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //whitelist: ['navigation']
};

const persistedReducer = persistReducer(persistConfig, Reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store)

export { store, persistor };