import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import styles from './styles';

const planilha = ({navigation, userStore}) => {
  const [treinos, setTreinos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getDados = async () => {
    const user = await firestore().doc(`users/${userStore.uid.trim()}`).get();

    let list = user.data().treinos.sort((a, b) => {
      return moment(a.data._seconds * 1000).isAfter(
        moment(b.data._seconds * 1000),
      )
        ? 1
        : moment(a.data._seconds * 1000).isBefore(
            moment(b.data._seconds * 1000),
          )
        ? -1
        : 0;
    });
    setTreinos(list);
    setRefreshing(false);
  };

  useEffect(() => {
    getDados();
  });

  const onRefresh = () => {
    setRefreshing(true);
    getDados();
  };

  const FeedBack = ({item}) => {
    if (!item.feedBack) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FeedBack', {item: item});
          }}>
          {/* <Text style={styles.headerFeedBack}>feedback</Text> */}
          <Icon
            style={styles.headerFeedBack}
            name="trophy-outline"
            size={20}
            color="#2A2A2A"
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <Icon
            style={styles.headerFeedBack}
            name="trophy-outline"
            size={20}
            color="#FFCA00"
          />
        </View>
      );
    }
  };

  const Itens = ({item}) => {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {moment(item.data._seconds * 1000).format(' MMMM [dia] D')}
          </Text>
          <FeedBack item={item} />
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
              {item.calma.un} - {item.calma.ritimo}
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={[styles.font, styles.cardTitle]}>FC média</Text>
            <Text style={[styles.font, styles.cardValue]}>160 Bpm</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={treinos}
        renderItem={({item}) => <Itens item={item} />}
        keyExtractor={(_, i) => i.toString()}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  userStore: state.userLogged.user,
});
export default connect(mapStateToProps)(planilha);
