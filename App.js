import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {store, persistor} from './src/store';
import RootNavigation from './src/routes/RootNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import Theme from './src/themes/white';
import {StatusBar} from 'react-native';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.primary,
    background: '#fff',
  },
};
class App extends Component {
  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Theme.primaryDark}
        />
        <StoreProvider store={store}>
          <PaperProvider theme={theme}>
            <PersistGate loading={null} persistor={persistor}>
              <RootNavigation />
            </PersistGate>
          </PaperProvider>
        </StoreProvider>
      </>
    );
  }
}

export default App;
