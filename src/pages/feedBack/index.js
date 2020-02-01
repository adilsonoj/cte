import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView,TouchableWithoutFeedback,TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import theme from '../../themes/white';
require('moment/locale/pt-br');

import { openDialog } from 'rn-android-picker-dialog';

import styles from './styles';

const feedBack = (props) => {
  console.log("feedback: ", props.navigation.navigationOptions)

  const [aquecimento, setAquecimento] = useState('');
  const [desenvolvimento, setDesenvolvimento ] = useState('');
  const [fcMaxima, setFcMaxima] = useState('');
  const [pace, setPace] = useState('');
  const [tempo, setTempo] = useState('');
  const [data, setData] = useState(new Date());
  const [show, setShow] = useState(false);
  const [observacao, setObservacao] = useState('');
  const [vo2, setVo2] = useState('');
  const [disabledButton, setDisabledButton] = useState(true)
  useEffect(()=>{
    //props.navigation.actions.goBack()

 },[])
      useEffect(()=>{
        let h;
        let d;
        let pace = 0.0;
        let decimal;
        if(desenvolvimento && tempo){
          h = (((tempo.h * 60) * 60) + (tempo.m * 60) + (tempo.s * 1) ) / 60
          d = ((desenvolvimento.km / 1000) + desenvolvimento.m) * 1000
          pace = h/d;
          decimal = Math.round((pace - Math.floor(pace))*60)

          setPace({...pace, m:Math.floor(pace), s: decimal})
          setDisabledButton(false)
        }
       
      },[desenvolvimento, tempo])

      const getList = (total, label)=>{
        return Array.apply(null, Array(total)).map(function (_, i) {return i.toString() +` ${label}`;});
      }
      const kms = getList(51, "km");
      const mts = getList(1000, "m");
      const h = getList(60, "h");
      const m = getList(60, "m");
      const s = getList(60, "s");

      const dialogAquecimento = async()=>{
        const inputs = [kms,mts];
        const selectedValues = aquecimento ? [aquecimento.km,aquecimento.m]: [0,0];
        const options = {
          dialogTitle: "Aquecimento",
        }
        const result = await openDialog(inputs, selectedValues, options);
        if(result) setAquecimento({km: result[0], m:result[1]})
      }

      const dialogDesenvolvimento = async()=>{
        const inputs = [kms,mts];
        const selectedValues = desenvolvimento ? [desenvolvimento.km, desenvolvimento.m]: [0,0];
        const options = {
          dialogTitle: "Desenvolvimento",
        }
        const result = await openDialog(inputs, selectedValues, options);
        if(result) setDesenvolvimento({km: result[0], m:result[1]})
      }

      const dialogTempo = async()=>{
        const inputs = [h,m,s];
        const selectedValues = tempo ? [tempo.h, tempo.m, tempo.s] : [0,0,0];
        const options = {
          dialogTitle: "Tempo",
        }
        const result = await openDialog(inputs, selectedValues, options);
        if(result) setTempo({h: result[0], m: result[1], s: result[2]})
      }

      const dialogPace = async()=>{
        const inputs = [m,s];
        const selectedValues = pace ? [pace.m,pace.s] : [0,0];
        const options = {
          dialogTitle: "Pace",
        }
        const result = await openDialog(inputs, selectedValues, options);
        if(result) setPace({m: result[0], s: result[1]})
      }

      const dialogFcMaxima = async()=>{
        const inputs = [getList(250, "Bpm")];
        const selectedValues = fcMaxima ? [fcMaxima] : [0];
        const options = {
          dialogTitle: "Fc Máxima",
        }
        const result = await openDialog(inputs, selectedValues, options);
        if(result) setFcMaxima(result[0])
      }

      const dialogVo2 = async()=>{
        const inputs = [getList(250,'')];
        const selectedValues = vo2 ? [vo2] : [0];
        const options = {
          dialogTitle: "VO2",
        }
        const result = await openDialog(inputs, selectedValues, options);
        if(result) setVo2(result[0])
      }

      const changeData = (event, date)=>{
        date = date || data;
        setShow(false);
        setData(date);
      }

      

  return (
    <SafeAreaView>
      <ScrollView >
          <View style={styles.container}>

            <Text style={styles.label}>Data</Text> 
            <TouchableWithoutFeedback onPress={()=>setShow(true)}>
              <View style={styles.card}> 
                <Text>{moment(data).format('D [de] MMMM [de] YYYY [as] HH:mm:ss')}</Text>
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.label}>Aquecimento</Text>
            <TouchableWithoutFeedback onPress={()=>dialogAquecimento()}>
              <View style={styles.card}> 
                {aquecimento ? <Text>{`${aquecimento.km},${aquecimento.m} km`}</Text> : <Text>--km</Text>} 
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.label}>Desenvolvimento</Text>
            <TouchableWithoutFeedback onPress={()=>dialogDesenvolvimento()}>
              <View style={styles.card}>
                {desenvolvimento ? <Text>{`${desenvolvimento.km},${desenvolvimento.m} km`}</Text> : <Text>--km</Text>}
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.label}>Tempo</Text>
            <TouchableWithoutFeedback onPress={()=>dialogTempo()}>
              <View style={styles.card}>
                {tempo ? <Text>{`${tempo.h}:${tempo.m}:${tempo.s}`}</Text> : <Text>--:--:--</Text>}
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.label}>Rítimo Médio</Text>
            <TouchableWithoutFeedback onPress={()=>dialogPace()}>
            <View style={styles.card}>
                {pace ? <Text>{`${pace.m}',${pace.s}" /km`}</Text> : <Text>0'0" /km</Text>}
            </View>
            </TouchableWithoutFeedback>

            <Text style={styles.label}>Fc Máxima</Text>
            <TouchableWithoutFeedback onPress={()=>dialogFcMaxima()}>
              <View style={styles.card}>
                {fcMaxima ? <Text>{`${fcMaxima} Bpm`}</Text> : <Text>--- /Bpm</Text>}
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.label}>VO2</Text>
            <TouchableWithoutFeedback onPress={()=>dialogVo2()}>
              <View style={styles.card}>
                {vo2 ? <Text>{`${vo2}`}</Text> : <Text>---</Text>}
              </View>
            </TouchableWithoutFeedback>
              
            <Text style={styles.label}>Observação</Text>
            <TextInput style={styles.inputObs}  multiline = {true} numberOfLines = {3} onChangeText={obs => setObservacao(obs)} />
  
            </View>

            { show && <DateTimePicker value={data}
                      is24Hour={true}
                      display="default"
                      onChange={changeData} />
            }
            <View style={{padding: 16}}>
              <Button  color={theme.button}title="Enviar" onPress={()=>{}} disabled={disabledButton} />
            </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}

export default feedBack;