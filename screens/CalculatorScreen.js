require("./../library/swisscalc.lib.format.js");
require("./../library/swisscalc.lib.operator.js");
require("./../library/swisscalc.lib.operatorCache.js");
require("./../library/swisscalc.lib.shuntingYard.js");
require("./../library/swisscalc.calc.calculator.js");
require("./../library/swisscalc.display.memoryDisplay.js");
require("./../library/swisscalc.display.numericDisplay.js");

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from './../components/';
import {CalculatorOutput} from './../components';

export default class CalculatorScreen extends React.Component {

    constructor(props){

        super(props);

        //The output display on the calculator
        this.state = {
            output: "",
            digitSize: 80
        }

        //Initializing swiss calculator
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

    }

    //When a digit is pressed (1 2 3 4 5 6 7 8 9 0)
    onDigit = (digitPressed) => {

        this.calc.addDigit(digitPressed);
        this.checkDigits()
        this.setState({ output : this.calc.getMainDisplay() });

    }

    //When clear is pressed (c)
    onClear = () => {

        this.calc.clear();
        this.checkDigits()
        this.setState({ output: ""});

    }

    //When a binary operator (+ - x /) is pressed
    onBinaryOperator = (operator) => {

        this.calc.addBinaryOperator(operator);
        this.checkDigits()
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //When an unary operator (%) is pressed
    onUnaryOperator = (operator) => {

        this.calc.addUnaryOperator(operator);
        this.checkDigits()
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //When negation is pressed (+/-)
    onNegate = () => {

        this.calc.negate();
        this.checkDigits()
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //When equals is pressed (=)
    onEquals = () => {

        this.calc.equalsPressed();
        this.checkDigits()
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //Decrease output fontSize if number of digits on screen are 7 or more, but fewer than 9
    checkDigits = () => {

        var outputLength = this.calc.getMainDisplay().length;

        if (outputLength > 7 && outputLength < 11){

            this.setState({ digitSize: (this.state.digitSize-13)});

        }
        else if (outputLength < 11) {

            this.setState({ digitSize: 80});

        }

        console.log(outputLength);

    }

    //Rendering the calculator screen
    render() {

        return (
            
            <View style={styles.container}>

                <View style={styles.outputContainer}>
                
                    <CalculatorOutput output={this.state.output} digitSize={this.state.digitSize}/>
            
                </View>

                <View style={styles.inputContainer}>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onClear()}} icon="c" iconColor="black" backgroundColor="#D4D4D2"/>
                        <Button  onPress= {() => {this.onNegate()}} icon="+/-" iconColor="black" backgroundColor="#D4D4D2"/>
                        <Button  onPress= {() => {this.onUnaryOperator(this.oc.PercentOperator)}} icon="%" iconColor="black" backgroundColor="#D4D4D2"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.DivisionOperator)}} icon="/" iconColor="white" backgroundColor="#FF9500"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("7")}} icon="7" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onDigit("8")}} icon="8" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onDigit("9")}} icon="9" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.MultiplicationOperator)}} icon="x" iconColor="white" backgroundColor="#FF9500"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("4")}} icon="4" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onDigit("5")}} icon="5" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onDigit("6")}} icon="6" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.SubtractionOperator)}} icon="-" iconColor="white" backgroundColor="#FF9500"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("1")}} icon="1" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onDigit("2")}} icon="2" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onDigit("3")}} icon="3" iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.AdditionOperator)}} icon="+" iconColor="white" backgroundColor="#FF9500"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("0")}} icon="0" iconColor="white" backgroundColor="#505050" style={{flex:2}}/>
                        <Button  onPress= {() => {this.onDigit(".")}} icon="." iconColor="white" backgroundColor="#505050"/>
                        <Button  onPress= {() => {this.onEquals()}} icon="=" iconColor="white" backgroundColor="#FF9500"/>
                    </View>

                </View>

            </View>

        );

    }

}

const styles = StyleSheet.create({

    container: {
        borderWidth: 5,
        backgroundColor: "black",
        flex: 1
    },

    outputContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },

    buttonContainer: {
        margin: 2,
        flexDirection: "row",
        justifyContent: "space-between"
    }

})