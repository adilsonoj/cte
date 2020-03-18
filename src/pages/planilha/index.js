import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import moment from 'moment';
import 'moment/locale/pt-br';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import styles from './styles';

const planilha = ({navigation, userStore}) => {
  const [treinos, setTreinos] = useState([]);
  const {uid} = userStore;

  const getDados = async () => {
    const user = await firestore()
      .doc(`users/${uid.trim()}`)
      .get();

    console.log(user.data().treinos);

    setTreinos(user.data().treinos);
  };

  useEffect(() => {
    getDados();
  }, []);

  const Itens = ({item}) => {
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Semana 5 - Dia{' '}
            {moment(item.data._seconds * 1000).format('D [de] MMMM [de] YYYY')}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.dispatch(
                NavigationActions.navigate({routeName: 'FeedBack'}),
              );
            }}>
            <Text style={styles.headerFeedBack}>feedBack</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.planilhaContainer}>
          <View style={styles.box}>
            <Text style={[styles.font, styles.cardTitle]}>Aquecimento</Text>
            <Text style={[styles.font, styles.cardValue]}>
              {item.aquecimento.distancia}
              {item.aquecimento.un} - {item.aquecimento.ritimo}
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={[styles.font, styles.cardTitle]}>Desenvolvimento</Text>
            <Text style={[styles.font, styles.cardValue]}>
              {item.desenvolvimento.distancia}
              {item.desenvolvimento.un} a{'  '}
              {item.desenvolvimento.ritimo.split('.')[0]}'
              {item.desenvolvimento.ritimo.split('.')[1]}"
            </Text>
          </View>
        </View>
        <View style={styles.planilhaContainer}>
          <View style={styles.box}>
            <Text style={[styles.font, styles.cardTitle]}>Volta a calma</Text>
            <Text style={[styles.font, styles.cardValue]}>
              {item.calma.distancia}
              {item.calma.un} - {item.calma.distancia}
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={[styles.font, styles.cardTitle]}>FC média</Text>
            <Text style={[styles.font, styles.cardValue]}>160 Bpm</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={treinos}
        renderItem={({item}) => <Itens item={item} />}
        keyExtractor={(_, i) => i}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  userStore: state.userLogged.user,
});
export default connect(mapStateToProps)(planilha);
