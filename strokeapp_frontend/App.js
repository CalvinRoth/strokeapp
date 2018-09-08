import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation'; 
// import Camera from 'react-native-camera';
// import CameraRoute from './CameraRoute';
import CameraExample from './CameraExample';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '',
  	header: null //this will hide the header
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        QStroke
        </Text>
        <Text style={styles.paragraph}>
          We will be performing a series of tests to determine if you are a victim of a stroke. Please do not exit this app until the diagnostic is complete.
        </Text>
        <TouchableHighlight
         style={styles.button}
         onPress={() => this.props.navigation.navigate('Camera')}
        >
         <Text style={styles.buttontext}> OK </Text>
        </TouchableHighlight>
      </View>
    );
  }
}


class CameraScreen extends React.Component {
	static navigationOptions = {
    title: '',
  	header: null //this will hide the header
  };
  constructor(props){
    super(props);
    this.state = {
      showCamera : false
    }
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(){
    this.setState({showCamera: !this.state.showCamera});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        QStroke
        </Text>
        <Text style={styles.paragraph}>
         {/* <Image
         style={{width: 90, height: 90}}
         source={require('./camera.png')}
         /> */}
         {/* <CameraRoute showCamera = {this.state.showCamera}/> */}
         <CameraExample showCamera = {this.state.showCamera}/>
        </Text>
        <TouchableHighlight
         style={styles.button}
         onPress={this.handlePress}
        >
         <Text style={styles.buttontext}> CAMERA TEST </Text>
        </TouchableHighlight>
      </View>
    );
  }
}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,

  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  button: {    
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  buttontext: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16
  }
});