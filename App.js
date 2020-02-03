import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import DrawerNavigator from './src/routes/DrawerNavigator';

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                
                    <DrawerNavigator />
               
            </Provider>
        );
    }
}

export default App;
