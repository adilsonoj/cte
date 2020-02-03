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
    const [ user, setUser ] = useState({});
    const [ objetivo, setObjetivo ] = useState({});
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
        console.log(user)
        if(!user) return

        user = JSON.parse(user);

        const { objetivos } = user;
        objetivos.push(objetivo)
        console.log(objetivos)
        setUser({...user})
       
    }

    useEffect(()=>{
        onLoad();
    },[]);

  

    const changeData = (event, date)=>{
        date = date || data;
        setShow(false);
        setObjetivo({ date });
    }
    const onUpdate = async () => {
        await auth().currentUser.updateProfile({
            photoURL: '',
        });
        //const user = auth().currentUser;
        const uid = auth().currentUser.uid;
// const uid = 'qsdfvfgfd'
        const userDoc = await firestore().doc(`users/${uid}`);
        
        
        
        await userDoc.set(user ,{merge: true});
 
  
        //console.log(user._data)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                    <View style={styles.imgPerfil}>
                        <ImagemPerfil />
                    </View>
                    <Input placeholder="Nome" onChangeText={displayName => setUser({ displayName })} value={user.displayName}/>
                    <Input placeholder="Email" onChangeText={email => setUser({email})} value={user.email} keyboardType="email-address"/>
                    <Input placeholder="Idade" onChangeText={idade => setUser({idade})} value={user.idade} keyboardType="numeric"/>
                    <Input placeholder="Peso (kg)" onChangeText={peso => setUser({peso})} value={user.peso}  keyboardType="numeric"/>
                    <View style={styles.header}>
                        <Text >OBJETIVO</Text>
                    </View>
                    
                    <Input placeholder="Distância (km)" onChangeText={distancia => setObjetivo({ distancia })} value={user.distancia}  keyboardType="numeric"/>
                    <Input placeholder="Observação" onChangeText={observacao => setObjetivo({ observacao })} value={user.observacao} multiline = {true} numberOfLines = {3}/>
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
