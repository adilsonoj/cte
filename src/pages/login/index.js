import React, { useState } from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { validateEmail } from '../../common/validate'
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/input';
import styles from './styles'
import Theme from '../../themes/white';



const Login = (props) => {
    const [email, setEmail] = useState('adilsonoj@yahoo.com.br');
    const [senha, setSenha] = useState('123456');
    const [loading, setLoading] = useState(false);
    const login = async() =>{
        try {
            if(!email && !senha) return

            
            if(!validateEmail(email)) {
                Alert.alert('Erro','Email inválido')
                return
            }
            setLoading(true)
            const { user } = await firebase.auth().signInWithEmailAndPassword(email, senha);
           // console.log(user)
            await AsyncStorage.setItem('user', JSON.stringify(user));

            props.navigation.dispatch(NavigationActions.navigate({
                routeName: 'Home'
              }))
            
        } catch (error) {
            console.log(error);
            Alert.alert('',String(error).split(":")[1].trim());
        }finally {
            setLoading(false)
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
            <StatusBar backgroundColor={Theme.primaryDark} barStyle="light-content" />
            <Loader loading={loading}/>
            <Image source={require('../../../assets/img/cte.png')} style={styles.img}/>
            <Input placeholder="Email" keyboardType='email-address' value={email} onChangeText={email => setEmail(email)} autoFocus={true}/>
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