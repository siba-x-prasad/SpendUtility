import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert, Image, TouchableOpacity, TextInput } from "react-native";
import { Redirect } from "react-router-native";
import styles from '../styles/globalStyles';
import AppTextInput from './AppInputText';
import AppButton from "./AppButton";
import AppText from "./AppText";
import Spinner from "./Spinner";
import AppImage from './AppImage';
import ContainerView from "./ContainerView";
import { Dimensions } from 'react-native';
const screenWidth = (Dimensions.get('window').width);
import { useNavigation } from '@react-navigation/native';
import {
    BarChart
} from 'react-native-chart-kit';

const IncomeComponent = (props) => {

    const navigation = useNavigation();


    onAddExpense = () => {
        navigation.navigate("Add Income");
    };

    onAddCategory = () => {
        navigation.navigate("addCategory", {
            type: 'income',
            isReadOnly: false,
        });
    };

    onClickDetails = () => {
        navigation.navigate("Income Details");
    };

    onDoneClick = () => {

    };

    const renderExpenseItem = ({ item }) => {

        const backgroundColor = "#808080";
        const textColor = "white"

        return (
            <View style={{ height: 60, justifyContent: 'center', backgroundColor: '#726669', width: screenWidth - 10, margin: 0.5 }}>

                <View style={{ flexDirection: 'row', flex: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ ...internalStyle.incomeTitle, flex: 3, padding: 0, fontWeight: 'bold', color: textColor }}> {item.name} </Text>
                    <Text style={{ ...styles.title, flex: 2, padding: 0, color: 'white' }}>  ₹ {item.amount} </Text>
                    <Text style={{ ...styles.title, flex: 3, padding: 0, color: 'white' }}> {item.category} </Text>
                    <Text style={{ ...styles.title, flex: 2, padding: 0, color: 'white' }}> {item.date.substring(0, 6)} </Text>
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
        <ContainerView viewStyle={{ ...internalStyle.container, ...props.viewStyle }}>

            <View style={{ ...internalStyle.cardContainer, backgroundColor : '#1F9370', flex: 1 }}>
                <Text style={internalStyle.title}> Income </Text>
                <AppImage
                    imagestyle={{ tintColor : 'white' }}
                    onClick={onAddExpense}
                    path={require('../../assets/add-button.png')}
                />
            </View>

            <FlatList
                style={{ flex: 4, marginTop: 50, marginBottom: 30 }}
                data={props.incomeList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderExpenseItem}
            />

            <View style={{ alignSelf: 'center', flex: 1, flexDirection: 'row', position: 'absolute', justifyContent: 'center', bottom: 0 }}>
                <AppButton
                    buttonStyle={{ flex: 1, height: 30, margin: 2, marginHorizontal: 2 }}
                    isEnabled={true}
                    onClick={onAddCategory}
                    title='Add Category'
                />
                <AppButton
                    buttonStyle={{ flex: 1, height: 30, margin: 2, marginHorizontal: 2 }}
                    isEnabled={true}
                    onClick={onClickDetails}
                    title='More Details'
                />
            </View>

        </ContainerView>
    );
};

export default IncomeComponent;

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
    incomeTitle: {
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