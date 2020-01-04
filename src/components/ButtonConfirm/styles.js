import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
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
});

export default styles;