import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import theme from '../../themes/white';
require('moment/locale/pt-br');

import {openDialog} from 'rn-android-picker-dialog';

import styles from './styles';

const feedBack = ({userStore, navigation}) => {
  const [aquecimento, setAquecimento] = useState('');
  const [desenvolvimento, setDesenvolvimento] = useState('');
  const [fcMedia, setFcMedia] = useState('');
  const [pace, setPace] = useState('');
  const [tempo, setTempo] = useState('');
  const [data, setData] = useState(new Date());
  const [show, setShow] = useState(false);
  const [observacao, setObservacao] = useState('');
  const [vo2, setVo2] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (desenvolvimento && tempo) {
      const {minuto, segundo} = calculoPace(desenvolvimento, tempo);
      setPace({m: minuto, s: segundo});
      setDisabledButton(false);
    }
  }, [desenvolvimento, tempo]);

  const calculoPace = (dist, temp) => {
    try {
      if (Object.keys(dist).length === 0 || Object.keys(temp).length === 0)
        throw new Error('Objeto inválido!');

      const kilom = dist.km + (dist.m * 10) / 1000;
      const min = temp.h * 60 + temp.m;

      const minuto = Math.floor(min / kilom);
      const segundo = Math.round(((min / kilom) % 1) * 60);

      return {minuto, segundo};
    } catch (error) {
      console.log(error);
    }
  };

  const getList = (total, label) => {
    return Array.apply(null, Array(total)).map(function(_, i) {
      return i.toString() + ` ${label}`;
    });
  };
  const getBpmList = () => {
    return Array.apply(null, Array(150)).map(function(_, i) {
      return (100 + i).toString() + ` Bpm`;
    });
  };
  const bpms = getBpmList();
  const kms = getList(51, 'km');
  const mts = getList(100, 'm');
  const h = getList(60, 'h');
  const m = getList(60, 'm');
  const s = getList(60, 's');

  const dialogAquecimento = async () => {
    const inputs = [kms, mts];
    const selectedValues = aquecimento
      ? [aquecimento.km, aquecimento.m]
      : [0, 0];
    const options = {
      dialogTitle: 'Aquecimento',
    };
    const result = await openDialog(inputs, selectedValues, options);
    if (result) setAquecimento({km: result[0], m: result[1]});
  };

  const dialogDesenvolvimento = async () => {
    const inputs = [kms, mts];
    const selectedValues = desenvolvimento
      ? [desenvolvimento.km, desenvolvimento.m]
      : [0, 0];
    const options = {
      dialogTitle: 'Desenvolvimento',
    };
    const result = await openDialog(inputs, selectedValues, options);
    if (result) setDesenvolvimento({km: result[0], m: result[1]});
  };

  const dialogTempo = async () => {
    const inputs = [h, m, s];
    const selectedValues = tempo ? [tempo.h, tempo.m, tempo.s] : [0, 0, 0];
    const options = {
      dialogTitle: 'Tempo',
    };
    const result = await openDialog(inputs, selectedValues, options);
    if (result) setTempo({h: result[0], m: result[1], s: result[2]});
  };

  const dialogPace = async () => {
    const inputs = [m, s];
    const selectedValues = pace ? [pace.m, pace.s] : [0, 0];
    const options = {
      dialogTitle: 'Pace',
    };
    const result = await openDialog(inputs, selectedValues, options);
    if (result) setPace({m: result[0], s: result[1]});
  };

  const dialogFcMaxima = async () => {
    const inputs = [bpms];
    const index = bpms.findIndex(i => i.substring(0, 3) == fcMedia);
    const selectedValues = fcMedia ? [index] : [0];
    const options = {
      dialogTitle: 'Fc Média',
    };
    const result = await openDialog(inputs, selectedValues, options);
    if (result) {
      const resp = inputs[0][result[0]].substring(0, 3);
      setFcMedia(resp);
    }
  };

  const changeData = (event, date) => {
    date = date || data;
    setShow(false);
    setData(date);
  };

  const sendFeedBack = async () => {
    setLoading(true);
    const item = navigation.getParam('item');
    let user = await firestore()
      .doc(`users/${userStore.uid.trim()}`)
      .get();

    let userDocRef = await firestore().doc(`users/${userStore.uid.trim()}`);

    user.data().treinos.map(treino => {
      if (
        moment(treino.data._seconds * 1000).isSame(
          moment(item.data._seconds * 1000),
          'day',
        )
      ) {
        treino.feedBack = {
          data: new Date(),
          aquecimento,
          desenvolvimento,
          tempo,
          pace,
          fcMedia,
          observacao,
        };
      }
    });

    await userDocRef.update({
      treinos: user.data().treinos,
    });

    setLoading(false);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Data</Text>
          <TouchableWithoutFeedback onPress={() => setShow(true)}>
            <View style={styles.card}>
              <Text>
                {moment(data).format('D [de] MMMM [de] YYYY [as] HH:mm:ss')}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Aquecimento</Text>
          <TouchableWithoutFeedback onPress={() => dialogAquecimento()}>
            <View style={styles.card}>
              {aquecimento ? (
                <Text>{`${aquecimento.km},${aquecimento.m} km`}</Text>
              ) : (
                <Text>--km</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Desenvolvimento</Text>
          <TouchableWithoutFeedback onPress={() => dialogDesenvolvimento()}>
            <View style={styles.card}>
              {desenvolvimento ? (
                <Text>{`${desenvolvimento.km},${desenvolvimento.m} km`}</Text>
              ) : (
                <Text>--km</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Tempo</Text>
          <TouchableWithoutFeedback onPress={() => dialogTempo()}>
            <View style={styles.card}>
              {tempo ? (
                <Text>{`${tempo.h}h ${tempo.m}m ${tempo.s}s`}</Text>
              ) : (
                <Text>--h--m--s</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Rítimo Médio</Text>
          <TouchableWithoutFeedback onPress={() => dialogPace()}>
            <View style={styles.card}>
              {pace ? (
                <Text>{`${pace.m}',${pace.s}" /km`}</Text>
              ) : (
                <Text>0'0" /km</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Fc Média</Text>
          <TouchableWithoutFeedback onPress={() => dialogFcMaxima()}>
            <View style={styles.card}>
              {fcMedia ? (
                <Text>{`${fcMedia} Bpm`}</Text>
              ) : (
                <Text>--- /Bpm</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Observação</Text>
          <TextInput
            style={styles.inputObs}
            multiline={true}
            numberOfLines={3}
            onChangeText={obs => setObservacao(obs)}
          />
        </View>

        {show && (
          <DateTimePicker
            value={data}
            is24Hour={true}
            display="default"
            onChange={changeData}
          />
        )}
        <View style={{padding: 16}}>
          <Button
            icon="content-save"
            loading={loading}
            mode="contained"
            color={theme.button}
            onPress={sendFeedBack}
            disabled={disabledButton}>
            ENVIAR
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userStore: state.userLogged.user,
});
export default connect(mapStateToProps)(feedBack);
