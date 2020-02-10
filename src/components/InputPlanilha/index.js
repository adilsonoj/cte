import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'

const InputPlanilha = props => {
  return (
    <View style={styles.planilha}> 
        <Text style={styles.planilhaTitulo}>{props.titulo}</Text>
        <View style={styles.planilhaItem}>
        <View style={styles.planilhaCampo}>
            <Text>{props.valor}</Text>
        </View>
        <View style={[styles.planilhaCampo, styles.borderLeft]}>
            <Text>{props.ritimo}</Text>
        </View>
        </View>
    </View>
  );
}

export default InputPlanilha;