require("./../library/swisscalc.lib.format.js");
require("./../library/swisscalc.lib.operator.js");
require("./../library/swisscalc.lib.operatorCache.js");
require("./../library/swisscalc.lib.shuntingYard.js");
require("./../library/swisscalc.calc.calculator.js");
require("./../library/swisscalc.display.memoryDisplay.js");
require("./../library/swisscalc.display.numericDisplay.js");

import React from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import {Button} from './../components/';
import {CalculatorOutput} from './../components';

export default class CalculatorScreen extends React.Component {

    constructor(props){

        super(props);

        //The output display on the calculator
        this.state = {
            output: "0",
            digitSize: 80
        }

        //Initializing swiss calculator https://github.com/ericmorgan1/swisscalc-lib
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        //Initialize pan responder for backspace swipe functionality https://reactnative.dev/docs/panresponder
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (Math.abs(gestureState.dx) >= 50) {
                    this.onBackspace();
                }
            }
        })

    }

    //When a digit is pressed (1 2 3 4 5 6 7 8 9 0)
    onDigit = (digitPressed) => {

        this.calc.addDigit(digitPressed);
        this.checkDigits();
        this.setState({ output : this.calc.getMainDisplay() });

    }

    //When clear is pressed (c)
    onClear = () => {

        this.calc.clear();
        this.setState({ output: "0"});

    }

    //When a binary operator (+ - x /) is pressed
    onBinaryOperator = (operator) => {

        this.calc.addBinaryOperator(operator);
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //When an unary operator (%) is pressed
    onUnaryOperator = (operator) => {

        this.calc.addUnaryOperator(operator);
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //When negation is pressed (+/-)
    onNegate = () => {

        this.calc.negate();
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //When equals is pressed (=)
    onEquals = () => {
        this.calc.equalsPressed();
        this.checkDigits();

        this.setState({ output: this.calc.getMainDisplay() });

    }

    //When swiping left or right for backspace
    onBackspace = () => {

        this.calc.backspace();
        this.setState({ output: this.calc.getMainDisplay() });

    }

    //Decrease output fontSize if number of digits on screen are 7 or more, but fewer than 9
    checkDigits = () => {

        //Gets the number of characters (, included)
        var outputLength = this.calc.getMainDisplay().length;
        var fontDecrease = 0;

        //Decrease fontSize of digits if number of characters in output exceed 7 but are fewer than 11
        if (outputLength > 7 && outputLength != 11){

            fontDecrease = ((outputLength-7)*4);
            this.setState({ digitSize: (this.state.digitSize-fontDecrease)});

        }

        //If number of characters don't exceed 7, fontSize should be 80
        else if (outputLength < 7) {

            this.setState({ digitSize: 80});

        }

    }

    //Rendering the calculator screen
    render() {

        return (
            
            <View style={styles.container}>

                <View style={styles.outputContainer} {...this.panResponder.panHandlers}>
                    <CalculatorOutput output={this.state.output} digitSize={this.state.digitSize}/>
                </View>

                <View style={styles.inputContainer}>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onClear()}} icon="AC" iconColor="black" backgroundColor="#A5A5A5"/>
                        <Button  onPress= {() => {this.onNegate()}} icon="+/-" iconColor="black" backgroundColor="#A5A5A5"/>
                        <Button  onPress= {() => {this.onUnaryOperator(this.oc.PercentOperator)}} icon="%" iconColor="black" backgroundColor="#A5A5A5"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.DivisionOperator)}} icon="÷" iconColor="white" backgroundColor="#FE9F0A"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("7")}} icon="7" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onDigit("8")}} icon="8" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onDigit("9")}} icon="9" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.MultiplicationOperator)}} icon="x" iconColor="white" backgroundColor="#FE9F0A"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("4")}} icon="4" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onDigit("5")}} icon="5" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onDigit("6")}} icon="6" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.SubtractionOperator)}} icon="-" iconColor="white" backgroundColor="#FE9F0A"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("1")}} icon="1" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onDigit("2")}} icon="2" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onDigit("3")}} icon="3" iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onBinaryOperator(this.oc.AdditionOperator)}} icon="+" iconColor="white" backgroundColor="#FE9F0A"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button  onPress= {() => {this.onDigit("0")}} icon="0" iconColor="white" backgroundColor="#333333" style={{flex:2}}/>
                        <Button  onPress= {() => {this.onDigit(".")}} icon="." iconColor="white" backgroundColor="#333333"/>
                        <Button  onPress= {() => {this.onEquals()}} icon="=" iconColor="white" backgroundColor="#FE9F0A"/>
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
        flex: 1,
        paddingBottom: 65
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