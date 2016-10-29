import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import { calculateRegion } from '../Lib/MapHelpers'
import MapCallout from '../Components/MapCallout'
import Styles from './Styles/MapviewExampleStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import HelpActions from '../Redux/HelpRedux'
/* ***********************************************************
* IMPORTANT!!! Before you get started, if you are going to support Android,
* PLEASE generate your own API key and add it to android/app/src/main/AndroidManifest.xml
* We've included our API key for demonstration purposes only, and it will be regenerated from
* time to time. As such, neglecting to complete this step could potentially break your app in production!
* https://console.developers.google.com/apis/credentials
* Also, you'll need to enable Google Maps Android API for your project:
* https://console.developers.google.com/apis/api/maps_android_backend/
*************************************************************/

class MapviewExample extends React.Component {
  /* ***********************************************************
  * This example is only intended to get you started with the basics.
  * There are TONS of options available from traffic to buildings to indoors to compass and more!
  * For full documentation, see https://github.com/lelandrichardson/react-native-maps
  *************************************************************/
  state = {
    initialPosition: 'unknown',
    region: {
      latitude: 0,
      longitude: 0,
      longitudeDelta : 0.01,
      latitudeDelta : 0.01
    },
    dropPoint: {},
    lastPosition: 'unknown',
  };
  watchID: ?number = null;
  constructor (props) {
    super(props)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        
        const longitudeDelta = 0.2;
        const latitudeDelta = 0.2;
        this.setState({
          initialPosition: {
            latitude,
            longitude,
          },
          dropPoint: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          }
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      const longitudeDelta = 0.01;
      const latitudeDelta = 0.01;
      if (latitude !== this.props.latitude && longitude !== this.props.longitude) {
        this.props.getAddress(latitude, longitude);
      } 
      this.setState({
        initialPosition: {
          latitude,
          longitude,
        },
        dropPoint: {
          latitude,
          longitude,
        },
        region: {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }
      });
    });

    this.state = {
      showUserLocation: true
    }
    this.renderMapMarkers = this.renderMapMarkers.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.requestHelp = this.requestHelp.bind(this)
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }



  onRegionChange ({latitude, longitude, latitudeDelta, longitudeDelta}) {
    this.props.getAddress(latitude, longitude);
    this.setState({
      dropPoint: {latitude, longitude},
      region: {latitude, longitude, latitudeDelta, longitudeDelta}
    })
  }
  calloutPress (location) {
    /* ***********************************************************
    * STEP 5
    * Configure what will happen (if anything) when the user
    * presses your callout.
    *************************************************************/
    console.tron.log(location)
  }

  renderMapMarkers (location) {
    /* ***********************************************************
    * STEP 6
    * Customize the appearance and location of the map marker.
    * Customize the callout in ../Components/MapCallout.js
    *************************************************************/
    if (!location) return <View />;
    return (
      <MapView.Marker key={location.title} coordinate={{latitude: location.latitude, longitude: location.longitude}}>
      </MapView.Marker>
    )
  }
  requestHelp () {
    NavigationActions.requestHelp();
  }

  render () {
    return (
      <View style={Styles.container}>
        <MapView
            style={Styles.map}
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChange}
            showsUserLocation={this.state.showUserLocation}
            zoomEnabled={true}
            rotateEnabled={false}
            pitchEnabled={false}
          >
            {this.renderMapMarkers(this.state.dropPoint)}
        </MapView>
        <View style={{
            borderWidth:1,
            borderColor: "#000000",
            padding: 20,
            backgroundColor: "#FFFFFF",
            width: 200
          }}>
            <Text style={{color: "#000000"}}>{this.props.address}</Text>
          </View>
        <View style={Styles.buttonContainer}>

          <TouchableOpacity
            onPress={this.requestHelp}
            style={[Styles.bubble, Styles.button]}
          >
            <Text style={Styles.buttonText}>Request Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
   address: state.help.address,
   lat: state.help.lat,
   long: state.help.long,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAddress: (lat,long) =>   dispatch(HelpActions.locationRequest(lat,long))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapviewExample)
