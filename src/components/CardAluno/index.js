import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import moment from 'moment';
require('moment/locale/pt-br');
import styles from './styles';

const CardAluno = ({
  aluno,
  avaliar,
  trocar,
  editar,
  onPressPlanilha,
  toggleMenu,
}) => {
  const menu = useRef(null);

  const hideMenu = () => {
    console.log('hide');
    menu.current.hide();
  };

  const showMenu = () => {
    console.log('show');
    menu.current.show();
  };

  toggleMenu(menu);
  return (
    <View style={styles.container}>
      <View style={styles.cardAluno}>
        <Image source={{uri: aluno.photoURL}} style={styles.avatar}></Image>
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
            <Menu ref={menu}>
              {trocar && <MenuItem onPress={hideMenu}>Trocar Aluno</MenuItem>}
              {editar && (
                <MenuItem onPress={menu => onPressPlanilha(menu)}>
                  Editar Planilha
                </MenuItem>
              )}

              {avaliar && <MenuItem onPress={hideMenu}>Avaliar</MenuItem>}
            </Menu>
            <Icon name="dots-vertical" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardAluno;
