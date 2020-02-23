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
    paddingBottom: 15,
  },
  text: {
    fontSize: 16,
  },
  placeholder: {
    color: '#aaa',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
  },
  textAvatar: {
    fontSize: 12,
    alignSelf: 'center',
  },
});

export default styles;
