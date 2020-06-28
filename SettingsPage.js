import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

export default class settingsPage extends Component {

    constructor(props) {

        super(props)
        this.state = {

            UserName: globalThis.user,
            // UserName: this.props.navigation.getParam('paramUserName', ''),
            // UserName: '',
            fullName: '',
            fullName2: '',
            height: '',
            weight: '',
            birthyear: '',
            dataSource: null,
            ready: false
        }

    }

    componentDidMount() {
        this.initializeSettings();
        // for re-rendering
        this.setState({ ready: true })
    }


    initializeSettings = () => {

        const { UserName } = this.state;
        const { fullName2 } = this.state;
        const { height } = this.state;
        const { weight } = this.state;
        const { birthyear } = this.state;
        fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&asetuksentiedot', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username: UserName,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                const first = responseJson[0];
                this.setState({
                    dataSource: responseJson
                });

                this.setState({
                    fullName2: first.nimi, height: first.pituus, weight: first.paino, birthyear: first.syntymavuosi
                })
                /*
                                Alert.alert(
                                    "Fetched exercises -> ",
                                    JSON.stringify(first)
                                );
                */
            }).catch((error) => {
                console.error(error);
            });

    }

    saveSettings = () => {

        const { UserName } = this.state;
        const { fullName2 } = this.state;
        const { height } = this.state;
        const { weight } = this.state;
        const { birthyear } = this.state;

        fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&tallenna_asetukset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                usernameS: UserName,
                fullnameS: fullName2,
                heightS: height,
                weightS: weight,
                birthyearS: birthyear

            })

        }).then((response) => response.text())
            .then((responseData) => {

                Alert.alert(
                    "Save alert",
                    responseData
                )

            }).catch((error) => {
                console.error(error);
            });

    }

    render() {
        if (this.state.ready == false) {
            return <View></View>
        }
        else {
            return (
                <View style={styles.MainContainer}>

                    <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Settings page</Text>
                    <Text>Name</Text><TextInput
                        defaultValue={this.state.fullName2}
                        onChangeText={fullName2 => this.setState({ fullName2 })}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <Text>Height</Text><TextInput
                        defaultValue={this.state.height}
                        onChangeText={height => this.setState({ height })}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <Text>Weight</Text><TextInput
                        defaultValue={this.state.weight}
                        onChangeText={weight => this.setState({ weight })}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <Text>Birth year</Text><TextInput
                        defaultValue={this.state.birthyear}
                        onChangeText={birthyear => this.setState({ birthyear })}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />

                    <Button title="Save" onPress={this.saveSettings} color="green" />
                </View>

            );
        }
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