import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import firestore from '@react-native-firebase/firestore';
import CalendarStrip from 'react-native-calendar-strip';
import {Button} from 'react-native-paper';
import {openDialog} from 'rn-android-picker-dialog';
import CardAluno from '../../../components/CardAluno';
import theme from '../../../themes/white';
import styles from './styles';

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
  let _date = moment().format();

  const [loading, setLoading] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [aquecimento, setAquecimento] = useState(inicial);
  const [indexAquecimento, setIndexAquencimento] = useState([0, 0, 0]);
  const [desenvolvimento, setDesenvolvimento] = useState(
    desenvolvimentoInicial,
  );
  const [indexDesenvolvimento, setIndexDesenvolvimento] = useState([0, 0]);
  const [calma, setCalma] = useState(inicial);
  const [indexCalma, setIndexCalma] = useState([0, 0, 0]);
  const [vo2Treino, setVo2Treino] = useState(50);
  const [intensidade, setIntensidade] = useState(50);
  const [indexIntensidade, setIndexIntensidade] = useState([0]);
  const [percurso, setPercurso] = useState('Distância');
  const [indexPercurso, setIndexPercurso] = useState([0]);
  const [aluno, setAluno] = useState(navigation.getParam('item'));
  const [markedDates, setMarkedDates] = useState([]);
  const [weekStart, setWeekStart] = useState(_date);
  const [userDoc, setUserDoc] = useState('');
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

  customDatesStyles.push({
    startDate: _date,
  });

  const getPontos = async () => {
    let userDocRef = await firestore().doc(`users/${aluno.uid.trim()}`);

    setUserDoc(userDocRef);

    userDocRef = await userDocRef.get();

    if (!userDocRef._data.treinos) return;

    const {treinos} = userDocRef._data;
    const markeds = [];
    treinos.forEach((treino, i) => {
      markeds.push({
        date: moment(treino.data._seconds * 1000),
        dots: [
          {
            key: i,
            color: 'red',
            selectedDotColor: 'yellow',
          },
        ],
      });
    });
    setMarkedDates(markeds);
    setLoading(false);
  };
  useEffect(() => {
    getPontos();
  }, []);

  useEffect(() => {
    changeUn();
  }, [percurso]);

  useEffect(() => {
    calculaPace(porcento[0]);
  }, []);

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
    const distanciaCalma = [1, 2, 3, 500];
    const inputs = [distanciaCalma, un, ritimo];
    const selectedValues = indexCalma;
    const options = {
      dialogTitle: 'Volta a calma',
    };
    try {
      const result = await openDialog(inputs, selectedValues, options);
      if (result) {
        setCalma({
          distancia: distanciaCalma[result[0]],
          un: un[result[1]],
          ritimo: ritimo[result[2]],
        });
        setIndexCalma([result[0], result[1], result[2]]);
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
    setDataSelecionada(moment(date)._d);
    console.log(dataSelecionada);
  };

  const addTreino = async () => {
    setLoading(true);
    try {
      let user = await userDoc.get();
      let sendTreinos;
      let treino = {
        data: dataSelecionada,
        aquecimento,
        desenvolvimento,
        calma,
        intensidade,
        vo2Treino,
        feedback: {},
      };
      let {treinos} = user._data;

      if (!treinos) {
        sendTreinos = [treino];
      } else {
        const ele = treinos.filter(el => {
          if (moment(dataSelecionada).isSame(moment(el.data._seconds * 1000))) {
            return true;
          }
        });
        if (ele.length > 0) {
          setLoading(false);
          ToastAndroid.show(
            'Já existe uma planilha para essa data!',
            ToastAndroid.LONG,
          );
          return;
        }
        if (moment(dataSelecionada).isBefore(moment(), 'day')) {
          setLoading(false);
          ToastAndroid.show(
            'A data deve ser maior que a data de hoje!',
            ToastAndroid.LONG,
          );
          return;
        }

        treinos.push(treino);
        sendTreinos = treinos;
      }

      await userDoc.update({
        treinos: sendTreinos,
      });

      ToastAndroid.show('Planilha adicionada', ToastAndroid.LONG);

      getPontos();
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Erro inesperado, tente novamente!', ToastAndroid.LONG);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CalendarStrip
          style={{height: 90, paddingTop: 16}}
          calendarHeaderContainerStyle={{paddingBottom: 0}}
          calendarAnimation={{type: 'parallel', duration: 15}}
          daySelectionAnimation={{
            type: 'background',
            duration: 300,
            highlightColor: '#fff',
          }}
          startingDate={weekStart}
          onWeekChanged={week => setWeekStart(week)}
          customDatesStyles={customDatesStyles}
          markedDates={markedDates}
          onDateSelected={onDateSelected}
          minDate={moment()}
        />
        <CardAluno avaliar trocar item={aluno} navigation={navigation} />

        <View style={styles.variacoes}>
          <TouchableOpacity onPress={dialogIntensidade}>
            <View style={styles.item}>
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
        <View style={styles.planilhaHeader}>
          <Text style={styles.planilhaHeaderText}>
            {moment(dataSelecionada).format('LL')}
          </Text>
        </View>
        <View style={styles.planilhaContainer}>
          <TouchableOpacity onPress={dialogAquecimento}>
            <View style={styles.planilhaBox}>
              <Text style={[styles.planilhaFont, styles.planilhaCardTitle]}>
                Aquecimento
              </Text>
              <Text style={[styles.planilhaFont, styles.planilhaCardValue]}>
                {aquecimento &&
                  `${aquecimento.distancia}${aquecimento.un} - ${aquecimento.ritimo}`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={dialogDesenvolvimento}>
            <View style={styles.planilhaBox}>
              <Text style={[styles.planilhaFont, styles.planilhaCardTitle]}>
                Desenvolvimento
              </Text>
              <Text style={[styles.planilhaFont, styles.planilhaCardValue]}>
                {`${desenvolvimento.distancia}${desenvolvimento.un} a ${desenvolvimento.ritimo} min/km`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.planilhaContainer}>
          <TouchableOpacity onPress={dialogCalma}>
            <View style={styles.planilhaBox}>
              <Text style={[styles.planilhaFont, styles.planilhaCardTitle]}>
                Volta a calma
              </Text>
              <Text style={[styles.planilhaFont, styles.planilhaCardValue]}>
                {`${calma.distancia}${calma.un} - ${calma.ritimo}`}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.planilhaBox}>
            <Text style={[styles.planilhaFont, styles.planilhaCardTitle]}>
              VO2 Treino
            </Text>
            <Text style={[styles.planilhaFont, styles.planilhaCardValue]}>
              {`${vo2Treino}%`}
            </Text>
          </View>
        </View>

        <View style={{paddingVertical: 16}}>
          <Button
            icon="content-save"
            loading={loading}
            mode="contained"
            color={theme.button}
            onPress={addTreino}>
            Adicionar Treino
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default vo2;
