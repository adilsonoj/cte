import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import styles from './styles'

const initialState = [
    {
        id:1,
        semana: 5,
        dia:1,
        distancia: 10,
        tempo: '1h25m',
        ritimo: '5,6',
        fc: 70
    },
    {
        id:2,
        semana: 5,
        dia: 2,
        distancia: 11,
        tempo: '1h30m',
        ritimo: '5,2',
        fc: 70
    },
    {
        id:3,
        semana: 5,
        dia: 2,
        distancia: 11,
        tempo: '1h30m',
        ritimo: '5,2',
        fc: 70
    },
]

 const historico = () => {
    const [historicos, setHistoricos] = useState(initialState);

  return (
      <SafeAreaView style={styles.container}>
            <FlatList 
                data={historicos} 
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => 
                    <View style={styles.card}>
                   
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderTitle}>Semama {historico.semana} - Dia {item.dia}</Text>
                        </View>
                        
                        <View style={styles.cardContainer}>
                            <View style={styles.box}>
                                <Text style={styles.cardTitle}>Distância</Text>
                                <Text style={styles.cardValue}>{item.distancia}km</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.cardTitle}>Tempo</Text>
                                <Text style={styles.cardValue}>{item.tempo}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.cardTitle}>Ritimo</Text>
                                <Text style={styles.cardValue}>{item.ritimo}km/h</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.cardTitle}>FC</Text>
                                <Text style={styles.cardValue}>{item.fc}bpm</Text>
                            </View>
                            
                        </View>
                   
                    </View>
                }
            />
      </SafeAreaView>
  );
}
export default historico;