import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ScrollView, Button, Text} from 'react-native';
import {validateEmail} from '../../common/validate';
import {error} from '../../common/error_pt';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Input from '../../components/input';
import Loader from '../../components/Loader';
import Theme from '../../themes/white';

const Registro = props => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setErro(null);
  }, [nome, email, senha, confirmeSenha]);

  const registrar = async () => {
    if (!(nome && email && senha && confirmeSenha)) return;

    if (email && !validateEmail(email)) {
      setErro('Email inválido');
      return;
    }
    if (senha != confirmeSenha) {
      setErro('Por favor confirme a senha digitada!');
      return;
    }

    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, senha);

      await auth().currentUser.updateProfile({
        displayName: nome,
      });

      props.navigation.navigate('Login');
    } catch (e) {
      setErro(error(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Loader loading={loading} />
        <Input placeholder="Nome" onChangeText={nome => setNome(nome)} />
        <Input
          placeholder="Email"
          onChangeText={email => setEmail(email)}
          keyboardType="email-address"
        />
        <Input
          placeholder="Senha"
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={senha => setSenha(senha)}
        />
        <Input
          placeholder="Confirme a Senha"
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={confirmeSenha => setConfirmeSenha(confirmeSenha)}
        />
        {erro && <Text style={{fontSize: 13, color: 'red'}}>{erro}</Text>}

        <View style={styles.button}>
          <Button title="Entrar" color={Theme.button} onPress={registrar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registro;
