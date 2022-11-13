import React from "react";
import {
    SafeAreaView, TouchableOpacity, StyleSheet, View, StatusBar, TextInput, Pressable, Text, Alert, Button, ActivityIndicator, Image, Platform,
    PermissionsAndroid,
} from "react-native";
import { Redirect } from "react-router-native";
import styles from '../../styles/globalStyles';
import AppTextInput from "../../components/AppInputText";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Spinner from "../../components/Spinner";
import ContainerView from "../../components/ContainerView";
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import ChoosePhotoComponent from "../../components/ChoosePhotoComponent";

const SignupScreen = ({ route, navigation }) => {

    const [email, onChangeEmail] = React.useState("email Id");
    const [password, onChangePassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [filePath, setFilePath] = React.useState({});
    const [showPhotoChooser, setShowPhotoChooser] = React.useState(false);


    const onCameraClicked = () => {
        onClosePhotoChooserDialog(false);
        captureImage('photo')
    }

    const onPhotoClicked = () => {
        onClosePhotoChooserDialog(false);
        chooseFile('photo');
    };

    const onProfilePicClick = () => {
        onClosePhotoChooserDialog(true);
    };

    const onClosePhotoChooserDialog = (show) => {
        console.log('onClosePhotoChooserDialog '+show);
        setShowPhotoChooser(show);
    }


    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('base64 -> ', response.base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                setFilePath(response.assets[0]);
            });
        }
    };

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.assets[0].uri);
            setFilePath(response.assets[0]);
        });
    };

    validate = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 10000)

        if (!this.validateEmail(email)) {
            Alert.alert('Invalid Email Id')
        }
        else if (password == '') {
            Alert.alert('Invalid Password')
        }
        else {
            Alert.alert('Successfull')
        }
    }

    onSignInClick = () => {
        navigation.navigate('Signin');
    }

    onSignUpClick = () => {
        setIsLoading(true);
        Alert.alert('Signup Clicked')
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    return (
        <SafeAreaView style={styles.baseContainer}>
            <ContainerView>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ flex: 0.3, margin: 20 }}
                    onPress={onProfilePicClick}
                >
                    <Image
                        style={{ ...internalStyle.image, alignItems: 'flex-end' }}
                        source={{ uri: filePath.uri }}
                    />
                </TouchableOpacity>

                <ContainerView
                    viewStyle={{ flex: 1 }}>
                    <AppTextInput
                        keyboard='email-address'
                        hint='User Name'
                        text=''
                        onChangeText={onChangeEmail}
                        errorMessage='User Name Can not be empty'
                    />
                    <AppTextInput
                        keyboard='decimal-pad'
                        hint='Mobile Number'
                        text=''
                        onChangeText={onChangeEmail}
                        errorMessage='Invalid Mobile Number'
                    />
                    <AppTextInput
                        keyboard='email-address'
                        hint='Email'
                        text='Email Id'
                        onChangeText={onChangeEmail}
                        errorMessage='Invalid Email Id'
                    />

                    <AppTextInput
                        keyboard='default'
                        password={true}
                        hint='Password'
                        text={password}
                        onChangeText={onChangePassword}
                        errorMessage='Invalid Password'
                    />

                    <AppTextInput
                        keyboard='default'
                        password={true}
                        hint='Confirm Password'
                        text={password}
                        onChangeText={onChangePassword}
                        errorMessage='Invalid Password'
                    />

                    <AppButton
                        title='Sign up'
                        onClick={onSignUpClick}
                        isEnabled={true}
                        buttonStyle={{ paddingHorizontal: 20 }}
                    />

                    <Text
                        style={styles.appText}
                        onPress={onSignInClick}
                    >
                        {"Have Account ? Sign in Now !"}
                    </Text>
                    {isLoading
                        ? <Spinner />
                        : null
                    }

                    {showPhotoChooser ?
                        <ChoosePhotoComponent
                            cameraClicked = {onCameraClicked}
                            galleryClicked = {onPhotoClicked}
                            closeClicked = {onClosePhotoChooserDialog} /> : null}


                </ContainerView>


            </ContainerView>
        </SafeAreaView>
    );
}

const internalStyle = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    // styling the image
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
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    button: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        width: '80%',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center'
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
});


export default SignupScreen;