import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    img:{
        width:100, 
        height:45,
        marginBottom: 10
    },
    button:{
        width: Dimensions.get('screen').width,
        paddingHorizontal: 16
    },
    links:{
        paddingTop: 16,
        color: '#069',
    },
});

export default styles;