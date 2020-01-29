import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    viewImg:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    img:{
        width:100, 
        height:45,
    },
    button:{
        paddingVertical: 16
    },
    viewLinks:{
        alignItems: 'center',
    },
    links:{
        paddingTop: 16,
        color: '#069',
    },
});

export default styles;