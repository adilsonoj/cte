import { StyleSheet, Dimensions } from 'react-native'


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
      },
      box: {
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height * 0.8,
        
        borderRadius: 10,
        display: 'flex',
        
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingTop: 20
      },
      input:{
        flexDirection: "row",
        width:200
      },
      picker:{
        height: 30, width: 100,top: 15
      },
      buttons:{
        flexDirection: 'row', justifyContent: 'space-around'
      }
})


export default styles;