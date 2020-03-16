import React, {useEffect, useState} from 'react';
import {StatusBar, SafeAreaView, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
require('moment/locale/pt-br');
import CardAluno from '../../components/CardAluno';
import styles from './styles';
import Theme from '../../themes/white';

const DATA = [
  {
    id: '0001',
    displayName: 'Fulano',
    objetivo: {
      distancia: '21km',
      data: '25/03/2020',
    },
    vo2: '35,2',
  },
  {
    id: '0002',
    displayName: 'ciclano',
    objetivo: {
      distancia: '21km',
      data: '26/03/2020',
    },
    vo2: '38,2',
  },
];

const montarPlanilha = menu => {
  console.log('montar planilha', menu);
};
const alunos = ({navigation}) => {
  const [users, setUsers] = useState([]);

  const onLoad = async () => {
    const list = [];
    const query = await firestore()
      .collection('users')
      .get();

    //const users = await ref.get();
    query.forEach(user => {
      console.log(user.data().photoURL);
      list.push(user.data());
    });

    setUsers(list);
  };

  useEffect(() => {
    onLoad();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Theme.primaryDark} barStyle="light-content" />
      <FlatList
        data={users}
        renderItem={({item}) => (
          <CardAluno item={item} avaliar editar navigation={navigation} />
        )}
        keyExtractor={item => item.uid}
        //extraData={selected}
      />
    </SafeAreaView>
  );
};

export default alunos;
