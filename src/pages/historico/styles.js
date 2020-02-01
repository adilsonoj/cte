import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.background,
        paddingVertical:16,
        paddingHorizontal: 16,
        
    },
    card: {
        justifyContent: 'space-around',
        height: 100,
        backgroundColor: theme.backgroundCard,
        marginBottom: 5,
        borderRadius: 5

    },
    cardHeader: {
        alignItems: 'center',
    },
    cardHeaderTitle: {
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