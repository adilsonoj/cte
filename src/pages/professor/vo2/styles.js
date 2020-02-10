import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../themes/white';

const styles = StyleSheet.create({
    container:{
        flex:1,
       backgroundColor: theme.background,
       paddingHorizontal: 16,
       paddingHorizontal: 16
    },

    variacoes:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 40,
        backgroundColor: theme.backgroundCard,
        ...theme.shadow
    },
    item:{
        width: Dimensions.get("window").width / 3,
        alignItems: "center",
        
    },
    border:{
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    titulo:{
        fontSize: 15,
        fontWeight: "bold",
        color: theme.primary
    },
    button:{
        color: theme.button
    }
   
});

export default styles;