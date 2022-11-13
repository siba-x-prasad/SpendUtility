
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
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { useNavigation } from '@react-navigation/native';
import {
    BarChart, PieChart
} from 'react-native-chart-kit';

const ExpensePieChart = (props) => {

    const data = [
        {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "white",
            legendFontSize: 15
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Beijing",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "New York",
            population: 8538000,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => 'white',
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    console.log('Props Data is '+props.data);

    console.log(' Data is '+data+' type '+ typeof(data));

    return (
        <PieChart
            data={props.data}
            width={screenWidth}
            height={150}
            chartConfig={chartConfig}
            accessor={"amount"}
            paddingLeft={"0"}
            center={[5, 0]}
            absolute 
        />
    )

}

export default ExpensePieChart;