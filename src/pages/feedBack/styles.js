import { StyleSheet, Dimensions } from 'react-native'


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card:{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
     
    },
    input:{
      borderWidth: 1,
      borderColor: '#ccc',
      height: 30,
      width: 60,
      padding: 6,
      fontSize: 16,
      
    },
    cardInput:{
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 12
    },
    picker:{
      height: 30, width: 100
    },
    label:{
      fontSize: 16,
      fontWeight:"bold",
      paddingBottom: 12,
      paddingTop:12
    },
    data:{
      borderWidth: 1,
      borderColor: '#ccc',
      height: 30,
      padding: 6,
      fontSize: 16,
    },
    inputObs:{
      borderWidth: 1,
      borderColor: '#ccc',
      height: 60,
      padding: 6,
      fontSize: 16,
    }
      
})


export default styles;