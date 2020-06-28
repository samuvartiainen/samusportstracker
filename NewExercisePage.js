import React, { Component } from 'react';
import { Modal, TouchableHighlight, Picker, Image, List, ListItem, Thumbnail, StyleSheet, TextInput, View, Alert, Button, Text, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-ionicons';
import { Ionicons } from '@expo/vector-icons';
import { CustomPicker } from 'react-native-custom-picker';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

export default class newExercisePage extends Component {

  constructor(props) {

    super(props)
    this.state = {

      addUserName: this.props.navigation.state.params.paramUserName,
      addSport: '',
      addDate: '',
      addDuration: '',
      addTrip: '',
      addComment: '',
      selectedLogo: ''
    }
  }

  AddExerciseFunction = () => {

    if (this.state.addSport.length === 0) {

      return Alert.alert(
        'Alert',
        'Please enter sport',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ],
        { cancelable: false }
      );
    }
    else if (this.state.addDate.length === 0) {
      return Alert.alert(
        'Alert',
        'Please enter date',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ],
        { cancelable: false }
      );
    }
    else if (this.state.addDuration.length === 0 && this.state.addTrip.length === 0) {
      return Alert.alert(
        'Alert',
        'Please enter duration/trip or both',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ],
        { cancelable: false }
      );
    }
    else {
      const { addUserName } = this.state;
      const { addSport } = this.state;
      const { addDate } = this.state;
      const { addDuration } = this.state;
      const { addTrip } = this.state;
      const { addComment } = this.state;
      const { selectedLogo } = this.state;

      fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&uusisuoritus', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          username: addUserName,
          sport: addSport,
          date: addDate,
          duration: addDuration,
          trip: addTrip,
          comment: addComment,
          logo: selectedLogo
        })

      }).then((response) => response.text())
        .then((responseData) => {

          Alert.alert(
            "Exercise alert",
            responseData,
            [
              { text: 'OK', onPress: () => this.props.navigation.navigate('Main') },
            ],
            { cancelable: false }
          );


        }).catch((error) => {
          console.error(error);
        });
    }
  }
  render() {
    const options = [
      {
        color: '#2660A4',
        label: 'One',
        value: 1,
        icon: "ios-american-football"
      },
      {
        color: '#FF6B35',
        label: 'Two',
        value: 2,
        icon: "ios-baseball"
      },
      {
        color: '#FFBC42',
        label: 'Three',
        value: 3,
        icon: "ios-basketball"
      },
      {
        color: '#AD343E',
        label: 'Four',
        value: 4,
        icon: "ios-football"
      },
      {
        color: '#051C2B',
        label: 'Five',
        value: 5,
        icon: "ios-tennisball"
      }
    ]

    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Add new exercise</Text>
        <TextInput
          placeholder="Add sport"
          onChangeText={addSport => this.setState({ addSport })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        /><TextInput
          placeholder="Add date"
          onChangeText={addDate => this.setState({ addDate })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="Add duration"
          onChangeText={addDuration => this.setState({ addDuration })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="Add trip"
          onChangeText={addTrip => this.setState({ addTrip })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="Add comment"
          onChangeText={addComment => this.setState({ addComment })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <CustomPicker
          placeholder={'Select logo'}
          options={options}
          getLabel={item => item.label}
          fieldTemplate={this.renderField}
          optionTemplate={this.renderOption}
          footerTemplate={this.renderFooter}
          defaultValue='Pick a logo'
          onValueChange={picked => this.setState({ selectedLogo: picked.icon })}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttons}><Button title="Back to exercises" onPress={() => this.props.navigation.navigate('Main')} color="#2196F3" /></View>
          <View style={styles.buttons}><Button title="Save" onPress={this.AddExerciseFunction} color="green" /></View>
        </View>
      </View>
    )
  }

  renderFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={() => {
          Alert.alert('Close Dropdown',
            [
              { text: 'OK', onPress: () => action.close.bind(this) }
            ]
          )
        }
        }>
      </TouchableOpacity>
    )
  }

  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={{ alignItems: "center" }}>
              <Text>Add logo: </Text><Ionicons name={selectedItem.icon} size={32} color="blue" />
              <TouchableOpacity style={styles.clearButton} onPress={clear}>
                <Text style={{ color: 'black' }}>Clear</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }

  renderOption(settings) {
    const { item, getLabel } = settings
    return (
      <View style={styles.optionContainer}>

        <Ionicons name={item.icon} size={32} color="blue" />

      </View>
    )
  }

}

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  buttons: {
    width: '50%',
    justifyContent: 'center',
    height: 40,
  },
  container: {
    alignItems: 'center'
  },
  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center'
  },
  clearButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    marginRight: 10,
    padding: 5
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  optionContainer: {
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
});