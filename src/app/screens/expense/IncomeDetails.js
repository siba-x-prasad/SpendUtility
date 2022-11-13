import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert, Image, TouchableOpacity, TextInput } from "react-native";
import { Redirect } from "react-router-native";
import styles from '../../styles/globalStyles';
import AppTextInput from '../../components/AppInputText';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Spinner from "../../components/Spinner";
import AppImage from '../../components/AppImage';
import ContainerView from '../../components/ContainerView';
import { Dimensions } from 'react-native';
const screenWidth = (Dimensions.get('window').width);
import { useNavigation } from '@react-navigation/native';
import appDatabase from "../../database/appDatabase";
import ExpensePieChart from '../../components/ExpensePieChart';
import { getSectionDataMonthlyExpenseByCategory,grupMonthlyExpenseByCategory } from '../../utilities/DataUtils';
import {
    BarChart
} from 'react-native-chart-kit';
import ExpenseItemComponent from '../../components/ExpenseItemComponent';

const IncomeDetails = (props) => {

    const [incomeList, setIncomeList] = React.useState([]);
    const [graphType, setGraphType] = useState('weekly');
    const [totalIncome, setTotalIncome] = useState(0);
    const [pieChartData, setPieChartData] = useState([]);

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


    useEffect(() => {
        fetchIncomeFromDatabase();
    }, []);

    const onGraphSelect = (name) => {
        setGraphType(name);
    };


    const fetchIncomeFromDatabase = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM income',
                [],
                (tx, results) => {
                    var temp = [];
                    let totIncome = 0;
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                        totIncome = totIncome + Number(item.amount);
                    }

                    setTotalIncome(totIncome);
                    const arr = grupMonthlyExpenseByCategory(temp);
                    setPieChartData(arr);
                    console.log('Total Exp : ' + totIncome);
                    console.log('Income List : ' + temp);
                    setIncomeList(temp);
                }
            );
        });
    };

    const onDeleteClick = (item) =>{
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM  income where id=?',
                [item.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchIncomeFromDatabase();
                    } else {}
                }
            );
        });
    }; 

    const onEditClick = (item) => {
         console.log('Edit clicked');
    };

    const renderIncomeItem = ({ item }) => {


       

        const backgroundColor = item.done === 1 ? "green" : "#d3d3d3";

        return (
            <ExpenseItemComponent item = {item} onDeleteClick = {onDeleteClick} onEditClick = {onEditClick} />
        );
    };


    return (
        <ContainerView>
            <View style={internalStyle.tabContainer}>
                <Text style={[graphType === 'weekly' ? internalStyle.titleEnabled : internalStyle.titleDisabled]} onPress={() => onGraphSelect('weekly')}>
                    Salary Details
                </Text>
               
            </View>

            <ExpensePieChart data={pieChartData} />


            <FlatList
                data={incomeList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderIncomeItem}
            />


        </ContainerView>
    );
};

export default IncomeDetails;

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