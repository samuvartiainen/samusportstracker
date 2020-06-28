import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';
<script src="RegisterPage.js" type="text/javascript"></script>
export default class loginPage extends Component {

    constructor(props) {

        super(props)
        this.state = {

            UserName2: '',
            UserPassword2: ''
        }
    }

    loginFunction = () => {

        const { UserName2 } = this.state;
        const { UserPassword2 } = this.state;

        fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&kirjaudu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username2: UserName2,
                password2: UserPassword2

            })

        }).then((response) => response.text())
            .then((responseData2) => {
                if (responseData2 == "allow") {
                    this.props.navigation.navigate('Main', { uName: UserName2 }); // Send user to MainPage and pass their username 
                }
                else {
                    Alert.alert(
                        "Login Alert",
                        "Wrong username/password"
                    )
                }
            }).catch((error) => {
                console.error(error);
            });

    }


    render() {
        return (

            <View style={styles.MainContainer}>

                <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Login page</Text>
                <TextInput
                    placeholder="Username"
                    onChangeText={UserName2 => this.setState({ UserName2 })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="password"
                    onChangeText={UserPassword2 => this.setState({ UserPassword2 })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                />

                <Button title="Login" onPress={this.loginFunction} color="blue" />
                <TouchableHighlight style={styles.TouchableStyle}
                    onPress={() => this.props.navigation.navigate('PwChange')}
                >
                    <Text style={styles.Texts}>Salasanan vaihto</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'flex-start',
        flex: 1,
        margin: 25
    },
    TouchableStyle: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    Texts: {
        color: 'red'
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