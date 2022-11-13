import React from "react";
import { StyleSheet, View, Text, Appearance, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = (Dimensions.get('window').width);

const AppTextInput = (props) => {

    const [text, onChangeText] = React.useState('');
    const isDark = Appearance.getColorScheme() === 'dark'

    return (
        <View style={[styleInternal.screen, props.inputContainerStyle]}>
            <TextInput
               style={[isDark ? styleInternal.inputDark : styleInternal.inputLight, props.viewStyle]}
                keyboardType={props.keyboard}
                secureTextEntry={props.password}
                placeholderTextColor={isDark ? 'black' : 'white'}
                placeholder={props.hint}
                onChangeText={onChangeText}
                value={text}
            />
            {text == '' ? (
                <Text style={styleInternal.errorMessage}>
                    {props.errorMessage}
                </Text>
            ) : null}
        </View>
    )
}

const styleInternal = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        margin : 5,
        width: screenWidth,
    },
    inputDark: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        placeholderTextColor: "red",
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 6,
        color: '#000'
    },
    inputLight: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        placeholderTextColor: "white",
        backgroundColor: 'black',
        color: 'white',
        fontSize: 18,
        borderRadius: 6,
        flexDirection: 'row',
    },
    errorMessage: {
        width: '80%',
        fontSize: 10,
        color: "red",
        marginStart: 10,
    }
});

export default AppTextInput;