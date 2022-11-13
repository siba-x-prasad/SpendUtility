import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text, Alert, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import configureStore from '../../redux/store/AppStores';
import {BackHandler} from 'react-native';

const store = configureStore()

import ExpenseDashboardScreen from './ExpenseDashboardScreen';
import ShoppingListScreen from '../shopping/ShoppingListScreen';
import SplitDashboardScreen from '../split/SplitDashboardScreen';
import SettingsDashboardScreen from '../settings/SettingsDashBoardScreen';

const Tab = createBottomTabNavigator();

const DashboardScreen = (independent = true) => {

    const navigateToShopping = () => {
        // navigation.navigate('shoppingList');
    };


    useEffect(() => {
        // back handle exit app
        BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
        };
    }, []);

    const backButtonHandler = () => {
            BackHandler.exitApp();
        return true;
    }

    return (
        <Provider store={store} >
            <Tab.Navigator>
                <Tab.Screen name="Shopping" component={ShoppingListScreen}
                    options={{
                        title: 'Shopping',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../../../assets/shoppingList.png')}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen name="Expense" component={ExpenseDashboardScreen}
                    options={{
                        title: 'Expense',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../../../assets/salary.png')}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen name="SplitExpense" component={SplitDashboardScreen}
                    options={{
                        title: 'SplitExpense',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../../../assets/split.png')}
                                />
                            );
                        },
                    }} />
                <Tab.Screen name="Settings" component={SettingsDashboardScreen}
                    options={{
                        title: 'Settings',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../../../assets/settings.png')}
                                />
                            );
                        },
                    }} />
            </Tab.Navigator>
        </Provider>

    );
};

export default DashboardScreen;


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