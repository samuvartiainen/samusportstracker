import React, { Component } from 'react';
import { Modal, TouchableHighlight, StyleSheet, TextInput, View, Alert, Button, Text, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export default class appInformation extends Component {

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.row}>
                    <Text style={styles.headlines1}>ID</Text>
                    <Text style={styles.headlines2}>Vaatimus</Text>
                    <Text style={styles.headlines3}>Toteutettu</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>1</Text></View>
                    <View style={styles.listItems2}><Text>Käyttäjän rekisteröinti</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>2</Text></View>
                    <View style={styles.listItems2}><Text>Sisäänkirjautuminen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>3</Text></View>
                    <View style={styles.listItems2}><Text>Salasanan muuttaminen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>4</Text></View>
                    <View style={styles.listItems2}><Text>Uloskirjautuminen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>5</Text></View>
                    <View style={styles.listItems2}><Text>Splash screen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>6</Text></View>
                    <View style={styles.listItems2}><Text>Suoritusten listanäkymä</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>7</Text></View>
                    <View style={styles.listItems2}><Text>Suorituksen lisääminen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>8</Text></View>
                    <View style={styles.listItems2}><Text>Suorituksen muokkaaminen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>9</Text></View>
                    <View style={styles.listItems2}><Text>Suorituksen poistaminen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>10</Text></View>
                    <View style={styles.listItems2}><Text>Logon lisääminen suoritukseen</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>11</Text></View>
                    <View style={styles.listItems2}><Text>Valokuvan lisääminen suoritukselle</Text></View>
                    <View style={styles.listItems3}><Text>EI</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>12</Text></View>
                    <View style={styles.listItems2}><Text>Sovelluksessa on useita välilehtiä</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>13</Text></View>
                    <View style={styles.listItems2}><Text>Omien tietojen muuttaminen asetuksissa</Text></View>
                    <View style={styles.listItems3}><Text>KYLLÄ</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.listItems1}><Text>14</Text></View>
                    <View style={styles.listItems2}><Text>Lajien lataaminen serveriltä</Text></View>
                    <View style={styles.listItems3}><Text>EI</Text></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'flex-start',
        flex: 1,
        margin: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    headlines1: {
        width: '10.0%',
        fontWeight: "bold"
    },
    listItems1: {
        width: '10.0%',
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 4,
    },
    headlines2: {
        width: '65.0%',
        fontWeight: "bold"
    },
    listItems2: {
        width: '65.0%',
        backgroundColor: '#fff',
    },
    headlines3: {
        width: '25.0%',
        fontWeight: "bold"
    },
    listItems3: {
        width: '25.0%',
        backgroundColor: '#fff',
    }
});
