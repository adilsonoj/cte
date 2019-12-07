import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'


const styles = StyleSheet.create({
    container:{
       padding: 6
    },
    textInput:{
        width: Dimensions.get('window').width - 25,
        height: 30,
        borderWidth: 0,
        padding: 6,
        fontSize: 16,
    },
    text:{
        color: theme.primary,
        paddingLeft: 6,
    }

})


export default styles;