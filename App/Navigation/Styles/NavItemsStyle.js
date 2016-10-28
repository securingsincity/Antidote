import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  navButtonLeft: {
    marginLeft: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    width: Metrics.icons.logo,
    color: Colors.white
  },
  navButtonLeftLong: {
    marginLeft: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    width: 200,
    fontSize: 16,
    color: Colors.white
  }
})
