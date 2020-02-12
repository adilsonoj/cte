import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import * as LoginAction from '../../actions/loginAction';
import {bindActionCreators} from 'redux';
import styles from './styles';
import Input from '../../components/input';
import ImagemPerfil from '../../components/imagemPerfil';
import theme from '../../themes/white';
import moment from 'moment';
require('moment/locale/pt-br');

const perfil = ({userStore, updateUserLogged, navigation}) => {
  const [user, setUser] = useState({});
  const [objetivo, setObjetivo] = useState({});
  const [objetivos, setObjetivos] = useState([]);
  const [data, setData] = useState(new Date());
  const [show, setShow] = useState(false);
  const [novo, setNovo] = useState(false);
  const uid = auth().currentUser && auth().currentUser.uid;
  const onLoad = async () => {
    console.log('@@', userStore);

    if (userStore.objetivos) {
      let d = userStore.objetivos.find((e, i) => i == 0);

      let dataF = moment(d.data._seconds * 1000).format(
        'D [de] MMMM [de] YYYY',
      );
      // setObjetivo({...d, data: dataF});
      setObjetivos(userStore.objetivos);
      delete userStore.objetivos;
      setUser({...userStore, ...d, data: dataF});
    } else {
      setUser(userStore);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const changeData = (event, date) => {
    date = date || data;
    setShow(false);
    setData(date);
    let dataF = moment(date).format('D [de] MMMM [de] YYYY');
    // setObjetivo({...objetivo, data: dataF});
    setUser({...user, data: dataF});
  };
  const onUpdate = async () => {
    // await auth().currentUser.updateProfile({
    //     photoURL: '',
    // });

    if (novo) {
      objetivos.unshift({
        distancia: user.distancia,
        observacao: user.observacao,
        data,
      });
    } else if (objetivos.length > 0) {
      let auxObj = objetivos.find((e, i) => i == 0);
      objetivos.shift();
      auxObj.distancia = user.distancia;
      auxObj.observacao = user.observacao;
      auxObj.data = data;
      objetivos.unshift(auxObj);
    } else {
      objetivos.push({
        distancia: user.distancia,
        observacao: user.observacao,
        data: user.data,
      });
    }

    // let obj = [
    //   {
    //     distancia: user.distancia,
    //     observacao: user.observacao,
    //     data,
    //   },
    // ];
    console.log(objetivos.length);
    console.log(novo);
    obj = objetivos;
    let dados = {
      idade: user.idade,
      peso: user.peso,
      objetivos: obj,
    };

    const userDoc = await firestore().doc(`users/${uid}`);
    try {
      await userDoc.set(dados, {merge: true});
      const userF = await firestore()
        .doc(`users/${uid}`)
        .get();
      console.log('snapshot', userF._data);
      updateUserLogged({...user, ...userF._data});
      console.log('salvo com sucesso');
      Alert.alert('', 'Perfil salvo');
    } catch (error) {
      console.log(error);
    }
  };

  const newObjetivo = async () => {
    setNovo(true);
    let userAux = user;
    userAux.distancia = '';
    userAux.observacao = '';
    userAux.data = '';
    setUser({...userAux});
    let {
      _data: {objetivos},
    } = await firestore()
      .doc(`users/${uid}`)
      .get();

    setObjetivos(objetivos);
    console.log(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imgPerfil}>
          <ImagemPerfil />
        </View>
        <Input
          placeholder="Nome"
          onChangeText={displayName => setUser({...user, displayName})}
          value={user.displayName}
        />
        <Input
          placeholder="Email"
          onChangeText={email => setUser({...user, email})}
          value={user.email}
          keyboardType="email-address"
        />
        <Input
          placeholder="Idade"
          onChangeText={idade => setUser({...user, idade})}
          value={user.idade}
          keyboardType="numeric"
        />
        <Input
          placeholder="Peso (kg)"
          onChangeText={peso => setUser({...user, peso})}
          value={user.peso}
          keyboardType="numeric"
        />
        <View style={styles.header}>
          <Text>OBJETIVO</Text>
          <TouchableOpacity onPress={newObjetivo}>
            <Text>Novo</Text>
          </TouchableOpacity>
        </View>

        <Input
          placeholder="Distância (km)"
          onChangeText={distancia => setUser({...user, distancia})}
          value={user.distancia}
          keyboardType="numeric"
        />
        <Input
          placeholder="Observação"
          onChangeText={observacao => setUser({...user, observacao})}
          value={user.observacao}
          multiline={true}
          numberOfLines={3}
        />
        <TouchableWithoutFeedback onPress={() => setShow(true)}>
          <View style={styles.card}>
            <Text style={[styles.text]}>{user.data}</Text>
          </View>
        </TouchableWithoutFeedback>

        {show && (
          <DateTimePicker
            value={data}
            is24Hour={true}
            display="default"
            onChange={changeData}
          />
        )}
        <View style={styles.button}>
          <Button title="Salvar" color={theme.button} onPress={onUpdate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userStore: state.userLogged.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(perfil);
