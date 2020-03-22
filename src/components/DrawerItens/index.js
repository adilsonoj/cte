import React from 'react';
import {ScrollView, Button} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {NavigationActions} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import * as LoginAction from '../../actions/loginAction';
import {bindActionCreators} from 'redux';
import {StyleSheet} from 'react-native';

const Logout = ({userLoggedOut, navigation}) => async () => {
  const user = auth().currentUser;
  console.log('logout');
  if (user) {
    await auth().signOut();
    console.log('logout');
    console.log(userLoggedOut);
    await userLoggedOut();
    navigation.navigate('Login');
  }
};
console.log('logout');

const DrawerItems = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerNavigatorItems {...props} />
      <Button title="Logout" onPress={Logout(props)} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginAction, dispatch);

export default connect('', mapDispatchToProps)(DrawerItems);
