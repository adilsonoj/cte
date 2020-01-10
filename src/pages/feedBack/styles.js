import { StyleSheet, Dimensions } from 'react-native'


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
      box: {
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height * 0.5,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }
})


export default styles;