import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors, Metrics } from '../../Themes'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  sectionTitle : ApplicationStyles.sectionTitle,
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.charcoal,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  bubble: {
    flex: 1,
    backgroundColor: Colors.antidotePurple,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 0,
  },
  availability: {
    flex: 1,
    width: 100,
    alignItems: 'center',
    marginHorizontal: 0,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 0,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  availablityText: {
    // color: Colors.coal,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  availablityContainer: {
    borderWidth: 1,
    borderLeftColor: Colors.snow,
    borderRightColor: Colors.snow,
    borderBottomColor: Colors.snow,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  map: {
    // For Android :/
    ...StyleSheet.absoluteFillObject,
  }
})
