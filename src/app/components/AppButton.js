import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Appearance} from 'react-native';


// https://stackoverflow.com/questions/48394951/add-style-from-props-to-existing-component-styles-in-react-native
// {[styles.base, styles.background]}
// <button style={{...styles.panel.button,...styles.panel.backButton}}>Back</button>

const AppButton = (props) =>{
    // Appearance.getColorScheme() === 'dark'
    return (
        <TouchableOpacity style = {[ props.isEnabled ? styleInternal.containerEnabled : styleInternal.containerDisabled, props.buttonStyle]} onPress={props.onClick} >
           <Text style = {[ props.isEnabled ? styleInternal.buttonTextEnabled : styleInternal.buttonTextDisabled, props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styleInternal = StyleSheet.create({
    containerEnabled : {
        height : 50,
        paddingHorizontal : 10,
        display : 'flex',
        alignItems: 'center',
        justifyContent: 'center' ,
        margin : 10,
        backgroundColor : '#1F9370',
        borderColor : '#1F9370',
        borderWidth : 1,
        borderRadius : 5,
    },
    containerDisabled : {
        height : 50,
        paddingHorizontal : 10,
        display : 'flex',
        alignItems: 'center',
        justifyContent: 'center' ,
        margin : 10,
        backgroundColor : '#d3d3d3',
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 5,
    },
    container : {
        display : 'flex',
        alignItems: 'center',
        justifyContent: 'center' ,
        margin : 10,
        backgroundColor : '#1F9370',

    },
    button : {
        width: 200,
        borderRadius : 8,
        paddingVertical : 10,
        paddingHorizontal : 10,
        backgroundColor  : '#f01d71'
    },
    buttonTextEnabled : {
        color : 'white',
        textTransform : 'uppercase',
        fontSize : 16,
        textAlign : 'center'
    },
    buttonTextDisabled : {
        color : 'black',
        textTransform : 'uppercase',
        fontSize : 16,
        textAlign : 'center'
    },
    errorMessage: {
        fontSize: 20,
        color:"red",
        marginLeft:-80,
    }
});

export default AppButton;