import React from 'react';

import { View, Modal, ActivityIndicator } from 'react-native';

import styles from './styles';

const Loader = (props) =>{
    return(
        <Modal
            transparent={true}
            animationType={'none'}
            visible={props.loading}
            //onRequestClose={() => {console.log('close modal')}}
        >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={props.loading} />
          </View>
        </View>
      </Modal>
    )    
}

export default Loader;
