import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'


const styles = StyleSheet.create({
    container:{
        paddingVertical: 6,
    },
    textInput:{
        height: 40,
        fontSize: 16,
    },
    text:{
        color: theme.primary,
        paddingLeft: 6,
    }
})
export default styles;