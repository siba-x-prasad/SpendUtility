import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, StatusBar, Text, Alert, Image } from "react-native";
import { Redirect } from "react-router-native";
import styles from '../../styles/globalStyles';
import AppTextInput from "../../components/AppInputText";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Spinner from "../../components/Spinner";
import ContainerView from "../../components/ContainerView";
import appDatabase from "../../database/appDatabase";
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import AppImage from '../../components/AppImage';

import { useComponentDidMount, useComponentDidUpdate, useComponentWillUnmount } from '../../utilities/MyReactHook';
import { useFocusEffect } from '@react-navigation/native';
import SplitGroupItemComponent from '../../components/SplitGroupItemComponent';

const SplitDashboardScreen = ({ route, navigation1 }) => {
    const navigation = useNavigation();

    redirect = () => {
        navigation.navigate("expenseScreen")
    };

    const [splitExpenseList, setSplitExpenseList] = React.useState([
        { id: 0, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: 1, groupName: '87' },
        { id: 1, name: 'prasad', expenseName: 'shopping', amount: 20, message: 'Aldi shopping', date: '11/06/2022', status: -1, groupName: '87' },
        { id: 2, name: 'mohanty', expenseName: 'shopping', amount: 250, message: 'lidl shopping', date: '11/06/2022', status: 1, groupName: '87' },
        { id: 3, name: 'mamuni', expenseName: 'shopping', amount: 205, message: 'lidl shopping', date: '11/06/2022', status: -1, groupName: '87' },
        { id: 4, name: 'Swasi', expenseName: 'shopping', amount: 110, message: 'lidl shopping', date: '11/06/2022', status: 1, groupName: '87' },
        { id: 5, name: 'Lenka', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: -1, groupName: '87' },
        { id: 6, name: 'Mohanty', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: 1, groupName: '87' },
        { id: 7, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: -1, groupName: '87' },
        { id: 8, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: 1, groupName: '87' },
        { id: 9, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: -1, groupName: '87' },
        { id: 10, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: 1, groupName: '87' },
        { id: 11, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: -1, groupName: '87' },
        { id: 12, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: 1, groupName: '87' },
        { id: 13, name: 'siba', expenseName: 'shopping', amount: 120, message: 'lidl shopping', date: '11/06/2022', status: -1, groupName: '87' },
    ]);

    useFocusEffect(
        React.useCallback(() => {

            fetchSplitExpenseList();

            return () => {
                // alert('Screen was unfocused');
                // Useful for cleanup functions
            };
        }, [])
    );

    useComponentDidMount(() => {
        console.log('Expense useComponentDidMount called');
        fetchSplitExpenseList();

    });

    useComponentDidUpdate(() => {
        console.log('Expense useComponentDidUpdate called');
        // fetchLast10Expense();
        // fetchIncome();
    });

    useComponentWillUnmount(() => {
        console.log('Expense useComponentWillUnmount called');
    });

    const onDeleteClick = (item) => {

    };

    const onEditClick = (item) => {

    };

    const onAddSExpense = () => {

    };

    const onAddGroup = () => {

    };

    const allTransactionClick = () => {

    };

    const renderSplitExpenseItem = ({ item }) => {
        return (
            <SplitGroupItemComponent item={item} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
        );
    };

    const fetchSplitExpenseList = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                ' SELECT * FROM splitBill ORDER BY time DESC LIMIT 10',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                    }
                    // setSplitExpenseList(temp);
                    console.log('plitExpenseList ' + temp);
                }
            );
        });
    };

    return (

        <ContainerView viewStyle={{ padding: 5 }} >
            <View style={{ ...internalStyle.cardContainer, height: 50, backgroundColor: '#1F9370', flex: 1 }}>
                <Text style={internalStyle.title}> Transactions </Text>
                <AppImage
                    imagestyle={{ tintColor: 'white' }}
                    onClick={onAddSExpense}
                    path={require('../../../assets/add-button.png')}
                />
            </View>

            <FlatList
                style={{ flex: 4, marginTop: 50, marginBottom: 30 }}
                data={splitExpenseList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSplitExpenseItem}
            />

            <View style={{ alignSelf: 'center', flex: 1, flexDirection: 'row', position: 'absolute', justifyContent: 'center', bottom: 0 }}>
                <AppButton
                    buttonStyle={{ flex: 1, height: 30, margin: 2, marginHorizontal: 2 }}
                    isEnabled={true}
                    onClick={onAddGroup}
                    title='Add Group'
                />
                <AppButton
                    buttonStyle={{ flex: 1, height: 30, margin: 2, marginHorizontal: 2 }}
                    isEnabled={true}
                    onClick={allTransactionClick}
                    title='All Transaction'
                />
            </View>
        </ContainerView>
    );
};

export default SplitDashboardScreen;


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