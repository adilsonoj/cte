import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import RootNavigation from './src/routes/RootNavigation';

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                
                    <RootNavigation />
               
            </Provider>
        );
    }
}

export default App;
