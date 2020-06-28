import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

export default class pwChangePage extends Component {

    constructor(props) {

        super(props)
        this.state = {

            UserName: '',
            OldPassword: '',
            NewPassword1: '',
            NewPassword2: ''

        }
    }

    ChangePwFunction = () => {

        const { UserName } = this.state;
        const { OldPassword } = this.state;
        const { NewPassword1 } = this.state;
        const { NewPassword2 } = this.state;

        fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&vaihdasalasana', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username: UserName,
                old_pw: OldPassword,
                new_pw1: NewPassword1,
                new_pw2: NewPassword2
            })

        }).then((response) => response.text())
            .then((responseData) => {

                Alert.alert(
                    "Password changed",
                    responseData
                )

            }).catch((error) => {
                console.error(error);
            });

    }


    render() {
        return (

            <View style={styles.MainContainer}>

                <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Password change form</Text>
                <TextInput
                    placeholder="Username"
                    onChangeText={UserName => this.setState({ UserName })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Old password"
                    onChangeText={OldPassword => this.setState({ OldPassword })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder="New password"
                    onChangeText={NewPassword1 => this.setState({ NewPassword1 })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder="Confirm new password"
                    onChangeText={NewPassword2 => this.setState({ NewPassword2 })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                />

                <Button title="Change password" onPress={this.ChangePwFunction} color="green" />
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