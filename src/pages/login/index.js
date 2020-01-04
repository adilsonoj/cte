import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/input';
import styles from './styles'


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
console.log(props)
    const login = async() =>{
        //console.log(email, senha)
        try {
            const {user} = await firebase.auth().signInWithEmailAndPassword(email, senha);
           // console.log(user)
            await AsyncStorage.setItem('user', user.email);
            props.navigation.dispatch(NavigationActions.navigate({
                routeName: 'Home'
              }))
            
        } catch (error) {
           // console.log(error);
        }
       
    };

    const navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        }); 
        props.navigation.dispatch(navigateAction);
    };
    return(
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/img/cte.png')} style={styles.img}/>
            <Input placeholder="Email" keyboardType='email-address' value={email} onChangeText={email => setEmail(email)}/>
            <Input placeholder="Senha" secureTextEntry={true} value={senha} onChangeText={senha => setSenha(senha)}/>
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Logar</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={navigateToScreen('Registro')}>
                <Text style={styles.links}>Registre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{}}>
                <Text style={styles.links}>Escqueceu a senha?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
   
}

export default Login;