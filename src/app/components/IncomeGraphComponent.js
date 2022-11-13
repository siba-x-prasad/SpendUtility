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

const IncomeGraphComponent = (props) => {
    return (
        <ContainerView viewStyle={{ ...internalStyle.container, ...props.viewStyle }}>
            <View style={internalStyle.cardContainer}>
                <Text style={internalStyle.title}> Expense </Text>
                <AppImage
                    imagestyle={{}}
                    onClick={props.onAddClick}
                    path={require('../../assets/add-button.png')}
                />
            </View>
            <BarChart data={{
                labels: props.graphLabel,
                datasets: [
                    {
                        data: props.graphData,
                    },
                ],
            }}
                width={Dimensions.get('window').width - 25}
                height={225}
                yAxisLabel={'$'} chartConfig={{
                    backgroundColor: 'white',
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    decimalPlaces: 0,
                    barPercentage: 0.4,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 0,
                    },
                }}
                style={{
                    margin: 0,
                    borderRadius: 0,
                }}
            />

            <View style={{ alignSelf: 'center', flexDirection: 'row', position: 'absolute', justifyContent: 'center', bottom: 0 }}>
                <AppButton
                    buttonStyle={{ flex: 1, height: 30, margin: 2, marginHorizontal: 2 }}
                    isEnabled={true}
                    onClick={onSignInClick}
                    title='Add Category'
                />
                <AppButton
                    buttonStyle={{ flex: 1, height: 30, margin: 2, marginHorizontal: 2 }}
                    isEnabled={true}
                    onClick={onSignUpClick}
                    title='More Details'
                />
            </View>

        </ContainerView>
    );
};

export default IncomeGraphComponent;

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