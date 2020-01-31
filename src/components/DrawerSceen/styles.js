import { StyleSheet } from 'react-native';
import Theme from '../../themes/white';

const styles = StyleSheet.create({
    
    item:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        padding: 16,
        height: 50,
        
    },

    text: {
      paddingLeft: 10,
      color: '#424242'
    },
    icon:{
      
      width: 25,
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