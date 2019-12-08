import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/input';
import styles from './styles'


const Login = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/img/cte.png')} style={styles.img}/>
            <Input placeholder="Nome"/>
            <Input placeholder="Email"/>
                    
        </SafeAreaView>
    )
   
}

export default Login;