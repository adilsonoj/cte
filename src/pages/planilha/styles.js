import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../themes/white'

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: theme.background,
        paddingVertical:16,
        paddingHorizontal: 16,
    },
    header:{
        flexDirection: 'row',
        backgroundColor: theme.backgroundCard,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    planilhaContainer:{
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    box:{
        width: (Dimensions.get('screen').width)  / 2 - 18,
        height: 50,
        alignItems: 'center',
        backgroundColor: theme.backgroundCard,
        marginBottom: 5,
        justifyContent: 'center',
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