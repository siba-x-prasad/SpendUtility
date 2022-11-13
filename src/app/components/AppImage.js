import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";


const AppImage = (props) => {
    return (
        <TouchableOpacity style={{ position: 'absolute', end: 0 }} onPress={props.onClick}>
            <Image
                style={[internalStyles.smallImage, props.imagestyle]}
                source={props.path}
            />
        </TouchableOpacity>
    );
};

export default AppImage;

const internalStyles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    image: {
        width: 50,
        height: 50,
    },
    smallImage: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        overflow: "hidden",
        marginHorizontal: 10,
    }
});