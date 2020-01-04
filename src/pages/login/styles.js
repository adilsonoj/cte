import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    img:{
        width:100, 
        height:45,
        marginBottom: 10
    },
    button:{
        height: 45,
        backgroundColor: '#069',
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        marginLeft: 16,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold'
    },
    links:{
        paddingTop: 16,
        color: '#069',
    },
});

export default styles;