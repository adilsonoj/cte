import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import styles from './styles';

const planilha = () => {
  return (
    <SafeAreaView >
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.font, styles.headerText]}>Semana 5 - Dia 1</Text>
                    <Text style={styles.headerFeedBack}>feedBack</Text>
                </View>
                <View style={styles.planilhaContainer}>
                    <View style={styles.box}>
                        <Text style={[styles.font, styles.cardTitle]}>Aquecimento</Text>
                        <Text style={[styles.font, styles.cardValue]}>10min - trote</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={[styles.font, styles.cardTitle]}>Desenvolvimento</Text>
                        <Text style={[styles.font, styles.cardValue]}>10min - trote</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={[styles.font, styles.cardTitle]}>Volta a calma</Text>
                        <Text style={[styles.font, styles.cardValue]}>10min - trote</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={[styles.font, styles.cardTitle]}>FC máxima</Text>
                        <Text style={[styles.font, styles.cardValue]}>10min - trote</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Semana 5 - Dia 1</Text>
                    <Text style={styles.headerFeedBack}>feedBack</Text>
                </View>
                <View style={styles.planilhaContainer}>
                    <View style={styles.box}>
                        <Text>Aquecimento</Text>
                        <Text>10min - trote</Text>
                    </View>
                    <View style={styles.box}>
                        <Text>Desenvolvimento</Text>
                        <Text>10min - trote</Text>
                    </View>
                    <View style={styles.box}>
                        <Text>Volta a calma</Text>
                        <Text>10min - trote</Text>
                    </View>
                    <View style={styles.box}>
                        <Text>FC máxima</Text>
                        <Text>10min - trote</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}


export default planilha;