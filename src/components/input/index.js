import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Animated} from 'react-native';
import theme from '../../themes/white';
import styles from './styles';

const Input = props => {
  const [isFocused, setFocused] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(2));

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
    }).start();
    Animated.timing(translateY, {
      toValue: -2,
      duration: 500,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 0,
    }).start();
    Animated.timing(translateY, {
      toValue: 2,
      duration: 0,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {opacity: opacity, transform: [{translateY: translateY}]},
        ]}>
        {props.placeholder}
      </Animated.Text>
      <TextInput
        style={[styles.textInput, props.width ? {width: props.width} : {}]}
        placeholder={props.placeholder}
        underlineColorAndroid={isFocused ? theme.primary : '#f5f5f5'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        value={props.value}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        autoFocus={props.autoFocus}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
      />
    </View>
  );
};

export default Input;
