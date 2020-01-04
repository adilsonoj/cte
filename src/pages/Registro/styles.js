import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        //backgroundColor: theme.background,
        paddingTop: 15,
        alignItems: 'center',
        
    },
    header:{
        justifyContent:'center',
        marginTop: 10,
        marginBottom:10,
        paddingLeft:6,
        height: 30,
        width: Dimensions.get('window').width-30,
        backgroundColor: '#EEEEEE',
    }
});

export default styles;