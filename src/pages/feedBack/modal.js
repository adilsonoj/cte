import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Picker, Dimensions } from 'react-native';
import Button from '../../components/ButtonConfirm';
import Input from '../../components/input';

import styles from './styles';

const feedBack = () => {
    
      const [modalVisible, setModalVisible] = useState(false);
      const [aquecimento, setAquecimento] = useState('');
      const [desenvolvimento, setDesenvolvimento ] = useState('');
      const [fcMaxima, setFcMaxima] = useState('');
      const [medidaAquecimento, setMedidaAquecimento] = useState('km');
      const [medidaDesenvovimento, setMedidaDesenvovimento] = useState('km');
      const [pace, setPace] = useState('');
      const [tempo, setTempo] = useState('');
      
  return (
    <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onDismiss={() => {
            Alert.alert('Modal has been closed.');
            console.log('dismis')
          }}>
          <View style={styles.modalBackground}>
            <View style={styles.box}>
              <View style={{alignItems: "center"}}>
                <Text >Feedback</Text>
              </View>
              
              <View style={{flexDirection: "row",width:200}}>
                <Input  width={Dimensions.get('window').width - 120} placeholder="Aquecimento (km)"  onChangeText={aquecimento => setAquecimento(aquecimento)}/>
                  <Picker
                  selectedValue={medidaAquecimento}
                  style={{height: 30, width: 100,top: 15 }}
                  onValueChange={medidaAquecimento => setMedidaAquecimento(medidaAquecimento) }>
                  <Picker.Item label="km" value="km" />
                  <Picker.Item label="m" value="m" />
              </Picker>
              </View>
              <View style={{flexDirection: "row",width:200}}>
              <Input width={Dimensions.get('window').width - 120} placeholder="Desenvolvimento (km)" onChangeText={desenvolvimento => setDesenvolvimento(desenvolvimento)}/>
                <Picker
                  selectedValue={medidaAquecimento}
                  style={{height: 30, width: 100,top: 15 }}
                  onValueChange={medidaDesenvovimento => setMedidaDesenvovimento(medidaDesenvovimento) }>
                  <Picker.Item label="km" value="km" />
                  <Picker.Item label="m" value="m" />
                </Picker>
              </View>
              <View style={{flexDirection: "row",width:200}}>
              <Input width={Dimensions.get('window').width - 120} placeholder="Tempo" onChangeText={tempo => setTempo(tempo)}/>
                <Picker
                  selectedValue={medidaAquecimento}
                  style={{height: 30, width: 100,top: 15 }}
                  onValueChange={medidaDesenvovimento => setMedidaDesenvovimento(medidaDesenvovimento) }>
                  <Picker.Item label="h" value="h" />
                  <Picker.Item label="min" value="min" />
                </Picker>
              </View>
             
              
              
              <Input placeholder="Rítimo Médio" width={styles.box.width} onChangeText={pace => setPace(page)}/>
              <Input placeholder="fcMáxima" width={styles.box.width} onChangeText={fcMaxima => setFcMaxima(fcMaxima)}/>
              <Picker
                
                style={{height: 50, width: 100}}
                onValueChange={() => {} }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>



              <View style={{flexDirection: 'row', justifyContent: 'space-around',}}>
              <Button color='#069' width='40%' text="Enviar"/>
              <Button width='40%' text="Cancelar" onPress={() => {
                  setModalVisible(!modalVisible);
                }}/>
              </View>
              
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
       
      </View>
  );
  
}

export default feedBack;