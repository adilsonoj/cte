import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu, {MenuItem} from 'react-native-material-menu';
import moment from 'moment';
require('moment/locale/pt-br');
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

import {openDialog} from 'rn-android-picker-dialog';

const CardAluno = ({item, avaliar, trocar, editar, navigation}) => {
  const menu = useRef(null);
  const [distancia, setDistancia] = useState('');
  const [aluno, setAluno] = useState(item);

  const getList = (total, label) => {
    return Array.apply(null, Array(total)).map(function(_, i) {
      return i.toString() + ` ${label}`;
    });
  };
  const kms = getList(5, 'km');
  const mts = getList(1000, 'm');
  const showMenu = () => {
    menu.current.show();
  };
  const avalia = async () => {
    const inputs = [kms, mts];
    const selectedValues = distancia ? [distancia.km, distancia.m] : [0, 0];
    const options = {
      dialogTitle: 'Avaliação VO2',
    };
    const result = await openDialog(inputs, selectedValues, options);
    if (result) {
      setDistancia({km: result[0], m: result[1]});
      vo2m(result[0], result[1]);
    }
  };

  const vo2m = async (km, m) => {
    let d = km * 1000 + m;
    let vo2m = (d - 504) / 45;
    try {
      const user = firestore().doc(`users/${aluno.uid.trim()}`);
      await user.update({
        vo2: vo2m.toFixed(2),
      });
    } catch (error) {
      console.log(error);
    }

    setAluno({...aluno, vo2: vo2m.toFixed(2)});
  };
  const showAvalia = () => {
    menu.current.hide();
    avalia();
  };

  const showPlanilha = () => {
    menu.current.hide();
    navigation.navigate('Vo2', {item: aluno});
  };

  const navigateAlunos = () => {
    menu.current.hide();
    navigation.navigate('Alunos');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardAluno}>
        <Image
          source={{uri: aluno && aluno.photoURL}}
          style={styles.avatar}></Image>
        <View style={styles.info}>
          <View>
            <Text style={styles.textNome}>{aluno.displayName}</Text>
          </View>
          <View style={styles.linha2}>
            <Text style={styles.textObjetivo}>
              {`${aluno.objetivos[0].distancia}km em ${moment(
                aluno.objetivos[0].data._seconds * 1000,
              ).format('D/MM/YYYY')}`}
            </Text>
            <Text>Vo2: {aluno.vo2}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={showMenu}>
          <View style={styles.menu}>
            <Menu ref={menu} button={<></>}>
              {trocar && (
                <MenuItem onPress={navigateAlunos}>Trocar Aluno</MenuItem>
              )}
              {editar && (
                <MenuItem onPress={showPlanilha}>Editar Planilha</MenuItem>
              )}

              {avaliar && <MenuItem onPress={showAvalia}>Avaliar</MenuItem>}
            </Menu>
            <Icon name="dots-vertical" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardAluno;
