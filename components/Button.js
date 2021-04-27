import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as Font from 'expo-font';

export default class Button extends React.Component {

    static Props = {
        onPress: function() {},
        icon: "",
        iconColor: "",
        backgroundColor: "",
        style: {}
    }

    render() {

        return (

            <TouchableOpacity  onPress={this.props.onPress}
            style = {[styles.container, {backgroundColor: this.props.backgroundColor}, {...this.props.style}]} >
                <Text style={[styles.icon, {color: this.props.iconColor}]}> {this.props.icon}</Text>
            </TouchableOpacity>

        );

    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 85,
        borderRadius: 42.5,
        margin: 5,
    },

    icon: {
        fontSize: 40,
    }

})