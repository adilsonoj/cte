import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity, Alert, StatusBar, Button, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { validateEmail } from '../../common/validate'
import Loader from '../../components/Loader';
import Input from '../../components/input';
import styles from './styles'
import Theme from '../../themes/white';
import { connect } from 'react-redux';
import * as LoginAction from '../../actions/loginAction';
import { bindActionCreators } from 'redux';

const Login = (props) => {
    const { updateUserLogged, navigation  } = props; 

    const [email, setEmail] = useState('adilsonoj@yahoo.com.br');
    const [senha, setSenha] = useState('123456');
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        console.log(props.user)
    },[])

    const login = async() =>{
        try {
            if(!email && !senha) return

            if(!validateEmail(email)) {
                Alert.alert('Erro','Email inválido')
                return
            }
            setLoading(true)
            let { user } = await auth().signInWithEmailAndPassword(email, senha);
            const { uid, displayName, photoURL, emailVerified } = user;
            const userDoc = await firestore().doc(`users/${uid}`).get();
            user = { uid, displayName, photoURL, email, emailVerified, ...userDoc._data }
            await AsyncStorage.setItem('user', JSON.stringify(user));

            updateUserLogged(user)
            navigation.navigate("Home")
            
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
            <View style={styles.viewImg}>
                <Image source={require('../../../assets/img/cte.png')} style={styles.img}/>
            </View>
            <Input placeholder="Email" keyboardType='email-address' value={email} onChangeText={email => setEmail(email)} autoFocus={true}/>
            <Input placeholder="Senha" secureTextEntry={true} value={senha} onChangeText={senha => setSenha(senha)}/>

            <View style={styles.button}>
                <Button title="Entrar" color={Theme.button} onPress={login}/>
            </View>
           <View style={styles.viewLinks}>
                <TouchableOpacity  onPress={navigateToScreen('Registro')}>
                    <Text style={styles.links}>Registre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{}}>
                    <Text style={styles.links}>Escqueceu a senha?</Text>
                </TouchableOpacity>
           </View>
        </SafeAreaView>
    )
   
}
const mapStateToProps = state => ({
  user: state.userLogged.user
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginAction, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Login);