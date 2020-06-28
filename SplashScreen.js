import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';

const wait_time = 7000;

export default class splashScreen extends React.Component {
  componentDidMount() {
    // When mounted, wait 7 seconds, then navigate to Register
    setTimeout(() => {

      this.props.navigation.navigate('Register');
    }, wait_time);
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 18, color: "blue", textAlign: 'center', marginBottom: 15 }}>Log in and start adding your sport exercises!</Text>
        <ImageBackground source={require('./assets/sports2.png')} style={{ width: '100%', height: '70%' }}>

        </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  TouchableStyle: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  Texts: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    justifyContent: 'center'
  },
  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    borderRadius: 5,

  }

});