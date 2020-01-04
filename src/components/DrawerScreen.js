import React, { Component } from 'react';

import { ScrollView, Text, View, StyleSheet } from 'react-native';

import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions,  SwitchActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../themes/white';

export default class DrawerScreen extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        }); 
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    logout = (route) => async () => {
      const user = firebase.auth().currentUser;

      if (user) {
        await firebase.auth().signOut();
      }
      this.props.navigation.dispatch(SwitchActions.jumpTo( {routeName: route} ));
    }

  render() {
   
    return (
      
    <View>
        <ScrollView>
          <View>
            <View  style={[styles.item, (this.props.activeItemKey=='Perfil' ? styles.activeItem : null)]} >
              <Icon name='user' size={20} style={[styles.icon, (this.props.activeItemKey=='Perfil' ? styles.activeIcon : null)]} />
              <Text style={[styles.text, (this.props.activeItemKey=='Perfil' ? styles.activeText : null)]} onPress={this.navigateToScreen('Perfil')}>
                Perfil
              </Text>
            </View>
            <View style={[styles.item, (this.props.activeItemKey=='CTE' ? styles.activeItem : null)]} >
              <Icon name='home' size={20} style={[styles.icon, (this.props.activeItemKey=='CTE' ? styles.activeIcon : null)]} />
              <Text style={[styles.text, (this.props.activeItemKey=='CTE' ? styles.activeText : null)]} onPress={this.navigateToScreen('CTE')}>
                Home
              </Text>
            </View>
            <View style={[styles.item, (this.props.activeItemKey=='Settings' ? styles.activeItem : null)]} >
              <Icon name='cog' size={20} style={[styles.icon, (this.props.activeItemKey=='Settings' ? styles.activeIcon : null)]} />
              <Text style={[styles.text, (this.props.activeItemKey=='Settings' ? styles.activeText : null)]} onPress={this.navigateToScreen('Settings')}>
                Configurações
              </Text>
            </View>
            <View  style={[styles.item, (this.props.activeItemKey=='Sobre' ? styles.activeItem : null)]} >
              <Icon name='address-card' size={20} style={[styles.icon, (this.props.activeItemKey=='Sobre' ? styles.activeIcon : null)]} />
              <Text style={[styles.text, (this.props.activeItemKey=='Sobre' ? styles.activeText : null)]} onPress={this.navigateToScreen('Sobre')}>
                Sobre
              </Text>
            </View>
            <View  style={[styles.item, (this.props.activeItemKey=='Lggin' ? styles.activeItem : null)]} >
              <Icon name='sign-out' size={20} style={[styles.icon, (this.props.activeItemKey=='Login' ? styles.activeIcon : null)]} />
              <Text style={[styles.text, (this.props.activeItemKey=='Login' ? styles.activeText : null)]} onPress={this.logout('Login')}>
              Sair
              </Text>
            </View>
            
          </View>
        </ScrollView>
      </View>);
  }
}
const styles = StyleSheet.create({
    
    item:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        padding: 10,
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: Theme.primary,
    },

    text: {
      paddingLeft: 10,
      color: '#424242'
    },
    icon:{
      color: '#424242'
    },
    activeItem:{
      backgroundColor: '#eee'
    },
    activeIcon:{
      color: Theme.secundary
    },
    activeText:{
      color: Theme.secundary
    }
});

