import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView,TouchableWithoutFeedback,TextInput  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../components/ButtonConfirm';
import moment from 'moment';
require('moment/locale/pt-br');
// moment.locale('pt-br');


import styles from './styles';

const feedBack = () => {
      const [aquecimento, setAquecimento] = useState({km: 0, m: 0});
      const [desenvolvimento, setDesenvolvimento ] = useState({km: 0, m: 0});
      const [fcMaxima, setFcMaxima] = useState('');
      const [pace, setPace] = useState({m: 0, s: 0});
      const [tempo, setTempo] = useState({h: 0, m: 0, s: 0});
      const [data, setData] = useState(new Date());
      const [show, setShow] = useState(false);
      const [observacao, setObservacao] = useState('')
      useEffect(()=>{
        let h;
        let d;
        let pace = 0.0;
        let decimal
        if(desenvolvimento.km !=0 && (tempo.h!=0 || tempo.m!=0)){
          h = (((tempo.h * 60) * 60) + (tempo.m * 60) + (tempo.s*1) ) / 60
          d = ((desenvolvimento.km / 1000) + desenvolvimento.m) * 1000
          pace = h/d;
          decimal = Math.round((pace - Math.floor(pace))*60)

          setPace({...pace, m:Math.floor(pace), s: decimal})
        }
        console.log("h ",h)
        console.log(d)
        console.log("pace: ",Math.floor(pace))
        console.log("decimal: ", decimal*0.01)

        
      },[desenvolvimento, tempo])

      
      
      const changeData = (event, date)=>{
        console.log(moment().format('L'))
        date = date || data;
        setShow(false);
        setData(date);
        
      }
  return (
    <SafeAreaView>
      <ScrollView >
        
          <View style={styles.container}>
            <Text style={styles.label}>Aquecimento</Text>
            <View style={styles.card}>
              <View style={styles.cardInput}>
                <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={km => setAquecimento({...aquecimento, km: km})} />
                <Text>km</Text>
              </View>
              <View style={styles.cardInput}>
                <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={m => setAquecimento({...aquecimento, m:m})}/>
                <Text>m</Text>
              </View>
              <View style={styles.cardInput}>
                <Text>{`${aquecimento.km}, ${aquecimento.m} km`}</Text>
              </View>
            </View>
         

            <Text style={styles.label}>Desenvolvimento</Text>
              <View style={styles.card}>
                <View style={styles.cardInput}>
                  <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={km => setDesenvolvimento({...desenvolvimento, km: km})} />
                  <Text>km</Text>
                </View>
                <View style={styles.cardInput}>
                  <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={m => setDesenvolvimento({...desenvolvimento, m:m})}/>
                  <Text>m</Text>
                </View>
                <View style={styles.cardInput}>
                  <Text>{`${desenvolvimento.km}, ${desenvolvimento.m} km`}</Text>
                </View>
              </View>

              <Text style={styles.label}>Tempo</Text>
              <View style={styles.card}>
                <View style={styles.cardInput}>
                  <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={h => setTempo({...tempo, h: h})} />
                  <Text>h</Text>
                </View>
                <View style={styles.cardInput}>
                  <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={m => setTempo({...tempo, m:m})}/>
                  <Text>m</Text>
                </View>
                <View style={styles.cardInput}>
                  <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={s => setTempo({...tempo, s:s})}/>
                  <Text>s</Text>
                </View>
                <View style={styles.cardInput}>
                  <Text>{`${tempo.h}:${tempo.m}:${tempo.s}`}</Text>
                </View>
              </View>

              <Text style={styles.label}>Rítimo Médio</Text>
              <View style={styles.card}>
                <View style={styles.cardInput}>
                  <TextInput value={pace.m.toString()} style={styles.input} keyboardType={ "numeric" } onChangeText={m => setPace({...pace, m: m})} />
                  <Text>m</Text>
                </View>
                
                <View style={styles.cardInput}>
                  <TextInput value={pace.s.toString()} style={styles.input} keyboardType={ "numeric" } onChangeText={s => setPace({...pace, s:s})}/>
                  <Text>s</Text>
                </View>
                <View style={styles.cardInput}>
                  <Text>{`${pace.m}'${pace.s}" /km`}</Text>
                </View>
              </View>

              <Text style={styles.label}>Fc Máxima</Text>
              <View style={styles.card}>
                <View style={styles.cardInput}>
                  <TextInput style={styles.input} keyboardType={ "numeric" } onChangeText={fc => setFcMaxima(fc)} />
                </View>
                <View style={styles.cardInput}>
                  <Text>{`${fcMaxima} Bpm`}</Text>
                </View>
              </View>

              <Text style={styles.label}>Data</Text>
              
              <TouchableWithoutFeedback onPress={()=>setShow(true)}>
                <Text style={styles.data} >{moment(data).format('D [de] MMMM [de] YYYY [as] hh:mm:ss')}</Text>
              </TouchableWithoutFeedback>

              <Text style={styles.label}>Observação</Text>
              <TextInput style={styles.inputObs}  onChangeText={obs => setObservacao(obs)} />

              
            </View>

              { show &&                
                    <DateTimePicker value={data}
                      is24Hour={true}
                      display="default"
                      onChange={changeData} />
                  }
              <View style={{paddingBottom: 20}}>
                <Button color='#069'text="Enviar"/>
              </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}

export default feedBack;