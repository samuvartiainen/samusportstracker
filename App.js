import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import Tabs from './TabNavigator';

const AppContainer = createAppContainer(Tabs);
export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
