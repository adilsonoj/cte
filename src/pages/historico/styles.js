import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.background,
        alignItems: 'center',
        
    },
    card: {
        justifyContent: 'space-around',
        width: Dimensions.get('window').width * 0.95,
        height: 100,
        backgroundColor: theme.backgroundCard,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 5

    },
    cardHeader: {
        alignItems: 'center',
        fontFamily: theme.font
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
   
    box:{
        width: Dimensions.get('window').width / 4,
        height: 50,
        alignItems: 'center'
    },
    cardTitle: {
        color: theme.text,
        fontFamily: theme.font
    },
    cardValue:{
        color: theme.primary,
        fontFamily: theme.font
    }
});

export default styles;