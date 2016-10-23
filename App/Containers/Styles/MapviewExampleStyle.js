import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors, Metrics } from '../../Themes'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  sectionTitle : ApplicationStyles.sectionTitle,
  container: {
    flex: 1,
    backgroundColor: Colors.charcoal,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    // For Android :/
    ...StyleSheet.absoluteFillObject,
    marginBottom: Metrics.doubleBaseMargin,
  }
})
