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
import AppImage from '../../components/AppImage';
import Moment from 'moment';
import ShoppingItemComponent from '../../components/ShoppingItemComponent';

import { useComponentDidMount, useComponentDidUpdate, } from '../../utilities/MyReactHook';

const ShoppingListScreen = ({ route, navigation }) => {
    const refName = useRef();
    // const refAmount = useRef();
    const [error, setError] = React.useState('Please Enter Shopping Item');
    const [name, setName] = React.useState('');
    const [amount, setAmount] = React.useState("");
    const [shoppingList, setShoppingList] = React.useState([{ id: 0, name: 'Apple', amount: '12 kg' }, { id: 1, name: 'Orange', amount: '12 kg' }]);

    useComponentDidMount(() => {
        console.log("Component did mount!");
       // refName.current.focus();
    });


    useEffect(() => {
        fetchShoppingListFromDatabase();
    }, []);

    fetchShoppingListFromDatabase = () => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM shopping',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setShoppingList(temp);
                    console.log(temp);
                }
            );
        });
    };

    deleteShoppingItemFromDatabase = (item) => {
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM  shopping where id=?',
                [item.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchShoppingListFromDatabase();
                    } else {

                    }
                }
            );
        });
    };

    onSaveToDatabase = () => {
        console.log('onSaveToDatabase', name + '  ' + amount);
        const currentDate = Moment(new Date()).format('DD MMM YYYY');

        appDatabase.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO shopping (name, amount, date, done) VALUES (?,?,?,?)',
                [name, amount, currentDate, 0],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        // Alert.alert(
                        //     'Success',
                        //     'Item Added Successfully Successfully',
                        //     [
                        //         {
                        //             text: 'Ok',
                        //             onPress: () => { },
                        //         },
                        //     ],
                        //     { cancelable: false }
                        // );
                    } else alert('Failed');
                }
            );
        });
    };

    onDeleteClick = (item) => {
        console.log('Delete Clicked');
        var array = [...shoppingList];
        console.log('Before Splice ' + shoppingList);
        if (item.id > -1) {
            // setShoppingList();
            array.splice(item.id, 1);
            setShoppingList(array);
            console.log('After Splice ' + array);
        }
        deleteShoppingItemFromDatabase(item);
    };

    onSaveItemClick = () => {
        if (name == '') {
            setError('Please enter name');
        }
        else {
            refName.current.focus()
            let newItemId = 0;
            if (shoppingList.length > 0) {
                newItemId = shoppingList[shoppingList.length - 1].id + 1;
            }
            const item = { id: newItemId, name: name, amount: amount, date: '', done: 0 };
            setShoppingList([...shoppingList, item]);
            console.log(item);
            setName('');
            setAmount('');
            onSaveToDatabase();
        }
    };

    onDoneClick = (item) => {
        console.log('onDoneClick');
        let status = 0;

        if (item.done == 0) {
            status = 1;
        }

        appDatabase.transaction((tx) => {
            tx.executeSql(
                'UPDATE shopping set done = ?  where id=?',
                [status, item.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        fetchShoppingListFromDatabase();
                    } else alert('Updation Failed');
                }
            );
        });
    };

    const renderShoppingItem = ({ item }) => {

        const backgroundStyle = item.done === 1 ? internalStyle.itemContainerSelected : internalStyle.itemContainerUnselected;
        const textColor = item.done === 1 ? "white" : "black";

        return (
            <ShoppingItemComponent item={item} onDeleteClick = {onDeleteClick}  onDoneClick = {onDoneClick}/>
        );

    };

    return (
        <SafeAreaView style={styles.baseContainer}>
            <ContainerView >
                <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#808080' }}>
                    <View style={{ width: '75%' }} >
                        <TextInput
                            style={{ ...styles.input, width: '98%', margin: 2, color: 'white' }}
                            keyboardType='default'
                            placeholder='Type Items'
                            placeholderTextColor='white'
                            autoFocus={true}
                            returnKeyType="next"
                            onChangeText={setName}
                            maxLength={25}
                            defaultValue={name}
                            ref={refName}
                            onSubmitEditing={onSaveItemClick}
                           
                        />
                        {/* onSubmitEditing={() => refAmount.current.focus()} */}
                    </View>
                    {/* <TextInput
                        style={{ ...styles.input, width: 70, height: 40, margin: 2, color: 'white' }}
                        keyboard='decimal-pad'
                        placeholder='Qty'
                        onChangeText={setAmount}
                        errorMessage='-'
                        maxLength={6}
                        defaultValue={amount}
                        ref={refAmount}
                        autoFocus={false}
                        placeholderTextColor='white'
                        returnKeyType="done"
                        onSubmitEditing={onSaveItemClick}
                    /> */}
                    <AppButton
                        buttonStyle={{ width: 100, height: 40, margin: 2 }}
                        isEnabled={true}
                        onClick={onSaveItemClick}
                        title='Save'
                    />
                </View>

                <FlatList
                    data={shoppingList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderShoppingItem}
                />
            </ContainerView>
        </SafeAreaView >
    );
};

const internalStyle = StyleSheet.create({

    itemContainerSelected: {
        width: screenWidth - 5 ,
         height: 50, 
         justifyContent: 'center', 
         backgroundColor: '#4c4c4c',
         borderRadius  : 5,
         margin : 2
    },

    itemContainerUnselected: {
        width: screenWidth - 5 ,
         height: 50, 
         justifyContent: 'center', 
         backgroundColor: '#7f7f7f',
         borderRadius  : 5,
         margin : 2
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

export default ShoppingListScreen;