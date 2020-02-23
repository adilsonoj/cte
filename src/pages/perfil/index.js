import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import * as LoginAction from '../../actions/loginAction';
import {bindActionCreators} from 'redux';
import {TextInput, Avatar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import theme from '../../themes/white';
import moment from 'moment';
require('moment/locale/pt-br');

const perfil = ({userStore, updateUserLogged, updateUserPhotoURL}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [objetivos, setObjetivos] = useState([]);
  const [data, setData] = useState(new Date());
  const [show, setShow] = useState(false);
  const [novo, setNovo] = useState(false);
  const [avatar, setAvatar] = useState('');
  const uid = auth().currentUser && auth().currentUser.uid;

  const options = {
    title: 'Foto do perfil',
    takePhotoButtonTitle: 'Tirar foto',
    chooseFromLibraryButtonTitle: 'Escolher foto',
    cancelButtonTitle: 'CANCELA',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const onLoad = async () => {
    console.log('@@', userStore);

    if (userStore.objetivos) {
      let obj = userStore.objetivos.find((e, i) => i == 0);

      let dataF = moment(obj.data._seconds * 1000).format(
        'D [de] MMMM [de] YYYY',
      );
      setObjetivos(userStore.objetivos);
      delete userStore.objetivos;
      setUser({...userStore, ...obj, data: dataF});
    } else {
      setUser(userStore);
    }
    setAvatar({uri: userStore.photoURL});
  };

  useEffect(() => {
    onLoad();
  }, []);

  const changeData = (event, date) => {
    date = date || data;
    setShow(false);
    setData(date);
    let dataF = moment(date).format('D [de] MMMM [de] YYYY');
    setUser({...user, data: dataF});
  };

  const showImagePicker = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        updateAvatar(response.uri);
      }
    });
  };
  const updateAvatar = async uri => {
    const ref = storage().ref(`perfil/${uid}.jpg`);
    let url = '';
    try {
      await ref.putFile(uri, {
        cacheControl: 'no-store', // disable caching
        contentType: 'image/jpg',
      });
      url = await ref.getDownloadURL();
      const source = {uri: url};

      setAvatar(source);

      await auth().currentUser.updateProfile({
        photoURL: url,
      });
      console.log(url);
      updateUserPhotoURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async () => {
    setLoading(true);
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
        data,
      });
    }

    let dados = {
      idade: user.idade,
      peso: user.peso,
      objetivos,
    };

    const userDoc = await firestore().doc(`users/${uid}`);
    try {
      await userDoc.set(dados, {merge: true});
      const userF = await firestore()
        .doc(`users/${uid}`)
        .get();
      updateUserLogged({...user, ...userF._data});
      Alert.alert('', 'Perfil salvo');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgPerfil}>
          <TouchableOpacity onPress={showImagePicker}>
            <Image source={avatar} style={styles.avatar}></Image>
            <Text style={styles.textAvatar}>editar</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          label="Nome"
          mode="outlined"
          value={user.displayName}
          onChangeText={displayName => setUser({...user, displayName})}
        />
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={email => setUser({...user, email})}
          value={user.email}
          keyboardType="email-address"
        />
        <TextInput
          label="Idade"
          mode="outlined"
          onChangeText={idade => setUser({...user, idade})}
          value={user.idade}
          keyboardType="numeric"
        />
        <TextInput
          label="Peso (kg)"
          mode="outlined"
          onChangeText={peso => setUser({...user, peso})}
          value={user.peso}
          keyboardType="numeric"
        />
        <View style={styles.header}>
          <Text>OBJETIVO</Text>
          <TouchableOpacity onPress={newObjetivo}>
            <Icon name="plus-box" size={25} style={{color: theme.button}} />
          </TouchableOpacity>
        </View>

        <TextInput
          label="Distância (km)"
          mode="outlined"
          onChangeText={distancia => setUser({...user, distancia})}
          value={user.distancia}
          keyboardType="numeric"
        />
        <TouchableWithoutFeedback onPress={() => setShow(true)}>
          <View>
            <TextInput
              label="Data"
              mode="outlined"
              value={user.data}
              editable={false}
            />
          </View>
        </TouchableWithoutFeedback>
        <TextInput
          label="Observação"
          mode="outlined"
          onChangeText={observacao => setUser({...user, observacao})}
          value={user.observacao}
          multiline={true}
          numberOfLines={3}
        />

        {show && (
          <DateTimePicker
            value={data}
            is24Hour={true}
            display="default"
            onChange={changeData}
          />
        )}
        <View style={styles.button}>
          <Button
            icon="content-save"
            loading={loading}
            mode="contained"
            color={theme.button}
            onPress={onUpdate}>
            SALVAR
          </Button>
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
