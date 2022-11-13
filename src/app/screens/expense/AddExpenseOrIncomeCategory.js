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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useComponentDidMount, useComponentDidUpdate, } from '../../utilities/MyReactHook';

const AddExpenseOrIncomeCategory = ({ route }) => {

    const navigation = useNavigation();
    const refName = useRef();
    const [category, setCategory] = React.useState('');
    const [categoryList, setCategoryList] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState(null);


    const { type, isReadOnly } = route.params
    console.log('type ' + type + '  isReadOnly ' + isReadOnly);

    useComponentDidMount(() => {
        console.log("Component did mount!");
        // refName.current.focus();
    });


    useEffect(() => {
        fetchCategory();
    }, []);

    fetchCategory = () => {
        const tableName = type;
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM category WHERE type=?',
                [type],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setCategoryList(temp);
                    console.log(temp);
                }
            );
        });
    };

    deleteCategoryFromDatabase = (item) => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM category where id=? AND type=?',
                [item.id, type],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchCategory();
                    } else {

                    }
                }
            );
        });
    };


    onSaveToDatabase = (name) => {
        console.log('onSaveToDatabase', name, type);
        appDatabase.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO category (name, type) VALUES (?,?)',
                [name, type],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                    } else alert('Failed');
                }
            );
        });
    };

    onDeleteClick = (item) => {
        console.log('Delete Clicked');
        var array = [...categoryList];
        console.log('Before Splice ' + categoryList);
        if (item.id > -1) {
            array.splice(item.id, 1);
            setCategoryList(array);
            console.log('After Splice ' + array);
        }
        deleteCategoryFromDatabase(item);
    };

    onSaveItemClick = (text) => {
        if (text == '') {
            setError('Please enter name');
        }
        else {
            refName.current.focus()
            let newItemId = 0;
            if (categoryList.length > 0) {
                newItemId = categoryList[categoryList.length - 1].id + 1;
            }
            const item = { id: newItemId, name: text, type: type };
            setCategoryList([...categoryList, item]);
            console.log(item);
            setCategory('');
            onSaveToDatabase(text);
        }
    };

    onSelect = (item) => {
        if (isReadOnly) {
            console.log('selected Id is ' + item);
            setSelectedId(item.id);

            AsyncStorage.setItem('category', JSON.stringify(item.name));
        }
    };

    onCategorySelected = () => {
        navigation.goBack(null);
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
                'UPDATE ' + type + ' set done=? where id=?',
                [status, item.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchCategory();
                    } else alert('Updation Failed');
                }
            );
        });
    };

    const renderCategoryItem = ({ item }) => {

        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#fff";
        const color = item.id === selectedId ? 'white' : 'black';
        const txt = item.id === selectedId ? '⚫️' : ' 🔘';
        return (
            <View style={{ ...internalStyle.itemContainer, padding: 5, height: 50, backgroundColor: backgroundColor, width: screenWidth - 10 }} onPress={() => onSelect(item)}>
                <View style={{ flexDirection: 'row', flex: 4, alignSelf: 'center' }}>
                    <Text style={{ ...styles.title, padding: 0, fontWeight: 'bold', color: color }}> {item.name} </Text>
                </View>

                {!isReadOnly ?
                    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', right: 0, height: 50, end: 5, alignSelf: 'center' }}>
                        <Text style={{ ...internalStyle.textEnabled, marginEnd: 5, color: 'red' }} onPress={() => onDeleteClick(item)}>
                            ❎
                        </Text>
                    </View > :
                    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', right: 0, height: 50, end: 5, alignSelf: 'center' }}>
                        <Text style={internalStyle.textEnabled} onPress={() => onSelect(item)}>
                            {txt}
                        </Text>
                    </View >
                }

            </View>
        );

    };

    return (
        <SafeAreaView style={styles.baseContainer}>
            <ContainerView >
                {!isReadOnly ?
                    <View style={{ width: '100%', flexDirection: 'row', padding: 5, backgroundColor: '#808080' }}>
                        <TextInput
                            style={{ ...styles.input, width: '70%', margin: 2, color: 'white' }}
                            keyboardType='default'
                            placeholder={type == 'income' ? 'Income Category' : 'Expense Category'}
                            placeholderTextColor='white'
                            autoFocus={true}
                            returnKeyType="done"
                            onChangeText={setCategory}
                            maxLength={25}
                            defaultValue={category}
                            ref={refName}
                            onSubmitEditing={() => onSaveItemClick(category)}
                        />
                        <AppButton
                            buttonStyle={{ width: 70, height: 40, margin: 2 }}
                            isEnabled={true}
                            onClick={() => onSaveItemClick(category)}
                            title='Save'
                        />
                    </View>

                    : null}

                <FlatList
                    data={categoryList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCategoryItem}
                />
                {isReadOnly ?
                    <AppButton
                        buttonStyle={{ width: 200, height: 40, margin: 2 }}
                        isEnabled={true}
                        onClick={onCategorySelected}
                        title='Done'
                    /> : null}

            </ContainerView>
        </SafeAreaView >
    );
};

const internalStyle = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#d3d3d3',
        margin: 1,
    },
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

export default AddExpenseOrIncomeCategory;