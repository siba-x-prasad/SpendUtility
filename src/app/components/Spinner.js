import React from "react";
import { SafeAreaView, TextInput, Pressable, Text, Alert, Button, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Redirect } from "react-router-native";


const Spinner = () => {
  return (
    <ActivityIndicator
      animating={true}
      size="large"
      hidesWhenStopped={true}
      color="#0000ff" />
  );
}

export default Spinner;


const styleInternal = StyleSheet.create({
  spinnerStyle: {
    backgroundColor: '#ee6e73',
    position: 'absolute',
  },
  inputDark: {
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    placeholderTextColor: "#000",
    backgroundColor: 'white',
    fontSize: 18,
    borderRadius: 6,
    flexDirection: 'row',
    color: '#000'
  },
  inputLight: {
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    placeholderTextColor: "white",
    backgroundColor: 'black',
    fontSize: 18,
    borderRadius: 6,
    flexDirection: 'row',
  },
  errorMessage: {
    fontSize: 10,
    color: "red"
  }
});