import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text, Alert, Image } from "react-native";
import { Redirect } from "react-router-native";
import styles from '../../styles/globalStyles';
import AppTextInput from "../../components/AppInputText";
import AppButton from "../../components/AppButton";
import AppImage from '../../components/AppImage';
import AppText from "../../components/AppText";
import Spinner from "../../components/Spinner";
import ContainerView from "../../components/ContainerView";
import appDatabase from "../../database/appDatabase";
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import RadioButton from '../../components/RadioButton';
const screenWidth = (Dimensions.get('window').width);
import { useComponentDidMount, useComponentDidUpdate, useComponentWillUnmount } from '../../utilities/MyReactHook';

const SettingsDashboardScreen = ({ route, navigation1 }) => {

    const [currency, setCurrency] = useState('₹');
    const [theme, setTheme] = useState('Dark');

    const navigation = useNavigation();

    redirect = () => {
        navigation.navigate("expenseScreen")
    };



    const onCurrencySelected = (currency) => {
        console.log(' currency ' + currency);
        setCurrency(currency);
    };

    const onThemeSelected = (theme) => {
        console.log('theme ' + theme);
        setTheme(theme);
    };

    useComponentDidMount(() => {
        console.log('Settings useComponentDidMount called');
    });

    useComponentDidUpdate(() => {
        console.log('Settings useComponentDidUpdate called');
    });

    useComponentWillUnmount(() => {
        console.log('Settings useComponentWillUnmount called');
    });

    return (
        <ContainerView viewStyle={internalStyle.container}>
            <Text style={{ color: '#1F9370', width: '100%', fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-start', textAlign: 'left', padding: 3 }}> Select Theme </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>

                <RadioButton title='₹' onCheck={onCurrencySelected} checked={currency === '₹'} />
                <RadioButton title='€' onCheck={onCurrencySelected} checked={currency === '€'} />
                <RadioButton title='$' onCheck={onCurrencySelected} checked={currency === '$'} />

            </View>
            <View style={{ width: '100%', height: 0.5, backgroundColor: 'black', marginBottom: 10, marginTop: 10 }}></View>
            <Text style={{ color: '#1F9370', width: '100%', fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-start', textAlign: 'left', padding: 3 }}> Select Theme </Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>

                <RadioButton title='Light' onCheck={onThemeSelected} checked={theme === 'Light'} />
                <RadioButton title='Dark' onCheck={onThemeSelected} checked={theme === 'Dark'} />
                <RadioButton title='Default' onCheck={onThemeSelected} checked={theme === 'Default'} />

            </View>
            <View style={{ width: '100%', height: 0.5, backgroundColor: 'black', marginBottom: 10, marginTop: 10 }}></View>

        </ContainerView>
    );
};

export default SettingsDashboardScreen;

const internalStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-start'
    },
    cardContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
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