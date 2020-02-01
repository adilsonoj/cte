import React, { useState } from 'react';

import { View, SafeAreaView, ScrollView, Alert, Button } from 'react-native';
import { validateEmail } from '../../common/validate'
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Input from '../../components/input';
import Loader from '../../components/Loader';
import Theme from '../../themes/white'


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
           await auth().createUserWithEmailAndPassword(email, senha);
          
           await auth().currentUser.updateProfile({
               displayName: nome,
           });

           props.navigation.navigate("Home")
       } catch (error) {
           Alert.alert('',String(error).split(":")[1].trim());
           console.log(error);
       } finally {
            setLoading(false)
       }
    }

    return(
    <SafeAreaView style={styles.container}>
        <ScrollView >
            <Loader loading={loading}/>
            <Input placeholder="Nome" onChangeText={nome => setNome(nome)}/>
            <Input placeholder="Email" onChangeText={email => setEmail(email)} keyboardType="email-address"/>
            <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false} onChangeText={senha => setSenha(senha)} />
            <Input placeholder="Confirme a Senha" secureTextEntry={true} autoCorrect={false} onChangeText={confirmeSenha => setConfirmeSenha(confirmeSenha)}/>
            <View style={styles.button}>
                <Button title="Entrar" color={Theme.button}  onPress={registrar}/>
            </View>
        </ScrollView>
    </SafeAreaView>
)};

export default Registro;
