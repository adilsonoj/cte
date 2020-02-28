import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

const InputPlanilha = props => {
  return (
    <View style={styles.planilha}>
      <Text style={styles.planilhaTitulo}>{props.titulo}</Text>
      <View style={styles.planilhaItem}>
        <TouchableWithoutFeedback onPress={props.changeValue}>
          <View style={styles.planilhaCampo}>
            <Text>{props.valor}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={props.changeRitimo}>
          <View style={[styles.planilhaCampo, styles.borderLeft]}>
            <Text>{props.ritimo}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default InputPlanilha;
