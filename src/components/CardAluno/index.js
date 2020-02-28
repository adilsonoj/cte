import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import styles from './styles';

// import { Container } from './styles';

const CardAluno = props => {
  let menu = null;

  const setMenuRef = ref => {
    menu = ref;
  };

  const hideMenu = () => {
    console.log('hide');
    menu.hide();
  };

  const showMenu = () => {
    console.log('show');
    menu.show();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardAluno}>
        <View style={styles.avatar}></View>
        <View style={styles.info}>
          <View>
            <Text style={styles.textNome}>Fulano de Tal</Text>
          </View>
          <View style={styles.linha2}>
            <Text style={styles.textObjetivo}>21K em 21/ABR</Text>
            <Text>Vo2: 38,8</Text>
          </View>
        </View>
        <TouchableOpacity onPress={showMenu}>
          <View style={styles.menu}>
            <Menu ref={setMenuRef}>
              <MenuItem onPress={hideMenu}>Trocar Aluno</MenuItem>
              <MenuDivider />
              <MenuItem onPress={hideMenu}>Avaliar</MenuItem>
            </Menu>
            <Icon name="dots-vertical" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardAluno;
