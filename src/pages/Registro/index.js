import React, { useState } from 'react';

import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { validateEmail } from '../../common/validate'
import firebase from 'react-native-firebase';


import styles from './styles';
import Input from '../../components/input';
import ButtonConfirm from '../../components/ButtonConfirm';
import Loader from '../../components/Loader';


const Registro = (props) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const registrar = async () => {
        if (!(nome && email && senha && confirmeSenha)) return

        if(email && !validateEmail(email)) {
            Alert.alert('Erro','Email inválido');
            return
        }
       if(senha != confirmeSenha){
           Alert.alert('','Por favor confirme a senha digitada!');
           return
       }
       //verificar senha com 6 caracteres
      
       try {
            setLoading(true)
           await firebase.auth().createUserWithEmailAndPassword(email, senha);
          
           await firebase.auth().currentUser.updateProfile({
               displayName: nome,
           });

           props.navigation.dispatch(SwitchActions.jumpTo( {routeName: 'Home'} ))
       } catch (error) {
           Alert.alert('',String(error).split(":")[1].trim());
           console.log(error);
       } finally {
            setLoading(false)
       }
    }

    return(
    <SafeAreaView>
        <ScrollView >
            <View style={styles.container}>
                <Loader loading={loading}/>
                <Input placeholder="Nome" onChangeText={nome => setNome(nome)}/>
                <Input placeholder="Email" onChangeText={email => setEmail(email)} keyboardType="email-address"/>
                <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false} onChangeText={senha => setSenha(senha)}/>
                <Input placeholder="Confirme a Senha" secureTextEntry={true} autoCorrect={false} onChangeText={confirmeSenha => setConfirmeSenha(confirmeSenha)}/>
            </View>
            <ButtonConfirm text="Registrar" onPress={registrar}/>
        </ScrollView>
    </SafeAreaView>
)};

export default Registro;
