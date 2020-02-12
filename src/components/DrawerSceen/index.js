import React from 'react';

import {ScrollView, Text, View, StatusBar} from 'react-native';
import {DrawerActions, DrawerRouter} from 'react-navigation-drawer';
import {NavigationActions, SwitchActions} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../themes/white';
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
      <StatusBar backgroundColor={Theme.primaryDark} barStyle="light-content" />
      <ScrollView>
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
            ]}
            onPress={navigateToScreen('CTE')}>
            Home
          </Text>
        </View>

        <View
          style={[
            styles.item,
            props.activeItemKey == 'Perfil' ? styles.activeItem : null,
          ]}>
          <Icon
            name="user"
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
            ]}
            onPress={navigateToScreen('Perfil')}>
            Perfil
          </Text>
        </View>

        <View
          style={[
            styles.item,
            props.activeItemKey == 'Sobre' ? styles.activeItem : null,
          ]}>
          <Icon
            name="address-card"
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
            ]}
            onPress={navigateToScreen('Sobre')}>
            Sobre
          </Text>
        </View>

        <View
          style={[
            styles.item,
            props.activeItemKey == 'Settings' ? styles.activeItem : null,
          ]}>
          <Icon
            name="cog"
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
            ]}
            onPress={navigateToScreen('Settings')}>
            Configurações
          </Text>
        </View>

        <View
          style={[
            styles.item,
            props.activeItemKey == 'Lggin' ? styles.activeItem : null,
          ]}>
          <Icon
            name="sign-out"
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
            ]}
            onPress={logout('Login')}>
            Sair
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginAction, dispatch);

export default connect('', mapDispatchToProps)(DrawerScreen);
