import React from 'react';
import {ScrollView, Button, View, Text, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import * as LoginAction from '../../actions/loginAction';
import {bindActionCreators} from 'redux';
import {StyleSheet} from 'react-native';

const Logout = ({userLoggedOut, navigation}) => async () => {
  const user = auth().currentUser;
  if (user) {
    await auth().signOut();
    await userLoggedOut();
    navigation.navigate('Login');
  }
};

const Sair = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          height: 40,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="logout" size={18} />
        <Text
          style={{
            paddingLeft: 40,
            fontWeight: 'bold',
          }}>
          Logout
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const DrawerItems = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerNavigatorItems {...props} />
      {/* <Button title="Logout" onPress={Logout(props)} /> */}
      <Sair onPress={Logout(props)} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(LoginAction, dispatch);

export default connect('', mapDispatchToProps)(DrawerItems);
