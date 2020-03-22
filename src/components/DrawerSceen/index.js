import React from 'react';

import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {DrawerActions, DrawerRouter} from 'react-navigation-drawer';
import {NavigationActions} from 'react-navigation';
import auth from '@react-native-firebase/auth';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

import {connect} from 'react-redux';
import * as LoginAction from '../../actions/loginAction';
import {bindActionCreators} from 'redux';

const DrawerScreen = props => {
  const {userLoggedOut, navigation} = props;
  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    navigation.dispatch(navigateAction);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const logout = route => async () => {
    const user = auth().currentUser;

    if (user) {
      await auth().signOut();
      // await AsyncStorage.clear();
      userLoggedOut();
    }

    navigation.dispatch(NavigationActions.navigate({routeName: route}));
  };

  return (
    <View>
      <ScrollView>
        <TouchableOpacity onPress={navigateToScreen('CTE')}>
          <View
            style={[
              styles.item,
              props.activeItemKey == 'CTE' ? styles.activeItem : null,
            ]}>
            <Icon
              name="home"
              size={20}
              style={[
                styles.icon,
                props.activeItemKey == 'CTE' ? styles.activeIcon : null,
              ]}
            />
            <Text
              style={[
                styles.text,
                props.activeItemKey == 'CTE' ? styles.activeText : null,
              ]}>
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToScreen('Perfil')}>
          <View
            style={[
              styles.item,
              props.activeItemKey == 'Perfil' ? styles.activeItem : null,
            ]}>
            <Icon
              name="account"
              size={20}
              style={[
                styles.icon,
                props.activeItemKey == 'Perfil' ? styles.activeIcon : null,
              ]}
            />
            <Text
              style={[
                styles.text,
                props.activeItemKey == 'Perfil' ? styles.activeText : null,
              ]}>
              Perfil
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToScreen('Settings')}>
          <View
            style={[
              styles.item,
              props.activeItemKey == 'Settings' ? styles.activeItem : null,
            ]}>
            <Icon
              name="tune"
              size={20}
              style={[
                styles.icon,
                props.activeItemKey == 'Settings' ? styles.activeIcon : null,
              ]}
            />
            <Text
              style={[
                styles.text,
                props.activeItemKey == 'Settings' ? styles.activeText : null,
              ]}>
              Configurações
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToScreen('Alunos')}>
          <View
            style={[
              styles.item,
              props.activeItemKey == 'Alunos' ? styles.activeItem : null,
            ]}>
            <Icon
              name="account-multiple"
              size={20}
              style={[
                styles.icon,
                props.activeItemKey == 'Alunos' ? styles.activeIcon : null,
              ]}
            />
            <Text
              style={[
                styles.text,
                props.activeItemKey == 'Alunos' ? styles.activeText : null,
              ]}>
              Alunos
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToScreen('Sobre')}>
          <View
            style={[
              styles.item,
              props.activeItemKey == 'Sobre' ? styles.activeItem : null,
            ]}>
            <Icon
              name="information-variant"
              size={20}
              style={[
                styles.icon,
                props.activeItemKey == 'Sobre' ? styles.activeIcon : null,
              ]}
            />
            <Text
              style={[
                styles.text,
                props.activeItemKey == 'Sobre' ? styles.activeText : null,
              ]}>
              Sobre
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout('Login')}>
          <View
            style={[
              styles.item,
              props.activeItemKey == 'Login' ? styles.activeItem : null,
            ]}>
            <Icon
              name="logout"
              size={20}
              style={[
                styles.icon,
                props.activeItemKey == 'Login' ? styles.activeIcon : null,
              ]}
            />
            <Text
              style={[
                styles.text,
                props.activeItemKey == 'Login' ? styles.activeText : null,
              ]}>
              Sair
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginAction, dispatch);

export default connect('', mapDispatchToProps)(DrawerScreen);
