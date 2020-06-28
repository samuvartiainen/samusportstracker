import React, { Component } from 'react';
import { Modal, TouchableHighlight, StyleSheet, TextInput, View, Alert, Button, Text, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-ionicons'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Ionicons } from '@expo/vector-icons';
import { CustomPicker } from 'react-native-custom-picker';
import { StackNavigator } from 'react-navigation';

export default class mainPage extends Component {

    constructor(props) {

        super(props)
        this.state = {
           
            UserName: this.props.navigation.getParam('uName', ''),
            dataSource: [],
            visibleInputs: false,
            visibleTexts: true,
            modalVisible: false,
            allowDelete: false,
            sport: '',
            date: '',
            duration: '',
            trip: '',
            comment: '',
            logo: '',
            exerciseId: '',
            editedSport: '',
            editedDate: '',
            editedDuration: '',
            editedTrip: '',
            editedComment: '',
            exerciseId2: '',
            exerciseId3: '',
            selectedLogo: ''
        }

        globalThis.user = this.state.UserName;
    }

    LogOutFunction = () => {

        const { UserName } = this.state;

        fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&ulos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username: UserName
            })

        }).then((response) => response.text())
            .then((responseData) => {

                this.props.navigation.navigate('Login'); // send user to login page

            }).catch((error) => {
                console.error(error);
            });

    }
    FetchExercisesFunction = () => {

        const { UserName } = this.state;

        fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&hae', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username: UserName
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataSource: responseJson
                });
                /* Alert.alert(
                    "Fetched exercises -> ",
                    JSON.stringify(data)
                )
                */
            }).catch((error) => {
                console.error(error);
            });

    }

    editButtonFunction = () => {

        this.setModalVisible(!this.state.modalVisible);

        this.props.navigation.navigate('EditExercise', {
            username: this.state.UserName,
            edSport: this.state.sport,
            edDate: this.state.date,
            edDuration: this.state.duration,
            edTrip: this.state.trip,
            edComment: this.state.comment,
            edLogo: this.state.logo,
            edId2: this.state.exerciseId2
        }
        ); // Send user to EditExercisePage and pass the values to edit
    }

    deleteButtonFunction = () => {
        const { exerciseId3 } = this.state;
        Alert.alert(
            "Delete alert",
            "Delete exercise permanently?",
            [
                { text: 'Cancel', onPress: () => console.log('Canceled') },
                {
                    text: 'YES', onPress: () => {
                        fetch('http://192.168.100.10:8081/db/db.php?mode=JSON&poistasuoritus', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({

                                id2: exerciseId3
                            })

                        }).then((response) => response.text())
                            .then((responseData) => {

                                this.setState({ modalVisible: false, visibleInputs: false, visibleTexts: true });

                            }).catch((error) => {
                                console.error(error);
                            });


                    }
                },
            ],
            { cancelable: false }
        );
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    _renderItem = ({ item }) => (

        <TouchableOpacity onPress={() => {
            this.setState({
                sport: item.laji,
                date: item.pvm,
                duration: item.kesto,
                trip: item.matka,
                comment: item.kommentti,
                logo: item.logoid,
                exerciseId: item.id,
                exerciseId2: item.id,
                exerciseId3: item.id
            });
            this.setModalVisible(true);
        }}>
            <View style={styles.row}>
                <Text style={styles.listItem}>{item.laji}</Text>
                <Text style={styles.listItem}>{item.pvm}</Text>
                <Text style={styles.listItem}>{item.kesto}</Text>
                <Text style={styles.listItem}>{item.matka} </Text>
                <Text style={styles.listItem}>{item.kommentti}</Text>
                <Ionicons style={styles.listItem} name={item.logoid} size={32} color="blue" />
            </View>
        </TouchableOpacity>

    );

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

            this.FetchExercisesFunction(),
            <View style={styles.MainContainer}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>

                    <View style={{ alignItems: "center" }}>
                        <Text>Sport: {this.state.sport}</Text>
                        <Text>Date: {this.state.date}</Text>
                        <Text>Duration: {this.state.duration}</Text>
                        <Text>Trip: {this.state.trip} </Text>
                        <Text>Comment: {this.state.comment}</Text>
                        <Text>Logo: </Text><Ionicons name={this.state.logo} size={32} color="blue" />
                        <View style={{ flexDirection: 'row' }}>
                            <                               View style={styles.buttons}>
                                <Button title="Edit" onPress={this.editButtonFunction} color="blue" /></View>
                            <View style={styles.buttons}>
                                <Button title="Delete" onPress={this.deleteButtonFunction} color="red" /></View>
                        </View>
                        <Button title="Close window" color="black" onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                            /></Button>
                    </View>

                </Modal>


                <View>
                    <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>Own exercises</Text>

                </View>
                <View style={styles2.MainContainer}>
                    <Text style={styles2.Texts} onPress={this.LogOutFunction} >Log out</Text>
                    <Text style={styles3.Texts} onPress={() => this.props.navigation.navigate('Settings', { paramUserName: this.state.UserName })}>{this.state.UserName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.headlines}>Sport</Text>
                    <Text style={styles.headlines}>Date</Text>
                    <Text style={styles.headlines}>Duration</Text>
                    <Text style={styles.headlines}>Trip</Text>
                    <Text style={styles.headlines}>Comment</Text>
                    <Text style={styles.headlines}>Logo</Text>
                </View>
                <FlatList data={this.state.dataSource} renderItem={this._renderItem} keyExtractor={(item, index) => item.id}></FlatList>
                <Button style={styles.newExerciseButton} title="Add new exercise" onPress={() => this.props.navigation.navigate('NewExercise', { paramUserName: this.state.UserName })} color="green" />
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#66d9ff'
    },
    odd: {
        backgroundColor: '#FFFFFF'
    },
    even: {
        backgroundColor: '#D7E2F8'
    },
    headlines: {
        width: '16.6666%',
        alignItems: 'center',
        fontWeight: "bold"
    },
    listItem: {
        width: '16.6666%',
        flex: 1,
        backgroundColor: '#66d9ff',
        marginBottom: 10,
        borderRadius: 4,
    },
    buttons: {
        width: '50%',
        justifyContent: 'space-between',
        height: 40
    },
    newExerciseButton: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 5,
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

const styles2 = StyleSheet.create({
    MainContainer: {
        ...StyleSheet.absoluteFillObject
    },
    Texts: {
        alignSelf: 'flex-end',
        marginTop: 0
    }
});
const styles3 = StyleSheet.create({
    MainContainer: {
        ...StyleSheet.absoluteFillObject
    },
    Texts: {
        alignSelf: 'flex-end',
        marginTop: 4,
        marginBottom: 4
    }
});