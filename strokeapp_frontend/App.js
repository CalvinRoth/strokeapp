import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation'; 
import { Camera, Permissions } from 'expo';

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
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        QStroke
        </Text>
        <Text style={styles.paragraph}>
         <Image
         style={{width: 90, height: 90}}
         source={require('./camera.png')}
         />
        </Text>
        <TouchableHighlight
         style={styles.button}
         onPress={() => this.props.navigation.navigate('CameraTest')}
        >
         <Text style={styles.buttontext}> CAMERA TEST </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class CameraTestScreen extends React.Component {
  takePicture = () => {
      if (this.camera) {
          this.camera.takePictureAsync({base64: true})
              .then((data) => {
                this.props.navigation.navigate('CameraTestResult', data.base64);
              })
      }
  }


  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {
            this.camera = ref;
          }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                        onPress={this.takePicture}
                        style={{ alignSelf: 'center' }}
                      >

                      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}TAKE PICTURE{' '}
                </Text>
              </TouchableOpacity>
              </View>
          </Camera>
        </View>
      );
    }
  }
}

class CameraTestResultScreen extends React.Component {
  static navigationOptions = {
    title: '',
    header: null
  };

  render() {
  const base64 = this.props.navigation.state.params;
  console.log(base64);

fetch('URL HERE', {
  method: 'POST'})
    .then((response) => alert(response.json()))
    .catch((error) => {
      console.error(error);
    });

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        QStroke
        </Text>
        <Text style={styles.paragraph}>
        </Text>
         <Text style={styles.buttontext}> Result here </Text>
         <Text style={styles.buttontext}> Image here </Text>
      </View>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen,
    CameraTest: CameraTestScreen,
    CameraTestResult: CameraTestResultScreen,
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
  },
  preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  color: '#000',
  padding: 10,
  margin: 40
}

});
