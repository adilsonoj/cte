import React, {useState} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDateIndex, setCurrentDateIndex] = useState(null);
  const [aquecimento, setAquecimento] = useState('');
  let markedDates = [];
  let customDatesStyles = [];
  const un = ['km', 'm'];
  const ritimo = ['rápido', 'médio', 'lento'];

  const getList = (total, label = '') => {
    return Array.apply(null, Array(total)).map(function(_, i) {
      return i.toString() + ` ${label}`;
    });
  };

  const distancia = getList(60);

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
    console.log('aquecimento');
    const inputs = [distancia, un, ritimo];
    const selectedValues = aquecimento
      ? [aquecimento.distancia, aquecimento.un, aquecimento.ritimo]
      : [0, 0, 0];
    const options = {
      dialogTitle: 'Aquecimento',
    };
    const result = await openDialog(inputs, selectedValues, options);
    if (result)
      setAquecimento({distancia: result[0], un: result[1], ritimo: result[2]});
  };

  const toggleMenu = () => {
    console.log('menu');
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
      />
      <CardAluno onPress={toggleMenu} />

      <View style={styles.variacoes}>
        <View style={styles.item}>
          <Text style={styles.titulo}>Vo2</Text>
          <Text>70%</Text>
        </View>
        <View style={[styles.item, styles.border]}>
          <Text style={styles.titulo}>Carga Pace</Text>
          <Text>70%</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.titulo}>Percurso</Text>
          <Text>Distância</Text>
        </View>
      </View>
      <InputPlanilha
        titulo="Aquecimento"
        valor={aquecimento.distancia}
        ritimo="trote"
        changeValue={dialogAquecimento}
      />

      <InputPlanilha titulo="Desenvolvimento" valor="2Km" ritimo="6,32 km/h" />

      <InputPlanilha titulo="Volta a calma" valor="500m" ritimo="trote" />
      <View style={{paddingVertical: 16}}>
        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          color={theme.button}>
          Adicionar Treino
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default vo2;
