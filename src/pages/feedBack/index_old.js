import React, { useState, useEffect } from 'react';
import { Text, View, Picker, Dimensions,TouchableWithoutFeedback  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../components/ButtonConfirm';
import Input from '../../components/input';

import styles from './styles';

const feedBack = () => {
    
      const [aquecimento, setAquecimento] = useState('');
      const [desenvolvimento, setDesenvolvimento ] = useState('');
      const [fcMaxima, setFcMaxima] = useState('');
      const [medidaAquecimento, setMedidaAquecimento] = useState('km');
      const [medidaDesenvovimento, setMedidaDesenvovimento] = useState('km');
      const [medidaTempo, setMedidaTempo] = useState('');
      const [pace, setPace] = useState('');
      const [tempo, setTempo] = useState('');
      const largura = Dimensions.get('window').width - 120;
      const [data, setData] = useState(new Date());
      const [show, setShow] = useState(false);
      useEffect(()=>{
        if(desenvolvimento && tempo){
            setPace(String(desenvolvimento/tempo))
        }
      },[desenvolvimento, tempo])
      
      const changeData = (event, date)=>{
        date = date || data;
        setShow(false);
        setData(date);
        
      }
  return (
    <View >
        
          <View style={styles.modalBackground}>
            <View style={styles.box}>
              <View style={styles.input}>
                  <TouchableWithoutFeedback onPress={()=>setShow(true)}>
                    <Text>{data.toString()}</Text>
                  </TouchableWithoutFeedback>
                  { show &&                
                    <DateTimePicker value={data}
                      is24Hour={true}
                      display="default"
                      onChange={changeData} />
                  }
                </View>
                <View style={styles.input}>
                  <Input  width={largura} placeholder="Aquecimento (km)"  onChangeText={aquecimento => setAquecimento(aquecimento)}/>
                    <Picker
                    selectedValue={medidaAquecimento}
                    style={styles.picker}
                    onValueChange={medidaAquecimento => setMedidaAquecimento(medidaAquecimento) }>
                    <Picker.Item label="km" value="km" />
                    <Picker.Item label="m" value="m" />
                </Picker>
                </View>
                <View style={styles.input}>
                <Input width={largura} placeholder="Desenvolvimento (km)" onChangeText={desenvolvimento => setDesenvolvimento(desenvolvimento)}/>
                  <Picker
                    selectedValue={medidaDesenvovimento}
                    style={styles.picker}
                    onValueChange={medidaDesenvovimento => setMedidaDesenvovimento(medidaDesenvovimento) }>
                    <Picker.Item label="km" value="km" />
                    <Picker.Item label="m" value="m" />
                  </Picker>
                </View>
                <View style={styles.input}>
                <Input width={largura} placeholder="Tempo" onChangeText={tempo => setTempo(tempo)}/>
                  <Picker
                    selectedValue={medidaTempo}
                    style={styles.picker}
                    onValueChange={medidaTempo => setMedidaTempo(medidaTempo) }>
                    <Picker.Item label="h" value="h" />
                    <Picker.Item label="min" value="min" />
                  </Picker>
                </View>
                <View style={styles.input}>
                <Input placeholder="Rítimo Médio (km/h)" width={largura} value={pace} onChangeText={pace => setPace(page)}/>
                  <Text  style={{top: 15}}>km/h</Text>
                </View>
                <View style={styles.input}>
                <Input placeholder="fcMáxima (%)" width={largura} onChangeText={fcMaxima => setFcMaxima(fcMaxima)}/>
                  <Text  style={{top: 15}}>km/h</Text>
                </View>
              
                <Button color='#069'text="Enviar"/>
              
            </View>
          </View>
      </View>
  );
  
}

export default feedBack;