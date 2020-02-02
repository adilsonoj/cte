import React, { useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
    const [observacao, setObservacao] = useState('');
    const [initializing, setInitializing] = useState(true);

    const onLoad = async ()=>{
        let user = await AsyncStorage.getItem('user');

        if(!user) return

        user = JSON.parse(user).providerData[0];
        console.log(user)
        setNome(user.displayName);
        setEmail(user.email);
        setPeso(user.peso);
        setIdade(user.idade);
        setDistancia(user.distancia);
        setObservacao(user.observacao);
        setData(user.data || data);
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
        //const user = auth().currentUser;
        const uid = auth().currentUser.uid;
// const uid = 'qsdfvfgfd'
        const user = await firestore().doc(`users/${uid}`).get();
        
        
        
        // await user.set({
        //     idade,
        //     peso,
        //     objetivos: [distancia, observacao, data]
        //   },{merge: true});
 
  
        console.log(user._data)
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
                    <Input placeholder="Observação" onChangeText={observacao => setObservacao(observacao)} value={observacao} multiline = {true} numberOfLines = {3}/>
                    <TouchableWithoutFeedback onPress={()=>setShow(true)}>
                        <View style={styles.card}> 
                            <Text style={styles.text}>{moment(data).format('D [de] MMMM [de] YYYY')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false}/> */}
                    
                
                { show && <DateTimePicker value={data}
                      is24Hour={true}
                      display="default"
                      onChange={changeData} />
            }
                <View style={styles.button}>
                    <Button title="Salvar" color={theme.button} onPress={onUpdate}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )};

export default perfil;
