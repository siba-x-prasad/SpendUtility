import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text, Alert, Image } from "react-native";
import { Redirect } from "react-router-native";
import styles from '../../styles/globalStyles';
import AppTextInput from "../../components/AppInputText";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Spinner from "../../components/Spinner";
import ContainerView from "../../components/ContainerView";
import appDatabase from "../../database/appDatabase";

import { useNavigation } from '@react-navigation/native';

const ShoppingDashboardScreen = ({ props, navigation1 }) => {
    const navigation = useNavigation();

    redirect = () => {
        navigation.navigate("shoppingListScreen")
    };

    return (
        <View style={styles.dashboardItemcontainer}>
            <Text style={{ ...styles.text, color: 'black', fontSize: 35 }} onPress={
                redirect
            }>
                Shopping Screen
            </Text>
        </View>
    );
};

export default ShoppingDashboardScreen;


const internalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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
        marginHorizontal: 10
    },
});