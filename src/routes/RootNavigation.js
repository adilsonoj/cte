import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createAppContainer, NavigationActions} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Sobre from '../pages/about';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from './TabNavigator';
import DrawerScreen from '../components/DrawerSceen';
import DrawerItems from '../components/DrawerItens';
import Login from '../pages/login';
import Perfil from '../pages/perfil';
import Registro from '../pages/Registro';
import Logout from './Logout';
import LoginOrHome from '../pages/LoginOrHome';
import FeedBack from '../pages/feedBack';
import Vo2 from '../pages/professor/vo2';
import Alunos from '../pages/alunos';
import theme from '../themes/white';

const DrawerNavigator = createDrawerNavigator(
  {
    CTE: {
      screen: TabNavigator,
      title: 'CTE',
      navigationOptions: {
        drawerIcon: () => <Icon name="home" size={20} />,
      },
    },
    Sobre,
    Perfil,
    Logout,
  },

  {
    initialRouteName: 'CTE',
    drawerBackgroundColor: '#FFFFFF',
    contentComponent: DrawerItems,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: theme.headerColor,
      },
      headerTintColor: theme.headerTextColor,
      title: getTitle(navigation),
      headerRight: (
        <TouchableOpacity
          style={{marginRight: 16}}
          onPress={() => {
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'CTE',
              }),
            );
          }}>
          <Icon name="home" size={20} color={theme.iconColor} />
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity
          style={{marginLeft: 16}}
          onPress={navigation.toggleDrawer}>
          <Icon name="bars" size={20} color={theme.iconColor} />
        </TouchableOpacity>
      ),
    }),
    contentOptions: {
      activeTintColor: theme.primary,
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  },
);

const getTitle = navigation => {
  let {index} = navigation.state;
  return navigation.state.routes[index].routeName;
};

const DrawerStack = createStackNavigator({
  Drawer: DrawerNavigator,
});

//responsável pela integracao do DrawerNavigator e MaterialTopTabNavigator
const AppStackNavigator = createStackNavigator(
  {
    Vo2: {
      screen: Vo2,
      navigationOptions: () => ({
        title: `Planilha VO2`,
      }),
    },
    Alunos: {
      screen: Alunos,
      navigationOptions: () => ({
        title: `Alunos`,
      }),
    },
    LoginOrHome: {
      screen: LoginOrHome,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Registro: {
      screen: Registro,
      navigationOptions: () => ({
        title: `Registro`,
      }),
    },
    Home: {
      screen: DrawerStack,
      navigationOptions: () => ({
        header: null,
      }),
    },
    FeedBack: {
      screen: FeedBack,
      navigationOptions: () => ({
        title: `FeedBack`,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: theme.headerColor,
      },
      headerTintColor: theme.headerTextColor,
    }),
  },
);

export default createAppContainer(AppStackNavigator);
