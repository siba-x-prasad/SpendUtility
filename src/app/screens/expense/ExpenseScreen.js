import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert, Image, TouchableOpacity, Platform } from "react-native";
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { useComponentDidMount, useComponentDidUpdate, } from '../../utilities/MyReactHook';
import { useNavigation } from '@react-navigation/native';

const ExpenseScreen = ({ route, navigation1 }) => {

    const navigation = useNavigation();
    const [error, setError] = React.useState('Please Enter Shopping Item');
    const [shoppingItem, setShoppingItem] = React.useState('');
    const [expense, setExpense] = React.useState('');
    const [income, setIncome] = React.useState('');
    const [expenseList, setExpenseList] = React.useState([]);
    const [incomeList, setIncomeList] = React.useState([]);
    const [showDate, setShowDate] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    useEffect(() => {
        fetchExpenseListFromDatabase();
       const list =  fetchIncomeListFromDatabase();
       console.log('Income list : '+list);
    }, []);

    openExpenseScreen = () => {
        navigation.navigate("addExpense")
    }

    openIncomeScreen = () => {
        navigation.navigate("addIncome")
    }

    addExpenseCategory = () => {
        navigation.navigate("addCategory", {
            type: 'expense',
            isReadOnly: false,
        });
    }

    addIncomeCategory = () => {
        navigation.navigate("addCategory", {
            type: 'income',
            isReadOnly: false,
        });
    }

    fetchExpenseListFromDatabase = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM expense',
                [],
                (tx, results) => {
                    var temp = [];
                    let tempTotalExpense = 0;
                    for (let i = 0; i < results.rows.length; ++i) {
                        const tempItem = results.rows.item(i);
                        temp.push(tempItem);
                        tempTotalExpense = tempTotalExpense + Number(tempItem.amount)
                    }
                    setIncomeList(temp);
                    setExpense(tempTotalExpense);
                    console.log(temp);
                }
            );
        });
    };

    fetchIncomeListFromDatabase = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM income',
                [],
                (tx, results) => {
                    var temp = [];
                    let tempTotalIncome = 0;
                    for (let i = 0; i < results.rows.length; ++i) {
                        const tempItem = results.rows.item(i);
                        temp.push(tempItem);
                        tempTotalIncome = tempTotalIncome + Number(tempItem.amount)
                    }
                    setIncomeList(temp);
                    setIncome(tempTotalIncome);
                    return temp;
                    console.log(temp);
                }
            );
        });
    };

    return (
        <SafeAreaView style={styles.baseContainer}>
            <ContainerView >
                <View style={{ flex: 3, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 5, margin: 5, borderColor: 'black', borderWidth: 1 }}>

                    <Text style={{ ...internalStyle.title, width: '100%', flex: 1, position: 'absolute', top: 0 }}>
                        Expense Rs. {expense}
                    </Text>

                    <View style={{ flex: 3 }}>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch', position: 'absolute', bottom: 0 }}>
                        <AppButton
                            buttonStyle={{ flex: 1, height: 40, margin: 2 }}
                            isEnabled={true}
                            onClick={openExpenseScreen}
                            title='Add Expense'
                        />
                        <AppButton
                            buttonStyle={{ flex: 1, height: 40, margin: 2 }}
                            isEnabled={true}
                            onClick={addExpenseCategory}
                            title='Add Category'
                        />
                    </View >

                </View>

                <View style={{ flex: 3, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 5, margin: 5, borderColor: 'black', borderWidth: 1 }}>

                    <Text style={{ ...internalStyle.title, width: '100%', flex: 1, position: 'absolute', top: 0 }}>
                        Income  Rs. {income}
                    </Text>

                    <View style={{ flex: 3 }}>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch', position: 'absolute', bottom: 0 }}>
                        <AppButton
                            buttonStyle={{ flex: 1, height: 40, margin: 2 }}
                            isEnabled={true}
                            onClick={openIncomeScreen}
                            title='Add Income'
                        />
                        <AppButton
                            buttonStyle={{ flex: 1, height: 40, margin: 2 }}
                            isEnabled={true}
                            onClick={addIncomeCategory}
                            title='Add Category'
                        />
                    </View >

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
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'black',
        color: 'white'
    },
    textEnabled: {
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 5,
        textAlignVertical: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black'
    }
});

export default ExpenseScreen;