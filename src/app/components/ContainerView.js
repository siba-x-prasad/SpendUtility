import React from "react";
import { StyleSheet, SafeAreaView, Text, StatusBar, Appearance, View } from 'react-native';
import { Dimensions } from 'react-native';


// https://stackoverflow.com/questions/48394951/add-style-from-props-to-existing-component-styles-in-react-native
// {[styles.base, styles.background]}
// <button style={{...styles.panel.button,...styles.panel.backButton}}>Back</button>

const screenWidth = (Dimensions.get('window').width);
const screenHeight = (Dimensions.get('window').height);
const ContainerView = (props) => {
    const isDark = Appearance.getColorScheme() === 'dark'
    return (
        <View style={[isDark ? styleInternal.containerDark : styleInternal.containerLight, props.viewStyle]}>
            {props.children}
        </View>
    );
};

const styleInternal = StyleSheet.create({
    boxContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        height: 200,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        alignContent: 'center',
    },
    containerLight: {
        flex : 1,
        width : screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
    },
    containerDark: {
        flex : 1,
        width : screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#808080',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#1F9370',

    },
    button: {
        width: 200,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f01d71'
    },
    buttonTextEnabled: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonTextDisabled: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 20,
        color: "red",
        marginLeft: -80,
    }
});

export default ContainerView;