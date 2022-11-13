import React from "react";
import { SafeAreaView, StyleSheet, Modal, View, StatusBar, TextInput, Pressable, Text, Alert, Button, ActivityIndicator, Image } from "react-native";
import { Redirect } from "react-router-native";
import AppTextInput from "./AppInputText";
import AppButton from "./AppButton";
import styles from '../styles/globalStyles';
import { Dimensions } from 'react-native';
const screenWidth = (Dimensions.get('window').width);
import { useComponentDidMount, useComponentDidUpdate, useComponentWillUnmount } from '../utilities/MyReactHook';

const ForgotPasswordComponent = (props) => {

    const [visible, setVisible] = React.useState(true);

    useComponentWillUnmount(() => {
        console.log('useComponentWillUnmount called');
        setVisible(props.visible);
    });

    onCloseClicked = () => {
        props.parentCallback(false);
    };



    return (
        <Modal transparent={true}
            visible={visible}
            onRequestClose={this.closeModal}>
            <View style={{
                width: screenWidth,
                height: 200,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#808080',
                borderColor: '#1F9370',
                borderWidth: 1,
                borderRadius: 5,
            }}>
                <View style={{
                    flex: 1,
                    width: '100%'
                }}>
                    <Text style={{ textAlign: 'center', width: '100%', padding: 10, color: 'white', fontWeight: 'bold', alignSelf: 'center', textAlignVertical: 'center' }} >
                        Forgot Password
                    </Text>

                    <TextInput
                        style={{ ...styles.input, width: '98%', margin: 2, }}
                        keyboardType='default'
                        placeholder='Enter Email Id'
                        autoFocus={true}
                        returnKeyType="done"
                        maxLength={25}
                    />


                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <AppButton
                            title='Verify'
                            isEnabled={true}
                            buttonStyle={{ paddingHorizontal: 20 }}
                        />
                        <AppButton
                            title='Close'
                            isEnabled={false}
                            buttonStyle={{ paddingHorizontal: 20 }}
                            onClick={
                                onCloseClicked
                            }
                        />
                    </View>

                </View>
            </View>
        </Modal>
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

export default ForgotPasswordComponent;