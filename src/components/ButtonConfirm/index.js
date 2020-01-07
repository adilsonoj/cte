import React from 'react';

import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const ButtonConfirm = (props) =>{
            return (
                
                <TouchableOpacity style={styles.button} onPress={props.onPress}>
                    <Text style={styles.buttonText}>{props.text}</Text>
                </TouchableOpacity>
              
            )
            
            };

export default ButtonConfirm;
