import React, { Component } from 'react';
import { Modal, TouchableHighlight, Picker, Image, List, ListItem, Thumbnail, StyleSheet, TextInput, View, Alert, Button, Text, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-ionicons';
import { Ionicons } from '@expo/vector-icons';
import { CustomPicker } from 'react-native-custom-picker';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

export default class editExercisePage extends Component {

  constructor(props) {

    super(props);
    this.state = {

      UserName: this.props.navigation.state.params.username,
      addSport: '',
      addDate: '',
      addDuration: '',
      addTrip: '',
      addComment: '',
      selectedLogo: '',
      sport: this.props.navigation.state.params.edSport,
      date: this.props.navigation.state.params.edDate,
      duration: this.props.navigation.state.params.edDuration,
      trip: this.props.navigation.state.params.edTrip,
      comment: this.props.navigation.state.params.edComment,
      logo: this.props.navigation.state.params.edLogo,
      exerciseId: this.props.navigation.state.params.edId2
      
    }

    this.renderField = this.renderField.bind(this);
  }

  saveButtonFunction = () => {

    if (this.state.sport.length === 0 || this.state.date.length === 0) {
      return Alert.alert(
        'Alert',
        'Please enter sport and date',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ],
        { cancelable: false }
      );
    }
    else if (this.state.duration.length === 0 && this.state.trip.length === 0) {
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
      const { UserName } = this.state;
      const { sport } = this.state;
      const { date } = this.state;
      const { duration } = this.state;
      const { trip } = this.state;
      const { comment } = this.state;
      const { logo } = this.state;
      const { exerciseId } = this.state;
      fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&muokattusuoritus', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          Username: UserName,
          Sport: sport,
          Date: date,
          Duration: duration,
          Trip: trip,
          Comment: comment,
          Logo: logo,
          Id: exerciseId
        })

      }).then((response) => response.text())
        .then((responseData) => {

          Alert.alert(
            "Exercise save alert",
            responseData,
            [
              { text: 'OK', onPress: () => { this.setState({ modalVisible: false, visibleInputs: false, visibleTexts: true }) } },
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
        <View>
        <Text>Sport</Text>
        <TextInput
            defaultValue={this.state.sport} // previous values as defaultValue
            onChangeText={sport => this.setState({ sport })} // new values to different variable 
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <Text>Date</Text>
          <TextInput
            defaultValue={this.state.date}
            onChangeText={date => this.setState({ date })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <Text>Duration</Text>
          <TextInput
            defaultValue={this.state.duration}
            onChangeText={duration => this.setState({ duration })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <Text>Trip</Text>
          <TextInput
            defaultValue={this.state.trip}
            onChangeText={trip => this.setState({ trip })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <Text>Comment</Text>
          <TextInput
            defaultValue={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <CustomPicker
            defaultValue='0'
            options={options}
            getLabel={item => item.label}
            fieldTemplate={this.renderField}
            optionTemplate={this.renderOption}
            footerTemplate={this.renderFooter}
            onValueChange={picked => this.setState({ logo: picked.icon })} />

          <Button title="Save" onPress={this.saveButtonFunction} color="green" />
          <Button title="Cancel" onPress={() => this.props.navigation.navigate('Main')} color="black" />
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
    const { selectedItem, defaultText, getLabel, clear } = settings;
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Ionicons name={this.state.logo} size={32} color="blue" />}

          <View style={{ alignItems: "center" }}>
            <Text>Add logo: </Text><Ionicons name={this.state.logo} size={32} color="blue" />
            <TouchableOpacity style={styles.clearButton} onPress={clear}>
              <Text style={{ color: 'black' }}>Clear</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }

  renderOption(settings) {
    const { item, getLabel } = settings;
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
    width: '49%',
    justifyContent: 'space-between',
    height: 40,
    margin: 10
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