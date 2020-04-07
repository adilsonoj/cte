import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import styles from './styles';

const historico = ({userStore}) => {
  const [treinos, setTreinos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getDados = async () => {
    const user = await firestore().doc(`users/${userStore.uid.trim()}`).get();

    let list = user
      .data()
      .treinos.filter((treino) => treino.feedBack)
      .sort((a, b) => {
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
    console.log(list);

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={treinos}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderTitle}>
                  {moment(item.feedBack.data._seconds * 1000).format('LL')}
                </Text>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.box}>
                  <Text style={styles.cardTitle}>Distância</Text>
                  <Text style={styles.cardValue}>
                    {`${item.feedBack.desenvolvimento.km}km${item.feedBack.desenvolvimento.m}m`}
                  </Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.cardTitle}>Tempo</Text>
                  <Text style={styles.cardValue}>
                    {`${item.feedBack.tempo.h}h${item.feedBack.tempo.m}min`}
                  </Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.cardTitle}>Ritimo</Text>
                  <Text style={styles.cardValue}>
                    {`${item.feedBack.pace.m}'${item.feedBack.pace.m}" /km`}
                  </Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.cardTitle}>FC</Text>
                  <Text style={styles.cardValue}>
                    {`${item.feedBack.fcMedia}bpm`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  userStore: state.userLogged.user,
});
export default connect(mapStateToProps)(historico);
