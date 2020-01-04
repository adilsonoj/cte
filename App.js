import React from 'react';
import { TouchableOpacity } from 'react-native'
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
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

import theme from './src/themes/white';

const DrawerNavigator = createDrawerNavigator({
  CTE: TabNavigator,
  Sobre,
  Perfil,
  Logout
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
    
    //headerTitle:(<Image source={headerTitle} resizeMode='cover' style={{width:38, height:16, resizeMode: 'contain', alignSelf: 'center'}}/>),
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
  return navigation.state.routes[index].key
}

const LoginScreen = createSwitchNavigator({
  Login: Login
});

const DrawerStack = createStackNavigator({
  Drawer: DrawerNavigator,
});

const RegistroStack = createStackNavigator({
  Registro: {
    screen: Registro,
    navigationOptions: ({ navigation }) => ({
      title: `Registro`,
    }),
  },
  
 
})

//responsável pela integracao do DrawerNavigator e MaterialTopTabNavigator
const AppStackNavigator = createSwitchNavigator({
  Login:  LoginScreen,
  Registro: RegistroStack,
  Home: DrawerStack,
});

export default createAppContainer(AppStackNavigator);