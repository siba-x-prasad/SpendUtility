import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, SectionList, Text, Alert, Image, TouchableOpacity, TextInput } from "react-native";
import styles from '../styles/globalStyles';
import AppTextInput from './AppInputText';
import AppButton from './AppButton';
import AppText from './AppText';
import Spinner from './Spinner';
import AppImage from './AppImage';
import ContainerView from './ContainerView';
import { Dimensions } from 'react-native';
const screenWidth = (Dimensions.get('window').width);

export default SplitGroupItemComponent = (props) => {

    const backgroundColor = false ? "green" : "#726669";
    const message = props.item.status == 1 ? 'Owes you ₹' + props.item.amount : 'You Owe ₹' + props.item.amount;
    const textColor = props.item.status == 1 ? '#1F9370' : 'red';

    return (
        <View style={{ flexDirection: 'column', padding: 5, backgroundColor: backgroundColor, width: screenWidth, margin: 0.5 }}>
            <View style={{ flexDirection: 'row', backgroundColor: backgroundColor, width: screenWidth - 10 }}>
                <View style={{ flex: 4 }}>
                    <Text style={{ ...styles.title, flex: 3, padding: 0, color: 'white', fontWeight: 'bold', fontSize: 18 }}> {props.item.expenseName} </Text>

                    <Text style={{ ...styles.title, flex: 2, padding: 0, color: 'white', fontSize: 12 }}> {props.item.message} </Text>

                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ ...styles.title, flex: 2, padding: 0, color: textColor, fontSize: 14 }}> {props.item.status == 1} {message} </Text>
                    <Text style={{ ...styles.title, padding: 0, color: 'white', fontSize: 12 }}> {props.item.date} </Text>
                </View>

                <View style={{ flex: 2, flexDirection: 'row', end: 0, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <AppImage
                        imagestyle={{ flex: 1, height: 30, width: 30, end: 30, alignSelf: 'center', tintColor: 'white' }}
                        onClick={() => props.onEditClick(props.item)}
                        path={require('../../assets/edit.png')}
                    />

                    <AppImage
                        imagestyle={{ flex: 1, height: 30, width: 30, end: -10, alignSelf: 'center', tintColor: 'white' }}
                        onClick={() => props.onDeleteClick(props.item)}
                        path={require('../../assets/icon_remove.png')}
                    />
                </View >

            </View>
            {/* <View style={{ backgroundColor: 'blue', height: 1, width: Dimensions.get('window').width - 10, }}></View> */}
        </View>

    );
};

const internalStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width - 10,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        margin: 2,
    },
    cardContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
    },
    image: {
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "red",
        alignSelf: 'center'
    },
    smallImage: {
        justifyContent: 'center',
        width: 40,
        height: 40,
        overflow: "hidden",
        marginHorizontal: 3
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        width: '98%',
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: '#d3d3d3',
    },
    titleEnabled: {
        flex: 1,
        fontSize: 20,
        borderColor: 'green',
        borderWidth: 1,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'green',
        textAlign: 'center',
        alignSelf: 'center',
    },
    titleDisabled: {
        flex: 1,
        fontSize: 20,
        borderColor: '#808080',
        borderWidth: 1,
        color: 'white',
        backgroundColor: '#808080',
        textAlign: 'center',
        alignSelf: 'center',
    },
    textEnabled: {
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 5,
        textAlignVertical: 'center',
    }
});