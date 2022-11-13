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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { useComponentDidMount, useComponentDidUpdate, } from '../../utilities/MyReactHook';
import { useNavigation } from '@react-navigation/native';
import { produceWithPatches } from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategorySelectionComponent from '../../components/CategorySelectionComponent';

const AddExpense = (props) => {

    const navigation = useNavigation();

    const refName = useRef();
    const refAmount = useRef();
    const [name, setName] = React.useState('');
    const [amount, setAmount] = React.useState();
    const [totalExpense, setTotalExpense] = React.useState();
    const [date, setDate] = React.useState('Date');
    const [time, setTime] = React.useState();
    const [category, setCategory] = React.useState('Category');
    const [showCategory, setShowCategory] = React.useState(false);

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [expenseList, setExpenseList] = React.useState([]);
    const [categoryList, seCategoryList] = React.useState([]);
    const [rowId, setRowId] = React.useState(0);


    addCategory = () => {
        onCloseCategoryComponent(true);
    };

    onCategorySelected = (name) => {
        setShowCategory(false);
        if (name == '') {
            setCategory('Category');
        }
        else {
            setCategory(name);
        }
    };

    onCloseCategoryComponent = (isShow) => {
        setShowCategory(isShow);
    };

    useComponentDidMount(() => {
        console.log("Component did mount!");
        refName.current.focus();
    });

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn("A date has been picked: ", date); 
        const timeMonthBack = Math.floor(date.getTime()/1000);
        console.log('Current time '+timeMonthBack);
        setTime(timeMonthBack);
        const selDate = Moment(date).format('DD MMM YYYY');
        console.log(typeof selDate);
        setDate(selDate);
        hideDatePicker();
    };

    useEffect(() => {
        fetchExpenseCategory();
        fetchLastExpense(); 
        const currentDate = Moment(new Date()).format('DD MMM YYYY');
        setDate(currentDate);
    }, []);


    deleteExpenseItemFromDatabase = (item) => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM  expense where id=?',
                [item.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchExpenseIncomeListFromDatabase();
                    } else {

                    }
                }
            );
        });
    };

    fetchExpenseCategory = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM category where type = ?',
                ['expense'],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i);
                        temp.push(item);
                    }
                    seCategoryList(temp);
                }
            );
        });
    };

    fetchLastExpense = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                ' SELECT * FROM expense ORDER BY column DESC LIMIT 1',
                [],
                (tx, results) => {
                    if(results.rows.length > 0){
                        const item = results.rows.item(0);
                        rowId = item.id;
                        rowId = rowId+1;
                        setRowId(rowId);
                        console.log('Last Expense '+item);
                    }
                }
            );
        });
    };

    onSaveToDatabase = () => {
        refName.current.focus(); 
        console.log('Date is '+date);
        const item = { id: rowId, name: name, amount: amount, category: category, date: date, time: time, done: 0 };
        console.log('new item : ' + item);
        setName('');
        setAmount('');
        appDatabase.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO expense (name, amount, category, date, time, repeat) VALUES (?,?,?,?,?,?)',
                [name, amount, category, date, time, 0],
                (tx, results) => {
                    console.log('Save Results :', results.rowsAffected);
                    if (results.rowsAffected > 0) {  
                        // setExpenseList(item);
                        setExpenseList([...expenseList, item]);
                    } else alert('Failed');
                }
            );
        });
    };

    onDeleteClick = (item) => {
        console.log('Delete Clicked');
        var array = [...expenseList];
        console.log('Before Splice ' + expenseList);
        if (item.id > -1) {
            array.splice(item.id, 1);
            setExpenseList(array);
            console.log('After Splice ' + array);
        }
        deleteExpenseItemFromDatabase(item);
    };

    validateData = () => {
        AsyncStorage.getItem('category').then(asyncStorageRes => {
            console.log('category ' + JSON.parse(asyncStorageRes))
            if (asyncStorageRes != null) {
                console.log('Data Available ' + JSON.parse(asyncStorageRes));
                setCategory(JSON.parse(asyncStorageRes));
                onSaveItemClick();
            }
        });
    }

    onSaveItemClick = () => {
        if (name == '') {
            Alert.alert('Please enter Name');
        }
        else if (amount == '') {
            Alert.alert('Please enter Amount');
        }
        else if (category == '') {
            Alert.alert('Please Select Category');
        }
        else {
            onSaveToDatabase();
        }
    };

    onDoneClick = (item) => {
        let status = 0;
        if (item.done == 1) {
            status = 0;
        }
        else {
            status = 1;
        }
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'UPDATE manageExpense set done=? where id=?',
                [status, item.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchExpenseIncomeListFromDatabase();
                    } else alert('Updation Failed');
                }
            );
        });
    };

    const renderExpenseItem = ({ item }) => {

        const backgroundColor = item.done === 1 ? "green" : "#d3d3d3";

        return (
            <View style={{ ...styles.itemContainer, flexDirection: 'column', padding: 5, backgroundColor: backgroundColor, width: screenWidth - 10, margin: 2 }}>

                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                    <Text style={{ ...styles.title, padding: 0, fontWeight: 'bold', fontSize: 18 }}> {item.name} </Text>
                    <View>
                        <View style={{ flexDirection: 'row', width: screenWidth - 10 }}>
                            <Text style={{ ...styles.title, flex: 1, padding: 0, color: 'blue', fontSize: 16 }}> ₹ {item.amount} </Text>
                            <Text style={{ ...styles.title, flex: 1, padding: 0, color: 'blue', fontSize: 16 }}> {item.category} </Text>
                        </View>

                        <Text style={{ ...styles.title, padding: 0, color: 'blue' }}> {item.date} </Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: 'black', width: '100%', marginVertical: 5 }}>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', end: 5, alignSelf: 'center' }}>
                    <Text style={{ ...internalStyle.textEnabled, flex: 1, fontSize: 11 }} onPress={() => onDoneClick(item)}>
                        Edit
                    </Text>
                    <View style={{ width: 1, backgroundColor: 'black' }}></View>
                    <Text style={{ ...internalStyle.textEnabled, flex: 1, fontSize: 11 }} onPress={() => onDeleteClick(item)}>
                        Delete
                    </Text>
                </View >
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.baseContainer}>
            <ContainerView >

                <View style={{ width: '100%', backgroundColor: '#808080', padding: 5 }}>

                    <View style={{ flexDirection: 'row', width: '98%', paddingTop: 5 }}>
                        <TextInput
                            style={{ ...styles.input, width: '70%', margin: 2, color: 'white' }}
                            keyboardType='default'
                            placeholder='Expense  Name'
                            placeholderTextColor='white'
                            autoFocus={true}
                            defaultValue={name}
                            returnKeyType="next"
                            onChangeText={setName}
                            maxLength={25}
                            ref={refName}
                            onSubmitEditing={() => refAmount.current.focus()}
                        />
                        <TouchableOpacity style={{ ...styles.input, margin: 2, width: '25%' }} onPress={addCategory} >
                            <Text style={{ color: 'white', textAlign: 'center' }}>
                                {category}
                            </Text>
                        </TouchableOpacity>


                    </View>

                    <View style={{ flexDirection: 'row', width: '98%', paddingTop: 5 }}>
                        <View style={{ width: '60%' }} >
                            <TextInput
                                style={{ ...styles.input, width: '98%', margin: 2, color: 'white' }}
                                keyboardType='decimal-pad'
                                placeholder='Expense Amount'
                                placeholderTextColor='white'
                                autoFocus={true}
                                returnKeyType="done"
                                onChangeText={setAmount}
                                maxLength={25}
                                defaultValue={amount}
                                ref={refAmount}
                                onSubmitEditing={onSaveItemClick}
                            />
                        </View>

                        <AppButton
                            buttonStyle={{ width: '40%', height: 40, margin: 2, }}
                            isEnabled={true}
                            onClick={() => { setDatePickerVisibility(true) }}
                            title={date}
                        />

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                    </View>
                    <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'center', alignContent: 'space-between', paddingTop: 5 }}>

                        <AppButton
                            buttonStyle={{ width: 100, height: 40, margin: 2, alignSelf: 'center' }}
                            isEnabled={true}
                            onClick={onSaveItemClick}
                            title='Save'
                        />

                    </View>
                </View>


                <FlatList
                    data={expenseList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderExpenseItem}
                />

                {showCategory ? <CategorySelectionComponent
                    visible={true}
                    onClose={onCloseCategoryComponent}
                    onSelect={onCategorySelected}
                    categoryList={categoryList} /> : null

                }
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

export default AddExpense;