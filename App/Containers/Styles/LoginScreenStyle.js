import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.background
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1, 
    borderColor: Colors.antidotePurple, 
    borderRadius: 0
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.antidotePurple,
    paddingTop: 18,
    paddingBottom: 18,
  },
  loginButtonRight: {
    flex: 1,
    borderRightWidth: 0,
    backgroundColor: Colors.antidotePurple,
    paddingTop: 18,
    paddingBottom: 18,
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver,
    fontSize: 14,
    fontWeight: 'bold',
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 50,
    marginBottom: 50,
  },
})
