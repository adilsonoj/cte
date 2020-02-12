import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../themes/white';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 30,
    paddingHorizontal: 6,
    backgroundColor: '#EEEEEE',
  },
  button: {
    paddingVertical: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    paddingLeft: 6,
  },
  imgPerfil: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  placeholder: {
    color: '#aaa',
  },
});

export default styles;
