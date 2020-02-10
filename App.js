import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import RootNavigation from './src/routes/RootNavigation';
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootNavigation />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
