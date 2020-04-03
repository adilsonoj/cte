import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../../themes/white';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 16,
  },

  variacoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  item: {
    width: Dimensions.get('window').width / 2 - 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    backgroundColor: theme.backgroundCard,
    ...theme.shadow,
  },
  border: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.primary,
  },
  button: {
    color: theme.button,
  },

  planilhaHeader: {
    flexDirection: 'row',
    backgroundColor: theme.backgroundCard,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  planilhaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planilhaBox: {
    width: Dimensions.get('window').width / 2 - 18,
    height: 55,
    alignItems: 'center',
    backgroundColor: theme.backgroundCard,
    marginBottom: 5,
    justifyContent: 'center',
    ...theme.shadow,
  },
  planilhaHeaderText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },

  planilhaFont: {
    fontFamily: theme.font,
  },
  planilhaCardTitle: {
    color: theme.text,
    fontFamily: theme.font,
  },
  planilhaCardValue: {
    color: theme.primary,
    fontFamily: theme.font,
  },
});

export default styles;
