
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, SectionList, Text, Alert, Image, TouchableOpacity, TextInput } from "react-native";
import { Redirect } from "react-router-native";
import styles from '../styles/globalStyles';
import AppTextInput from './AppInputText';
import AppButton from "./AppButton";
import AppText from "./AppText";
import Spinner from "./Spinner";
import AppImage from './AppImage';
import ContainerView from "./ContainerView";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { useNavigation } from '@react-navigation/native';

const CategorySectionList = (props) => {

    console.log('CategorySectionList Data is ' + props.data);

    const renderExpenseCategoryItem = ({ item }) => {

        const backgroundColor = "#726669";
        const textColor = "white"

        return (
            <View style={{ height: 50, justifyContent: 'center', backgroundColor: backgroundColor, width: screenWidth - 10, margin: 0.5 }}>

                <View style={{ flexDirection: 'row', flex: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ ...internalStyle.title, flex: 2, fontWeight: 'bold', color: textColor }}> {item.name} </Text>
                    <Text style={{ ...internalStyle.title, flex: 2, color: 'white' }}>  ₹ {item.amount} </Text>
                    <Text style={{ ...internalStyle.title, flex: 2, color: 'white' }}> {item.date.substring(0, 6)} </Text>
                    <AppImage
                        imagestyle={{ flex: 1, height: 20, width: 20, end: -5, alignSelf: 'center' }}
                        onClick={() => onDoneClick(item)}
                        path={require('../../assets/next.png')}
                    />

                </View >
                <View style={{ width: '100%', height: 0.5, backgroundColor: 'black' }}>

                </View>

            </View>
        );

    };

    return (  
            <SectionList
                sections={props.data}
                keyExtractor={(item, index) => item + index}
                renderItem={renderExpenseCategoryItem}
                renderSectionHeader={({ section: { title, amount } }) => (
                    <View style={{ flexDirection: 'row', backgroundColor: '#992f00' }}>
                        <Text style={internalStyle.header}>{title}</Text>
                        <Text style={internalStyle.amount}>₹ {amount}</Text>
                    </View>

                )}
            />
    )

}

export default CategorySectionList;



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
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        paddingStart: 10
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
    },
    header: {
        flex: 2,
        fontSize: 25,
        paddingStart: 10,
        color: 'white'
    },
    amount: {
        flex: 1,
        fontSize: 16,
        padding: 5,
        position: 'absolute',
        end: 0,
        color: 'white'
    }
});