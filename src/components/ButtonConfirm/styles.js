import { StyleSheet } from 'react-native'
import Theme from '../../themes/white'

const styles = StyleSheet.create({
    button:{
        height: 45,
        backgroundColor: Theme.primary,
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