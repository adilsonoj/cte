import { StyleSheet } from 'react-native';
import Theme from '../../themes/white';

const styles = StyleSheet.create({
    
    item:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        padding: 10,
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: Theme.primary,
    },

    text: {
      paddingLeft: 10,
      color: '#424242'
    },
    icon:{
      color: '#424242'
    },
    activeItem:{
      backgroundColor: '#eee'
    },
    activeIcon:{
      color: Theme.secundary
    },
    activeText:{
      color: Theme.secundary
    }
});


export default styles;