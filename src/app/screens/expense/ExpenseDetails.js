import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, SectionList, Text, Alert, Image, TouchableOpacity, TextInput } from "react-native";
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
import { grupMonthlyExpenseByCategory, getSectionDataMonthlyExpenseByCategory, getWeeklyyExpense } from '../../utilities/DataUtils';
import ExpensePieChart from '../../components/ExpensePieChart';
import CategorySectionList from '../../components/CategorySectionList';
import ExpenseItemComponent from '../../components/ExpenseItemComponent';
import {
    BarChart
} from 'react-native-chart-kit';

const ExpenseDetails = (props) => {

    const [expenseList, setExpenseList] = React.useState([]);
    const [expenseListByCategory, setExpenseListByCategory] = React.useState([]);
    const [graphType, setGraphType] = useState('weekly');
    const [totalExpense, setTotalExpense] = useState(0);
    const [isBarChart, setBarChart] = useState(true);
    const [pieChartData, setPieChartData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const [barGraphData, setBarGraphData] = useState([[], []]);
    const [weeklyGraphData, setWeeklyGraphData] = useState([[], []]);
    const [monthlyData, setMonthlyData] = useState([[], []]);
    const [weeklyExpenseList, setWeeklyExpenseList] = useState([]);
    const [monthlyExpenseList, setMonthlyExpenseList] = useState([]);
    const [titleMessage, setTitleMessage] = useState('Weekly Expense');
    let graphLabel = ['Jan',
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

    let graphData = [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43];

    useEffect(() => {
        fetchExpenseFromDatabase();
        fetchLast30DaysExpenseFromDatabase();
        fetchLast7DaysExpenseFromDatabase();
    }, []);

    const onGraphSelect = (name) => {
        if (name == 'category') {
            setBarChart(false);
            setTitleMessage('Last 30 days Expense By Category');
        }
        else if (name == 'weekly') {
            console.log('Weekly');
            setBarChart(true);
            setBarGraphData(weeklyGraphData);
            setExpenseList(weeklyExpenseList);
        }
        else {
            console.log('monthly');
            setExpenseList(monthlyExpenseList);
            setBarChart(true);
            const graphD = [graphLabel, graphData];
            setBarGraphData(graphD);
            setTitleMessage('Last 30 days Expense');
        }
        setGraphType(name);
    };


    const fetchExpenseFromDatabase = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM expense',
                [],
                (tx, results) => {
                    var temp = [];
                    let totExpense = 0;
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                        totExpense = totExpense + Number(item.amount);
                    }

                    setTotalExpense(totExpense);

                    console.log('Total Exp : ' + totExpense);
                    console.log('Total items  : ' + temp.length);

                    setExpenseList(temp);
                }
            );
        });
    };

    const fetchLast30DaysExpenseFromDatabase = () => {
        var priorDate = new Date(new Date().setDate(new Date().getDate() - 30));
        const timeMonthBack = Math.floor(priorDate.getTime() / 1000);
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM expense WHERE time >= ? ',
                [timeMonthBack],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                    }
                    setMonthlyExpenseList(temp);
                    const arr = grupMonthlyExpenseByCategory(temp);
                    const categoryExpenseArray = getSectionDataMonthlyExpenseByCategory(temp);
                    setCategoryData(categoryExpenseArray);
                    setPieChartData(arr);
                    // console.log('section items ' + values);
                    console.log('30 days before total Items ' + temp.length);
                }
            );
        });
    };

    const fetchLast7DaysExpenseFromDatabase = () => {
        var priorDate = new Date(new Date().setDate(new Date().getDate() - 7));
        const timeWeekBack = Math.floor(priorDate.getTime() / 1000);
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM expense WHERE time >= ? ',
                [timeWeekBack],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                    }
                    setWeeklyExpenseList(temp);
                    const arr = getWeeklyyExpense(temp);
                    console.log('Weekly Data ' + arr);
                    let graphData = [];
                    graphData.push(arr[0]);
                    graphData.push(arr[1]);
                    setWeeklyGraphData(graphData);
                    setBarGraphData(graphData);
                    // console.log('Weekly '+weeklyData[0]+' amount '+weeklyData[1]);
                }
            );
        });
    };


    const onDeleteClick = (item) => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM  expense where id=?',
                [item.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchExpenseFromDatabase();
                    } else {

                    }
                }
            );
        });
    };

    const onEditClick = (item) => {
         console.log('Edit clicked');
    };


    const renderExpenseItem = ({ item }) => { 
        return (
            <ExpenseItemComponent item = {item} onDeleteClick = {onDeleteClick} onEditClick = {onEditClick} />
        );
    };


    return (
        <ContainerView>
            <View style={internalStyle.tabContainer}>
                <Text style={[graphType === 'weekly' ? internalStyle.titleEnabled : internalStyle.titleDisabled]} onPress={() => onGraphSelect('weekly')}>
                    Weekly
                </Text>
                <Text style={[graphType === 'monthly' ? internalStyle.titleEnabled : internalStyle.titleDisabled]} onPress={() => onGraphSelect('monthly')}>
                    Monthly
                </Text>
                <Text style={[graphType === 'category' ? internalStyle.titleEnabled : internalStyle.titleDisabled]} onPress={() => onGraphSelect('category')}>
                    Category
                </Text>
            </View>


            {isBarChart ?
                <BarChart data={{
                    labels: barGraphData[0],
                    datasets: [
                        {
                            data: barGraphData[1],
                        },
                    ],
                }}
                    width={Dimensions.get('window').width - 25}
                    height={225}
                    yAxisLabel={'₹'} chartConfig={{
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
                /> : <ExpensePieChart data={pieChartData} />}


            <Text>{titleMessage}</Text>
            {isBarChart ?
                <FlatList
                    data={expenseList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderExpenseItem}
                /> :
                <CategorySectionList data={categoryData} />
            }

        </ContainerView>
    );
};

export default ExpenseDetails;

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