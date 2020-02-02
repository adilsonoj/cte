import React from 'react';
import { TouchableOpacity } from 'react-native'
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, } from 'react-navigation-stack';

import Sobre from '../pages/about';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from '../routes/TabNavigator';
import DrawerScreen from '../components/DrawerSceen';
import Login from '../pages/login';
import Perfil from '../pages/perfil';
import Registro from '../pages/Registro';
import Logout from '../routes/Logout';
import LoginOrHome from '../pages/LoginOrHome';
import FeedBack from '../pages/feedBack';

import theme from '../themes/white';

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
    navigationOptions: ()=>({
      header: null,
    })
  } ,
  Login:  { 
    screen: Login,
    navigationOptions: ()=>({
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
    navigationOptions: () => ({
      header: null,
    })  
  },
  FeedBack: {
    screen: FeedBack,
    navigationOptions: () => ({
      title: `FeedBack`, 
    }),
  },
},
{
  
  initialRouteName: "LoginOrHome",
  defaultNavigationOptions:()=>({
    headerStyle: {
      backgroundColor: theme.headerColor,
    },
    headerTintColor: theme.headerTextColor,
  })
});

export default createAppContainer(AppStackNavigator);