import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnBoardingScreen from "./account/OnBoardingScreen";
import SigninScreen from "./account/SigninScreen";
import SignupScreen from "./account/SignupScreen";

import ImagePickerApp from "./image/ImagePickerApp";
import DashboardScreen from "./dashboard/DashboardScreen";
 
import SplitDashboardScreen from "./split/SplitDashboardScreen";
import ExpenseDashboardScreen from "./dashboard/ExpenseDashboardScreen";

import ShoppingListScreen from "./shopping/ShoppingListScreen";
import ShoppingDashboardScreen from './shopping/ShoppingDashboardScreen';
import ExpenseScreen from "./expense/ExpenseScreen";
import SplitExpenseScreen from "./split/SplitExpenseScreen";

import AddExpense from "./expense/AddExpense";
import AddIncome from "./expense/AddIncome";
import ManageExpenseOrIncome from "./expense/ManageExpenseOrIncome";
import AddExpenseOrIncomeCategory from "./expense/AddExpenseOrIncomeCategory";
import ExpenseDetails from "./expense/ExpenseDetails";
import IncomeDetails from "./expense/IncomeDetails";
import SplashScreen from "./SplashScreen";

const Stack = createNativeStackNavigator();

class LauncherApp extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='splash'>
                <Stack.Screen
                        name="splash"
                        component={SplashScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="Onboarding"
                        component={OnBoardingScreen}
                        options={{ title: 'Onboarding' }} />

                    <Stack.Screen name="Signin" component={SigninScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="image" component={ImagePickerApp} />
                    <Stack.Screen name="dashboard" component={DashboardScreen} options={{headerShown: false}}/>

                    <Stack.Screen name="shopping" component={ShoppingDashboardScreen} />
                    <Stack.Screen name="expense" component={ExpenseDashboardScreen} />
                    <Stack.Screen name="split" component={SplitDashboardScreen} />

                    <Stack.Screen name="shoppingListScreen" component={ShoppingListScreen} />
                    <Stack.Screen name="expenseScreen" component={ExpenseScreen} />
                    <Stack.Screen name="splitScreen" component={SplitExpenseScreen} />

                    <Stack.Screen name="manageExpenseOrIncome" component={ManageExpenseOrIncome} /> 
                    <Stack.Screen name="addCategory" component={AddExpenseOrIncomeCategory} />
                    <Stack.Screen name="addExpenseScreen" component={AddExpense} />
                    <Stack.Screen name="Expense Details" component={ExpenseDetails} />
                    <Stack.Screen name="Income Details" component={IncomeDetails} />
                    <Stack.Screen name="Add Income" component={AddIncome} />
                    
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

export default LauncherApp;



