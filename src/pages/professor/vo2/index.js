import React, { useState } from 'react';
import { View, SafeAreaView, Text, Button } from 'react-native';
import moment from "moment";
import 'moment/locale/pt-br';
import CalendarStrip from 'react-native-calendar-strip';
import CardAluno from '../../../components/CardAluno';
import InputPlanilha from '../../../components/InputPlanilha';
import theme from '../../../themes/white';

import styles from './styles';
const vo2 = () => {
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ currentDateIndex, setCurrentDateIndex ] = useState(null);
    let markedDates = [];
    let customDatesStyles = [];

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

    const toggleMenu = () =>{
      console.log("menu")
    }

    
  return (
    <SafeAreaView style={styles.container}>
      <CalendarStrip
        style={{height:90, paddingTop: 16}}
        calendarHeaderContainerStyle={{paddingBottom: 0}}
        calendarAnimation={{type: 'sequence', duration: 30}}
        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#fff'}}
        customDatesStyles={customDatesStyles}
        markedDates={markedDates}
      />
      <CardAluno onPress={toggleMenu}/>

      <View style={styles.variacoes}>
        <View style={styles.item}>
          <Text style={styles.titulo}>Vo2</Text>
          <Text>70%</Text>
        </View>
        <View  style={[styles.item, styles.border]}>
          <Text  style={styles.titulo}>Carga Pace</Text>
          <Text>70%</Text>
        </View>
        <View style={styles.item}>
          <Text  style={styles.titulo}>Percurso</Text>
          <Text>Distância</Text>
        </View>
      </View>

      <InputPlanilha titulo="Aquecimento" valor="2Km" ritimo="trote"/>

      <InputPlanilha titulo="Desenvolvimento" valor="2Km" ritimo="6,32 km/h"/>

      <InputPlanilha titulo="Volta a calma" valor="500m" ritimo="trote"/>
      <View style={{paddingVertical: 16}}>
       <Button color={theme.button} title="Adicionar Treino" />
      </View>
    </SafeAreaView>
  );
}


export default vo2;