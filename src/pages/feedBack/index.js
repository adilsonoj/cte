import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Picker } from 'react-native';
import Button from '../../components/ButtonConfirm';
import Input from '../../components/input';

import styles from './styles';

const feedBack = () => {
    
      const [modalVisible, setModalVisible] = useState(false);
      const [aquecimento, setAquecimento] = useState('');
      const [desenvolvimento, setDesenvolvimento ] = useState('');
      const [fcMaxima, setFcMaxima] = useState('')
      
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
              <Text>Feedback</Text>

              <Input placeholder="Aquecimento" width={styles.box.width} onChangeText={aquecimento => setAquecimento(aquecimento)}/>
              <Input placeholder="Desenvolvimento" width={styles.box.width} onChangeText={desenvolvimento => setDesenvolvimento(desenvolvimento)}/>
              <Input placeholder="fcMaxima" width={styles.box.width} onChangeText={fcMaxima => setFcMaxima(fcMaxima)}/>
              <Picker
  selectedValue={this.state.language}
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