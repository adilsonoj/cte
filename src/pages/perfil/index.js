import React from 'react';

import { View } from 'react-native';

import styles from './styles';
import Input from '../../components/input';

const perfil = () => (
    <View style={styles.container}>
        <Input placeholder="Nome"/>
        <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false}/>
    </View>
    
);

export default perfil;
