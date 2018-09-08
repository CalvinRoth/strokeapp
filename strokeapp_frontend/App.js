import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation'; 

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        QStroke
        </Text>
        <Text style={styles.paragraph}>
        *icon of a camera here*
        </Text>
        <TouchableHighlight
         style={styles.button}
         onPress={() => this.props.navigation.navigate('Speech')}
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