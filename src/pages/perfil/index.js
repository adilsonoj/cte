import React, { useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Input from '../../components/input';
import ImagemPerfil from '../../components/imagemPerfil';
import theme from '../../themes/white'
import moment from 'moment';
require('moment/locale/pt-br');

const perfil = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [distancia, setDistancia] = useState('');
    const [data, setData] = useState(new Date());
    const [show, setShow] = useState(false);

    const onLoad = async ()=>{
        let user = await AsyncStorage.getItem('user');

        if(!user) return

        user = JSON.parse(user).providerData[0];
        console.log(user)
        setNome(user.displayName);
        setEmail(user.email);
        setTelefone(user.telefone);
        const uid = firebase.auth().currentUser.uid
        console.log(uid)
    }

    useEffect(()=>{
        onLoad();
    },[]);

    const changeData = (event, date)=>{
        date = date || data;
        setShow(false);
        setData(date);
      }
    const onUpdate = async () => {
        await auth().currentUser.updateProfile({
            photoURL: '',
        });
        const user = auth().currentUser
        console.log(user)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                    <View style={styles.imgPerfil}>
                        <ImagemPerfil />
                    </View>
                    <Input placeholder="Nome" onChangeText={nome => setNome(nome)} value={nome}/>
                    <Input placeholder="Email" onChangeText={email => setEmail(email)} value={email} keyboardType="email-address"/>
                    <Input placeholder="Idade" onChangeText={idade => setIdade(idade)} value={idade} keyboardType="numeric"/>
                    <Input placeholder="Peso (kg)" onChangeText={peso => setPeso(peso)} value={peso}  keyboardType="numeric"/>
                    <View style={styles.header}>
                        <Text >OBJETIVO</Text>
                    </View>
                    
                    <Input placeholder="Distância (km)" onChangeText={distancia => setDistancia(distancia)} value={distancia}  keyboardType="numeric"/>
                    <TouchableWithoutFeedback onPress={()=>setShow(true)}>
                        <View style={styles.card}> 
                            <Text style={styles.text}>{moment(data).format('D [de] MMMM [de] YYYY')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false}/> */}
                    
                
                <View style={styles.button}>
                    <Button title="Salvar" color={theme.button} onPress={onUpdate}/>
                </View>
                { show && <DateTimePicker value={data}
                      is24Hour={true}
                      display="default"
                      onChange={changeData} />
            }
            </ScrollView>
        </SafeAreaView>
    )};

export default perfil;
