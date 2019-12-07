import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.background,
        alignItems: 'center',
    },
    header:{
        flexDirection: 'row',
        backgroundColor: theme.backgroundCard,
        width: Dimensions.get('window').width * 0.95,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    planilhaContainer:{
        width: Dimensions.get('window').width * 0.95,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    box:{
        width: (Dimensions.get('window').width * 0.94) / 2,
        height: 50,
        alignItems: 'center',
        backgroundColor: theme.backgroundCard,
        marginBottom: 5,
        justifyContent: 'center'
    },
    headerText:{
        fontWeight: 'bold',
        marginLeft: 10
    },
    headerFeedBack:{
        marginRight: 10
    },
    font:{
        fontFamily: theme.font
    },
    cardTitle: {
        color: theme.text,
        fontFamily: theme.font
    },
    cardValue:{
        color: theme.primary,
        fontFamily: theme.font
    }


})

export default styles;