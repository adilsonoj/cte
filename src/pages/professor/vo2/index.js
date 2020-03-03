import React, {useState, useEffect, useRef} from 'react';
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import CalendarStrip from 'react-native-calendar-strip';
import {Button} from 'react-native-paper';
import {openDialog} from 'rn-android-picker-dialog';
import CardAluno from '../../../components/CardAluno';
import InputPlanilha from '../../../components/InputPlanilha';
import theme from '../../../themes/white';

import styles from './styles';
const vo2 = () => {
  const desenvolvimentoInicial = {
    distancia: 0,
    un: 'km',
    ritimo: '--km/h',
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
  const [vo2, setVo2] = useState(50);
  const [indexVo2, setIndexVo2] = useState([0]);
  const [cargaPace, setCargaPace] = useState(50);
  const [indexCargaPace, setIndexCargaPace] = useState([0]);
  const [percurso, setPercurso] = useState('Distância');
  const [indexPercurso, setIndexPercurso] = useState([0]);
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
      setDesenvolvimento({...desenvolvimentoInicial, un: 'min'});
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
          distancia: result[0],
          un: un[result[1]],
          ritimo: '6,30',
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
        setVo2(porcento[result[0]]);
        setIndexVo2([result[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dialogCargaPace = async () => {
    const inputs = [porcento];
    const selectedValues = indexCargaPace;
    const options = {
      dialogTitle: 'Carga Pace',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setCargaPace(porcento[result[0]]);
        setIndexCargaPace([result[0]]);
      }
    } catch (error) {
      console.log(error);
    }
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

  const toggleMenu = () => {
    console.log('menu');
  };

  const onDateSelected = date => {
    setDataSelecionada(date);
  };
  return (
    <SafeAreaView style={styles.container}>
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
      <CardAluno onPress={toggleMenu} />

      <View style={styles.variacoes}>
        <TouchableOpacity onPress={dialogVo2}>
          <View style={styles.item}>
            <Text style={styles.titulo}>Vo2</Text>
            <Text>{`${vo2}%`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={dialogCargaPace}>
          <View style={[styles.item, styles.border]}>
            <Text style={styles.titulo}>Carga Pace</Text>
            <Text>{`${cargaPace}%`}</Text>
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
        ritimo={desenvolvimento.ritimo}
        changeValue={dialogDesenvolvimento}
      />

      <InputPlanilha
        titulo="Volta a calma"
        valor={`${calma.distancia}${calma.un}`}
        ritimo={calma.ritimo}
        changeValue={dialogCalma}
      />
      <View style={{paddingVertical: 16}}>
        <Button mode="contained" color={theme.button}>
          Adicionar Treino
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default vo2;
