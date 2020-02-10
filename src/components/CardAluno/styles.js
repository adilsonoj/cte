import { StyleSheet } from 'react-native';
import theme from '../../themes/white';

const styles = StyleSheet.create({
    container:{
        paddingBottom:10
    },
    cardAluno:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.backgroundCard,
        height: 60,
        paddingHorizontal:5,
        ...theme.shadow
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#000",
    },
    info:{
        paddingLeft: 10,
        flex:1,
        height: 60,
        justifyContent: "space-around",
    },
    linha2:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textNome:{
        fontSize: 16,
        fontWeight: "bold"
    },
    textObjetivo:{
        fontSize: 13
    },
    menu:{
        paddingLeft: 15,
    }
});

export default styles;