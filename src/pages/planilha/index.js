import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SwitchActions } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import styles from './styles';

const planilha = (props) => {
  return (
    <SafeAreaView >
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.font, styles.headerText]}>Semana 5 - Dia 1</Text>
                    <TouchableWithoutFeedback onPress={()=> { props.navigation.dispatch(NavigationActions.navigate({routeName: 'Registro'}))}}> 
                    <Text style={styles.headerFeedBack}>feedBack</Text>
                    </TouchableWithoutFeedback>
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
                    <TouchableWithoutFeedback onPress={()=> { props.navigation.dispatch(NavigationActions.navigate({routeName: 'FeedBack'}))}}> 
                        <Text style={styles.headerFeedBack}>feedBack</Text>
                    
                    </TouchableWithoutFeedback>
                   
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