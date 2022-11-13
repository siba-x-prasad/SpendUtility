import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';
import ContainerView from "../components/ContainerView";
import appDatabaseSetup from '../services/AppDatabaseSetup';
import { useComponentDidMount } from '../utilities/MyReactHook';

const SplashScreen = ({ route, navigation }) => {

  let isDefaultDataAvailable = false;

  useEffect(() => {
    retrieveAppState();
  }, []);


  useComponentDidMount(() => {
    setTimeout(function(){  
        navigation.navigate('dashboard');
      }, 3000);  
});

  

  retrieveAppState = () => {
    AsyncStorage.getItem('appInstall').then(asyncStorageRes => {
      console.log('AsyncStorage ' + JSON.parse(asyncStorageRes))
      if (asyncStorageRes == null) {
        const value = {
          data: "Available"
        };

        AsyncStorage.setItem('appInstall', JSON.stringify(value));
        console.log('Data Available');
        appDatabaseSetup.createCategoryTable();
        appDatabaseSetup.insertDefaultCategory();
      }
      createTables();
    });
  };

  createTables = () => { 
    appDatabaseSetup.createSplitExpanseDatabaseTable();
    appDatabaseSetup.createExpenseDatabase();
    appDatabaseSetup.createIncomeDatabase();
    appDatabaseSetup.createShoppingTable();
    appDatabaseSetup.getCategoryCount(); 
  };


  return (
    <SafeAreaView style={styles.baseContainer}>
      <ContainerView>
        <View style={{ ...styles.baseContainer, justifyContent: 'center' }}>
          <Text style={{ color: '#1F9370', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Welcome To spend
          </Text>
          <Text style={{ color: '#1F9370', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
              Spend Utility Application
          </Text>
          <Image
            style={{ width: 300, height: 300 }}
            source={require('../../assets/app_icon.png')}
          />
        </View>
      </ContainerView>
    </SafeAreaView>
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
    marginHorizontal: 10
  },
});


export default SplashScreen;