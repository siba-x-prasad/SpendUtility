import React from "react";
import { TouchableOpacity, StyleSheet, Modal, View, FlatList, StatusBar, TextInput, Pressable, Text, Alert, Button, ActivityIndicator, Image } from "react-native";
import { Redirect } from "react-router-native";
import AppTextInput from "./AppInputText";
import AppButton from "./AppButton";
import styles from '../styles/globalStyles';
import { Dimensions } from 'react-native';
const screenWidth = (Dimensions.get('window').width);
import { useComponentDidMount, useComponentDidUpdate, useComponentWillUnmount } from '../utilities/MyReactHook';

const CategorySelectionComponent = (props) => {

    const [visible, setVisible] = React.useState(true);
    const [category, setCategory] = React.useState('');
    const [categoryList, setCategoryList] = React.useState([{ id: 1, name: 'Shopping', type: 'expense' },
    { id: 1, name: 'Grocery', type: 'expense' },
    { id: 2, name: 'Electricity', type: 'expense' },
    { id: 3, name: 'Internet', type: 'expense' },
    { id: 4, name: 'Misc', type: 'expense' },
    { id: 5, name: 'Home', type: 'expense' },
    { id: 6, name: 'Others', type: 'expense' },
    { id: 7, name: 'Shopping', type: 'expense' },
    { id: 8, name: 'Shopping', type: 'expense' },
    { id: 9, name: 'Shopping', type: 'expense' },
    { id: 10, name: 'Shopping', type: 'expense' },
    { id: 11, name: 'Shopping', type: 'expense' },
    { id: 12, name: 'Shopping', type: 'expense' },
    { id: 13, name: 'Shopping', type: 'expense' },]);

    console.log('Categories : '+props.categoryList);

    onSelectCategory = (item) => {
        setCategory(item.name);
    };

    useComponentWillUnmount(() => {
        console.log('useComponentWillUnmount called');
        setVisible(props.visible);
    });

    onCloseClicked = () => {
        props.onClose(false);
    };

    onDoneClicked = () => {
        props.onSelect(category);
    };

    const renderCategoryItem = ({ item }) => {

        const backgroundColor = "#808080";
        const textColor = "white"

        const containerStyle = item.name === category ? internalStyle.containerEnable : internalStyle.containerDisabled;
        const textStyle = item.name === category ? internalStyle.textSelect : internalStyle.textUnselect

        return (
            <TouchableOpacity style={containerStyle}  onPress={() => onSelectCategory(item)}  >
                <Text style={textStyle}> {item.name} </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal transparent={true}
            visible={visible}
            onRequestClose={this.closeModal}>

            <View style={{
                width: screenWidth,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#808080',
                borderColor: '#1F9370',
                borderWidth: 1,
                borderRadius: 5,
                marginBottom : 10
            }}>
                <View style={{
                    flex: 1,
                    width: '100%'
                }}>
                    <Text style={{ backgroundColor : 'black', textAlign: 'center', width: '100%', padding: 10, color: 'white', fontWeight: 'bold', alignSelf: 'center', textAlignVertical: 'center' }} >
                        Select Category
                    </Text>

                    <FlatList
                        style={{ flex: 4, marginTop: 5, marginBottom: 5 }}
                        data={props.categoryList}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={renderCategoryItem}
                    />


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom : 10 }}>
                        <AppButton
                            title='Done'
                            isEnabled={true}
                            buttonStyle={{ paddingHorizontal: 20, height : 40, margin : 0, marginHorizontal : 10 }}
                            onClick={
                                onDoneClicked
                            }
                        />
                        <AppButton
                            title='Close'
                            isEnabled={false}
                            buttonStyle={{ paddingHorizontal: 20, height : 40, margin : 0, marginHorizontal : 10  }}
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
    containerEnable: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin : 3
    },
    containerDisabled: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin : 3
    },
    textSelect : {
        fontSize : 16,
        fontWeight : 'bold',
        color :  'white'
    },
    textUnselect : {
        fontSize : 16,
        fontWeight : 'normal',
        color :  'black'
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

export default CategorySelectionComponent;