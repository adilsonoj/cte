import React, { useState } from 'react';

import { View, SafeAreaView, ScrollView } from 'react-native';

import styles from './styles';
import Input from '../../components/input';
import ButtonConfirm from '../../components/ButtonConfirm';



const handleChangeText = (text) => {
    console.log(text)
}



const Registro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');

    const registrar = () => {
        console.log(nome)
    }

    return(
    <SafeAreaView>
        <ScrollView >
            <View style={styles.container}>
                <Input placeholder="Nome" onChangeText={nome => setNome(nome)}/>
                <Input placeholder="Email" onChangeText={handleChangeText} keyboardType="email-address"/>
                <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false} onChangeText={handleChangeText}/>
                <Input placeholder="Confirme a Senha" secureTextEntry={true} autoCorrect={false} onChangeText={handleChangeText}/>
            </View>
            <ButtonConfirm text="Registrar" onPress={registrar}/>
        </ScrollView>
    </SafeAreaView>
)};

export default Registro;
