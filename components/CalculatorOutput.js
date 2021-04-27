import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class CalculatorOutput extends React.Component {
    static Props = {
        output: ""
    }

    render() {

        return (

            <View style={styles.container}>
                <Text style={[styles.output, {fontSize: this.props.digitSize}]}>{this.props.output}</Text>
            </View>

        );
        
    }
}

const styles = StyleSheet.create({

    container: {
        borderWidth: 5,
        paddingTop: 10,
        padding: 15
    },

    output: {
        textAlign: "right",
        color: "white"
    }

})