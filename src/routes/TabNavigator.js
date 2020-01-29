import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Historico from '../pages/historico';
import Planilha from '../pages/planilha';
import FeedBack from '../pages/feedBack';

import theme from '../themes/white';

const TabScreen = createMaterialTopTabNavigator(
  {
    Historico: { screen: Historico, 
      navigationOptions:{
        title: 'Histórico'
      }
       
    },
    Planilha: { screen: Planilha },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,    
    animationEnabled: true,
    showIcon: true,
    
    tabBarOptions: {
      activeTintColor: theme.headerTextColorActive,
      inactiveTintColor: theme.headerTextColor,
      style: {
        backgroundColor: theme.headerColor,
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: theme.headerTextColorActive,
        borderBottomWidth: 2,
        
      },
    },
    
  }
);

const RootTabStack = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions:()=>({
      header: null
    })
  },
 
})

export default RootTabStack;