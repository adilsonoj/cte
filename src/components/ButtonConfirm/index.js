import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const ButtonConfirm = (props) =>{
            return (
                
                <TouchableOpacity style={[styles.button,  
                    props.color ? {backgroundColor: props.color} : {},
                    props.width ? {width: props.width} : {}]} 
                 onPress={props.onPress}>
                    <Text style={styles.buttonText}>{props.text}</Text>
                </TouchableOpacity>
              
            )
            
            };

export default ButtonConfirm;
