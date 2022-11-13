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
import { Dimensions } from 'react-native';
import IncomeComponent from '../../components/IncomeComponent';
import ExpenseComponent from '../../components/ExpenseComponent';
import {useComponentDidMount, useComponentDidUpdate, useComponentWillUnmount}  from '../../utilities/MyReactHook';
import { useFocusEffect } from '@react-navigation/native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';

const ExpenseDashboardScreen = ({ route, navigation1 }) => {
    const navigation = useNavigation();

    redirect = () => {
        navigation.navigate("expenseScreen")
    };

    const [expenseList, setExpenseList] = React.useState([]);
    const [incomeList, seIncomeList] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
    
            fetchLast10Expense();
            fetchIncome();
    
          return () => {
            // alert('Screen was unfocused');
            // Useful for cleanup functions
          };
        }, [])
      );
 
    useComponentDidMount(() => {
        console.log('Expense useComponentDidMount called'); 
        fetchLast10Expense();
        fetchIncome();
       
    });

    useComponentDidUpdate(() => {
        console.log('Expense useComponentDidUpdate called'); 
        // fetchLast10Expense();
        // fetchIncome();
    });

    useComponentWillUnmount(() => {
        console.log('Expense useComponentWillUnmount called'); 
    });



    const graphLabel = ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const graphData = [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43];

    fetchLast10Expense = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                ' SELECT * FROM expense ORDER BY time DESC LIMIT 10',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                    }
                    setExpenseList(temp);
                    console.log('fetchLast10Expense ' + temp);
                }
            );
        });
    };

    const fetchIncome = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                ' SELECT * FROM income ORDER BY time DESC LIMIT 10',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                    }
                    seIncomeList(temp);
                    console.log('fetchLas Income ' + temp);
                }
            );
        });
    };

    return (
        <ContainerView viewStyle={{ padding: 5 }} >
            <ExpenseComponent viewStyle={{ flex: 3, padding: 0 }} expenseList={expenseList} />
            <IncomeComponent viewStyle={{ flex: 2, padding: 0 }} incomeList={incomeList} />
        </ContainerView>
    );
};

export default ExpenseDashboardScreen;


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