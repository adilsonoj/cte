import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
       paddingVertical: 16,
       paddingHorizontal: 16,
    },
    header:{
        justifyContent:'center',
        marginTop: 10,
        marginBottom:10,
        height: 30,
        paddingLeft: 6,
        backgroundColor: '#EEEEEE',
    },
    button:{
        paddingVertical:16
    },
    card:{
        flexDirection: "row",
        alignItems: "flex-end",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingLeft: 6
    },
    imgPerfil:{
        alignItems: 'center'
    },
    text: {
        fontSize: 16
    }
});

export default styles;