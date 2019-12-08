import React from 'react';

import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import styles from './styles';
import Input from '../../components/input';
import ImagemPerfil from '../../components/imagemPerfil';

const handleChangeText = (text) => {
    console.log(text)
}

const perfil = () => (
    <SafeAreaView>
        <ScrollView >
            <View style={styles.container}>
                <ImagemPerfil />
                <Input placeholder="Nome" onChangeText={handleChangeText}/>
                <Input placeholder="Email" onChangeText={handleChangeText} keyboardType="email-address"/>
                <Input placeholder="Idade" onChangeText={handleChangeText}/>
                <Input placeholder="Peso" onChangeText={handleChangeText}/>
                <View style={styles.header}>
                    <Text >OBJETIVO</Text>
                </View>
                
                <Input placeholder="Distância" onChangeText={handleChangeText}/>
                <Input placeholder="Data" onChangeText={handleChangeText}/>
                {/* <Input placeholder="Senha" secureTextEntry={true} autoCorrect={false}/> */}
            </View>
        </ScrollView>
    </SafeAreaView>
);

export default perfil;
