import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class About extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../assets/img/cte.png')} style={{width:200, height:90}}/>
        <Image source={require('../../../assets/img/cte_extenso.png')} style={{width:350, height:90}}/>
      </View>
    );
  }
}