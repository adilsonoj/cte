import React, { useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import styles from './styles';
import Input from '../../components/input';
import ImagemPerfil from '../../components/imagemPerfil';
import ButtonConfirm from '../../components/ButtonConfirm';

const perfil = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [distancia, setDistancia] = useState('');
    const [data, setData] = useState('');
    const [telefone, setTelefone] = useState();

    const onLoad = async ()=>{
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user).providerData[0];
        console.log(user)
        setNome(user.displayName);
        setEmail(user.email);
        setTelefone(user.telefone);
    }

    useEffect(()=>{
        onLoad();
    },[]);

    const onUpdate = async () => {
        await firebase.auth().currentUser.updateProfile({
            photoURL: '',
        });
        const user = firebase.auth().currentUser
        console.log(user)
    }
    
    return (
        <SafeAreaView>
            <ScrollView >
                <View style={styles.container}>
                    <ImagemPerfil />
                    <Input placeholder="Nome" onChangeText={nome => setNome(nome)} value={nome}/>
                    <Input placeholder="Email" onChangeText={email => setEmail(email)} value={email} keyboardType="email-address"/>
                    {/* <Input placeholder="Telefone" onChangeText={telefone => setTelefone(telefone)} value={telefone} keyboardType="numeric"/> */}
                    <Input placeholder="Idade" onChangeText={idade => setIdade(idade)} value={idade}/>
                    <Input placeholder="Peso" onChangeText={peso => setPeso(peso)} value={peso} />
                    <View style={styles.header}>
                        <Text >OBJETIVO</Text>
                    </View>
                    
                    <Input placeholder="Distância" onChangeText={distancia => setDistancia(distancia)} value={distancia} />
                    <Input placeholder="Data" onChangeText={data => setData(data)} value={data} />
                    {/* <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false}/> */}
                    
                </View>
                <ButtonConfirm text="Salvar" onPress={onUpdate}/>
            </ScrollView>
        </SafeAreaView>
    )};

export default perfil;
