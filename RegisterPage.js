import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

export default class RegisterPage extends Component {

    constructor(props) {

        super(props)
        this.state = {

            UserName: '',
            UserPassword: '',
            Name: '',
        }
    }

    registrationFunction = () => {

        const { UserName } = this.state;
        const { UserPassword } = this.state;
        const { Name } = this.state;

        if (this.state.UserName.length === 0) {
            return Alert.alert(
                'Alert',
                'Please enter your username',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed!') },
                ],
                { cancelable: false }
            );
        }
        else if (this.state.UserPassword.length === 0) {
            return Alert.alert(
                'Alert',
                'Please enter password',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed!') },
                ],
                { cancelable: false }
            );
        }
        else if (this.state.Name.length === 0) {
            return Alert.alert(
                'Alert',
                'Please enter your name',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed!') },
                ],
                { cancelable: false }
            );
        }
        else {

            fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&lisaa', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    username: UserName,
                    password: UserPassword,
                    name: Name,
                    info: "New user"

                })

            }).then((response) => response.text())
                .then((responseData) => {

                    Alert.alert(
                        "Registration Alert",
                        responseData
                    )

                }).catch((error) => {
                    console.error(error);
                });
        }
    }
    render() {
        return (

            <View style={styles.MainContainer}>

                <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>User registration form</Text>

                <TextInput
                    placeholder="Enter username"
                    onChangeText={UserName => this.setState({ UserName })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <TextInput
                    placeholder="Enter user password"
                    onChangeText={UserPassword => this.setState({ UserPassword })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                />

                <TextInput
                    placeholder="Enter your full name"
                    onChangeText={Name => this.setState({ Name })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <Button title="Register account" onPress={this.registrationFunction} color="#2196F3" />
                <Button title="To login page" onPress={() => this.props.navigation.navigate('Login')} color="black" />
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

    TextInputStyleClass: {

        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#2196F3',

        // Set border Radius.
        borderRadius: 5,

        // Set border Radius.
        //borderRadius: 10 ,
    }
});