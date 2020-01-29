import React, { Component } from 'react';

import { ScrollView, Text, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions,  SwitchActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../themes/white';
import styles from './styles';

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
        await AsyncStorage.clear();
      }
      this.props.navigation.dispatch(SwitchActions.jumpTo( {routeName: route} ));
    }

  render() {
   
    return (
      
    <View>
        <StatusBar backgroundColor={Theme.primaryDark} barStyle="light-content" />
        <ScrollView>
          <View style={[styles.item, (this.props.activeItemKey=='CTE' ? styles.activeItem : null)]} >
            <Icon name='home' size={20} style={[styles.icon, (this.props.activeItemKey=='CTE' ? styles.activeIcon : null)]} />
            <Text style={[styles.text, (this.props.activeItemKey=='CTE' ? styles.activeText : null)]} onPress={this.navigateToScreen('CTE')}>
              Home
            </Text>
          </View>

          <View  style={[styles.item, (this.props.activeItemKey=='Perfil' ? styles.activeItem : null)]} >
            <Icon name='user' size={20} style={[styles.icon, (this.props.activeItemKey=='Perfil' ? styles.activeIcon : null)]} />
            <Text style={[styles.text, (this.props.activeItemKey=='Perfil' ? styles.activeText : null)]} onPress={this.navigateToScreen('Perfil')}>
              Perfil
            </Text>
          </View>
          
          <View  style={[styles.item, (this.props.activeItemKey=='Sobre' ? styles.activeItem : null)]} >
            <Icon name='address-card' size={20} style={[styles.icon, (this.props.activeItemKey=='Sobre' ? styles.activeIcon : null)]} />
            <Text style={[styles.text, (this.props.activeItemKey=='Sobre' ? styles.activeText : null)]} onPress={this.navigateToScreen('Sobre')}>
              Sobre
            </Text>
          </View>

          <View style={[styles.item, (this.props.activeItemKey=='Settings' ? styles.activeItem : null)]} >
            <Icon name='cog' size={20} style={[styles.icon, (this.props.activeItemKey=='Settings' ? styles.activeIcon : null)]} />
            <Text style={[styles.text, (this.props.activeItemKey=='Settings' ? styles.activeText : null)]} onPress={this.navigateToScreen('Settings')}>
              Configurações
            </Text>
          </View>

          <View  style={[styles.item, (this.props.activeItemKey=='Lggin' ? styles.activeItem : null)]} >
            <Icon name='sign-out' size={20} style={[styles.icon, (this.props.activeItemKey=='Login' ? styles.activeIcon : null)]} />
            <Text style={[styles.text, (this.props.activeItemKey=='Login' ? styles.activeText : null)]} onPress={this.logout('Login')}>
            Sair
            </Text>
          </View>
        </ScrollView>
      </View>);
  }
}


