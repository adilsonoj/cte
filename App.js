import React from 'react';
import { TouchableOpacity } from 'react-native'
import { createAppContainer, createSwitchNavigator, NavigationActions, getActiveChildNavigationOptions } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, } from 'react-navigation-stack';

import Sobre from './src/pages/about';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from './src/routes/TabNavigator';
import DrawerScreen from './src/components/DrawerScreen';
import Login from './src/pages/login';
import Perfil from './src/pages/perfil';
import Registro from './src/pages/Registro';
import Logout from './src/routes/Logout';
import LoginOrHome from './src/pages/LoginOrHome';
import FeedBack from './src/pages/feedBack';

import AsyncStorage from '@react-native-community/async-storage';

import theme from './src/themes/white';

const DrawerNavigator = createDrawerNavigator({
  CTE: TabNavigator,
  Sobre,
  Perfil,
  Logout,
},

{
  initialRouteName:  'CTE',
  drawerBackgroundColor: '#FFFFFF',
  contentComponent: DrawerScreen,
  navigationOptions:({ navigation })=>({
    headerStyle: {
      backgroundColor: theme.headerColor,
    },
    headerTintColor: theme.headerTextColor,
    title: getTitle(navigation),
    headerRight: (
      <TouchableOpacity style={{marginRight: 16}} onPress={()=>{navigation.dispatch( NavigationActions.navigate({
        routeName: 'CTE'
      }))}}>
        <Icon name="home" size={20} color={theme.iconColor} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity style={{marginLeft: 16}} onPress={navigation.toggleDrawer}>
        <Icon name="bars" size={20} color={theme.iconColor}  />
      </TouchableOpacity>
    ),
  })
});

const getTitle = (navigation)=>{
  let { index } = navigation.state; 
  return navigation.state.routes[index].routeName
}

const DrawerStack = createStackNavigator({
  Drawer: DrawerNavigator,
});

//responsável pela integracao do DrawerNavigator e MaterialTopTabNavigator
const AppStackNavigator = createStackNavigator({
  LoginOrHome: { 
    screen: LoginOrHome,
    navigationOptions: ({ navigation })=>({
      header: null,
    })
  } ,
  Login:  { 
    screen: Login,
    navigationOptions: ({ navigation })=>({
      header: null,
    })
  } ,
  Registro: { 
    screen: Registro,
    navigationOptions: ()=>({
      title: `Registro`,
    })
  },
  Home: {
    screen: DrawerStack,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })  
  },
  FeedBack: {
    screen: FeedBack,
    navigationOptions: ({ navigation }) => ({
      title: `FeedBack`, 
    }),
  },
},
{
  
  initialRouteName: "LoginOrHome",
  defaultNavigationOptions:({ navigation })=>({
    headerStyle: {
      backgroundColor: theme.headerColor,
    },
    headerTintColor: theme.headerTextColor,
  })
});

export default createAppContainer(AppStackNavigator);