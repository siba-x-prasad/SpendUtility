import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from "react-router-native";
import styles from '../../styles/globalStyles';
import AppTextInput from "../../components/AppInputText";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Spinner from "../../components/Spinner";
import ContainerView from "../../components/ContainerView";
import appDatabase from '../../database/appDatabase';
import appDatabaseSetup from '../../services/AppDatabaseSetup';
import EXPENSE_INCOME_CATEGORY from '../../utilities/Constants';

const OnBoardingScreen = ({ route, navigation }) => {

  let isDefaultDataAvailable = false;

  useEffect(() => {
    retrieveAppState();
  }, []);


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


  const [isLoading, setIsLoading] = React.useState(false);
  onSignInClick = () => {
    setIsLoading(true);
    navigation.navigate('Signin');
  }



  onSignUpClick = () => {
    setIsLoading(true);
    navigation.navigate('Signup');
    // Alert.alert('Signup Clicked')
  }

  onGoogleClick = () => {
    setIsLoading(true);
    Alert.alert('Google')
  }

  onFacebookClick = () => {
    setIsLoading(true);
    Alert.alert('Facebook')
  }

  return (
    <SafeAreaView style={styles.baseContainer}>
      <ContainerView>
        <View style={{ ...styles.baseContainer, justifyContent: 'center' }}>
          <Text style={{ color: '#1F9370', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
            Welcome to Spend Utility
          </Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={require('../../../assets/app_icon.png')}
          />
        </View>
        <View style={{ backgroundColor: 'black', width: 5000, height: 1 }}></View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: '#1F9370', fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
            Sign In With
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center' }}>

            <Image
              style={internalStyle.smallImage}
              source={require('../../../assets/google.png')}
            />

            <Image
              style={internalStyle.smallImage}
              source={require('../../../assets/facebook.png')}
            />

          </View>
          <Text style={{ color: '#1F9370', fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>
            OR
          </Text>
          <View style={{ alignSelf: 'center', flexDirection: 'row', position: 'absolute', justifyContent: 'center', bottom: 0 }}>
            <AppButton
              buttonStyle={{ flex: 1 }}
              isEnabled={true}
              onClick={onSignInClick}
              title='Sign In'
            />
            <AppButton
              buttonStyle={{ flex: 1 }}
              isEnabled={true}
              onClick={onSignUpClick}
              title='Sign Up'
            />
          </View>
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


export default OnBoardingScreen;