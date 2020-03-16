import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import firestore from '@react-native-firebase/firestore';
import CalendarStrip from 'react-native-calendar-strip';
import {Button} from 'react-native-paper';
import {openDialog} from 'rn-android-picker-dialog';
import CardAluno from '../../../components/CardAluno';
import InputPlanilha from '../../../components/InputPlanilha';
import theme from '../../../themes/white';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
const vo2 = ({navigation}) => {
  const desenvolvimentoInicial = {
    distancia: 0,
    un: 'km',
    ritimo: '',
  };

  const inicial = {
    distancia: 0,
    un: 'km',
    ritimo: 'lento',
  };
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [currentDateIndex, setCurrentDateIndex] = useState(null);
  const [aquecimento, setAquecimento] = useState(inicial);
  const [indexAquecimento, setIndexAquencimento] = useState([0, 0, 0]);
  const [desenvolvimento, setDesenvolvimento] = useState(
    desenvolvimentoInicial,
  );
  const [indexDesenvolvimento, setIndexDesenvolvimento] = useState([0, 0]);
  const [calma, setCalma] = useState(inicial);
  const [indexCalma, setIndexCalma] = useState([0, 0, 0]);
  const [vo2Treino, setVo2Treino] = useState(50);
  const [indexVo2, setIndexVo2] = useState([0]);
  const [intensidade, setIntensidade] = useState(50);
  const [indexIntensidade, setIndexIntensidade] = useState([0]);
  const [percurso, setPercurso] = useState('Distância');
  const [indexPercurso, setIndexPercurso] = useState([0]);
  const [aluno, setAluno] = useState(navigation.getParam('item'));
  let markedDates = [];
  let customDatesStyles = [];
  const [un, setUn] = useState(['km', 'm']);
  const ritimo = ['lento', 'moderado', 'rápido'];
  const porcento = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  const percursos = ['Distância', 'Tempo'];

  const getList = (total, label = '') => {
    return Array.apply(null, Array(total)).map(function(_, i) {
      return i.toString() + ` ${label}`;
    });
  };

  const distancia = getList(60);

  const changeUn = () => {
    if (percurso === 'Tempo') {
      setUn(['min', 'h']);
      setAquecimento({...inicial, un: 'min'});
      setCalma({...inicial, un: 'min'});
      setDesenvolvimento({
        ...desenvolvimentoInicial,
        ritimo: desenvolvimento.ritimo,
        un: 'min',
      });
      return;
    }

    setUn(['km', 'm']);
    setAquecimento(inicial);
    setCalma(inicial);
    setDesenvolvimento(desenvolvimentoInicial);
  };

  useEffect(() => {
    changeUn();
  }, [percurso]);

  useEffect(() => {
    calculaPace(porcento[0]);
  }, []);

  let _date = moment();
  customDatesStyles.push({
    startDate: _date, // Single date since no endDate provided
    //dateNameStyle: {color: 'blue'},
    // dateNumberStyle: {color: 'purple'},
    // Random color...
    // dateContainerStyle: { backgroundColor: `#${(`#00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)}` },
  });
  markedDates.push({
    date: _date,
    dots: [
      {
        key: 1,
        color: 'red',
        selectedDotColor: 'yellow',
      },
      {
        key: 2,
        color: 'blue',
        selectedDotColor: 'yellow',
      },
    ],
  });

  const dialogAquecimento = async () => {
    const inputs = [distancia, un, ritimo];
    const selectedValues = indexAquecimento;
    const options = {
      dialogTitle: 'Aquecimento',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setAquecimento({
          distancia: result[0],
          un: un[result[1]],
          ritimo: ritimo[result[2]],
        });
        setIndexAquencimento([result[0], result[1], result[2]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dialogDesenvolvimento = async () => {
    const inputs = [distancia, un];
    const selectedValues = indexDesenvolvimento;
    const options = {
      dialogTitle: 'Desenvolvimento',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setDesenvolvimento({
          ...desenvolvimento,
          distancia: result[0],
          un: un[result[1]],
        });
        setIndexDesenvolvimento([result[0], result[1]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dialogCalma = async () => {
    const inputs = [distancia, un, ritimo];
    const selectedValues = indexCalma;
    const options = {
      dialogTitle: 'Volta a calma',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setCalma({
          distancia: result[0],
          un: un[result[1]],
          ritimo: ritimo[result[2]],
        });
        setIndexCalma([result[0], result[1], result[2]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dialogVo2 = async () => {
    const inputs = [porcento];
    const selectedValues = indexVo2;
    const options = {
      dialogTitle: 'Vo2',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setVo2Treino(porcento[result[0]]);
        setIndexVo2([result[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dialogIntensidade = async () => {
    const inputs = [porcento];
    const selectedValues = indexIntensidade;
    const options = {
      dialogTitle: 'Intensidade',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setIntensidade(porcento[result[0]]);
        setIndexIntensidade([result[0]]);
        calculaPace(porcento[result[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculaPace = intensidad => {
    let vo2Max = aluno.vo2;
    intensidad = intensidad / 100;
    let vo2Basal = 3.5;
    let vo2Treino = intensidad * (vo2Max - vo2Basal) + vo2Basal;
    let velocTreino = (vo2Treino.toFixed(2) - vo2Basal) / 3.4;
    let pace = 60 / velocTreino.toFixed(2);
    let vo2PerCent = (vo2Treino.toFixed(2) * 100) / vo2Max;

    console.log('vo2Max', vo2Max);
    console.log('intensidad', intensidad);
    console.log('vo2Basal', vo2Basal);
    console.log('vo2Treino', vo2Treino);
    console.log('velocTreino', velocTreino);
    console.log('pace', pace);
    console.log('vo2PerCent', Math.round(vo2PerCent));

    setVo2Treino(Math.round(vo2PerCent));
    setDesenvolvimento({...desenvolvimento, ritimo: pace.toFixed(2)});
  };

  const dialogPercurso = async () => {
    const inputs = [percursos];
    const selectedValues = indexPercurso;
    const options = {
      dialogTitle: 'Percurso',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setPercurso(percursos[result[0]]);
        setIndexPercurso([result[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDateSelected = date => {
    setDataSelecionada(date);
    console.log(dataSelecionada);
  };

  const addTreino = async () => {
    let treino = {
      data: dataSelecionada,
      aquecimento,
      desenvolvimento,
      calma,
      intensidade,
      vo2Treino,
    };
    const userDoc = firestore().doc(`users/${aluno.uid.trim()}`);
    await userDoc.update({
      treinos: [treino],
    });
    console.log(treino);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CalendarStrip
          style={{height: 90, paddingTop: 16}}
          calendarHeaderContainerStyle={{paddingBottom: 0}}
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'background',
            duration: 300,
            highlightColor: '#fff',
          }}
          customDatesStyles={customDatesStyles}
          markedDates={markedDates}
          onDateSelected={onDateSelected}
        />
        <CardAluno avaliar trocar item={aluno} />

        <View style={styles.variacoes}>
          <TouchableOpacity onPress={dialogVo2}>
            <View style={styles.item}>
              <Text style={styles.titulo}>Vo2 Treino</Text>
              <Text>{`${vo2Treino}%`}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={dialogIntensidade}>
            <View style={[styles.item, styles.border]}>
              <Text style={styles.titulo}>Intensidade</Text>
              <Text>{`${intensidade}%`}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={dialogPercurso}>
            <View style={styles.item}>
              <Text style={styles.titulo}>Percurso</Text>
              <Text>{`${percurso}`}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <InputPlanilha
          titulo="Aquecimento"
          valor={aquecimento && `${aquecimento.distancia}${aquecimento.un}`}
          ritimo={aquecimento.ritimo}
          changeValue={dialogAquecimento}
        />

        <InputPlanilha
          titulo="Desenvolvimento"
          valor={`${desenvolvimento.distancia}${desenvolvimento.un}`}
          ritimo={`${desenvolvimento.ritimo} min/km`}
          changeValue={dialogDesenvolvimento}
        />

        <InputPlanilha
          titulo="Volta a calma"
          valor={`${calma.distancia}${calma.un}`}
          ritimo={calma.ritimo}
          changeValue={dialogCalma}
        />
        <View style={{paddingVertical: 16}}>
          <Button mode="contained" color={theme.button} onPress={addTreino}>
            Adicionar Treino
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default vo2;
