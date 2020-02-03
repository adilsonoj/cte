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
    const uid = auth().currentUser.uid;
    const onLoad = async ()=>{
        let userStorage = await AsyncStorage.getItem('user');

        //const userDoc = await firestore().doc(`users/${uid}`).get()
        console.log('@@',userStorage)
      // userDoc._data ? setUser( { ...userStorage, ...userDoc._data }) : 
        
       setUser( {...userStorage} )
       console.log(user)
    }

    useEffect(()=>{
        onLoad();
    },[]);

  

    const changeData = (event, date)=>{
        date = date || data;
        setShow(false);
        setObjetivo({ ...objetivo,   date });
        setUser({...user, objetivo})
    }
    const onUpdate = async () => {
        // await auth().currentUser.updateProfile({
        //     photoURL: '',
        // });
        setUser({ ...user, objetivo })
        
        const userDoc = await firestore().doc(`users/${uid}`);
        if(!user)


        console.log(user)
        await userDoc.set(user ,{merge: true});
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                    <View style={styles.imgPerfil}>
                        <ImagemPerfil />
                    </View>
                    <Input placeholder="Nome" onChangeText={displayName => setUser({ ...user, displayName })} value={user.displayName}/>
                    <Input placeholder="Email" onChangeText={email => setUser({ ...user, email })} value={user.email} keyboardType="email-address"/>
                    <Input placeholder="Idade" onChangeText={idade => setUser({ ...user, idade })} value={user.idade} keyboardType="numeric"/>
                    <Input placeholder="Peso (kg)" onChangeText={peso => setUser({...user, peso})} value={user.peso}  keyboardType="numeric"/>
                    <View style={styles.header}>
                        <Text >OBJETIVO</Text>
                    </View>
                    
                    <Input placeholder="Distância (km)" onChangeText={distancia => setObjetivo({ ...objetivo, distancia })} value={user.distancia}  keyboardType="numeric"/>
                    <Input placeholder="Observação" onChangeText={observacao => setObjetivo({ ...objetivo,  observacao })} value={user.observacao} multiline = {true} numberOfLines = {3}/>
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
