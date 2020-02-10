import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../themes/white';

const styles = StyleSheet.create({
    planilha:{
        paddingTop:10
    },
    planilhaItem:{
        flexDirection: "row", 
        justifyContent: "space-around",
        alignItems:"center",
        backgroundColor: "#fff",
        height: 30,
        ...theme.shadow
    },
    planilhaTitulo:{
        fontWeight: "bold",
        fontSize: 16,
        paddingBottom: 5
    },
    planilhaCampo:{
        alignItems: "center",
        width: Dimensions.get("window").width / 2,
    },
    borderLeft:{
        borderLeftWidth: 1
    }
});

export default styles;