import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

export default RadioButton = (props) => {
    
    return (
        <View key={props.title} style = {{flexDirection : 'row', flex : 1, justifyContent : 'space-around'}}>
            <TouchableOpacity style={styles.btn} onPress = {() =>  props.onCheck(props.title) }>
                {props.checked ?
                    <Image style={styles.img} source={require("../../assets/radio_enabled.png")} />
                    : <Image style={styles.img} source={require("../../assets/radio_disabled.png")} />}
                <Text style ={{paddingStart : 10}} >{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    img: {
        height: 20,
        width: 20
    },
    btn: {
        flexDirection: 'row'
    }
});
