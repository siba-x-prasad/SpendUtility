import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert, Image, TouchableOpacity } from "react-native";
import { Redirect } from "react-router-native";
import styles from '../../styles/globalStyles';
import AppTextInput from "../../components/AppInputText";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Spinner from "../../components/Spinner";
import ContainerView from "../../components/ContainerView";
import { TextInput } from "react-native-gesture-handler";
import appDatabase from "../../database/appDatabase";
import { Dimensions } from 'react-native';
const screenWidth = (Dimensions.get('window').width);

import { useComponentDidMount, useComponentDidUpdate, } from '../../utilities/MyReactHook';

const SplitExpenseScreen = ({ route, navigation }) => {


    const [error, setError] = React.useState('Please Enter Shopping Item');
    const [shoppingItem, setShoppingItem] = React.useState('');
    const [amount, setAmount] = React.useState();
    const [shoppingList, setShoppingList] = React.useState([{ id: 0, name: 'Apple', amount: '12 kg' }, { id: 1, name: 'Orange', amount: '12 kg' }]);
    let count = 2;

    return (
        <SafeAreaView style={styles.baseContainer}>
            <ContainerView >
                <View style={{ alignSelf: 'center', flexDirection: 'row', position: 'absolute', justifyContent: 'center', top: 0 }}>
                    <AppButton
                        buttonStyle={{ flex: 1 }}
                        isEnabled={true}
                        onClick={onSignInClick}
                        title='Add Expense'
                    />
                    <AppButton
                        buttonStyle={{ flex: 1 }}
                        isEnabled={true}
                        onClick={onSignUpClick}
                        title='Add Income'
                    />
                </View>

            </ContainerView>
        </SafeAreaView >
    );
};

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
        marginHorizontal: 3
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
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

export default SplitExpenseScreen;