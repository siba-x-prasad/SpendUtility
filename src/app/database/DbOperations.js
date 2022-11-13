import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert, Image, TouchableOpacity } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
import ShoppingItem from '../models/ShoppingItem';

// export const deleteSHoppingItem = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'DELETE FROM  table_user where id=?',
//         [inputUserId],
//         (tx, results) => {
//           console.log('Results', results.rowsAffected);
//           if (results.rowsAffected > 0) {
//             Alert.alert(
//               'Success',
//               'User deleted successfully',
//               [
//                 {
//                   text: 'Ok',
//                   onPress: () => navigation.navigate('HomeScreen'),
//                 },
//               ],
//               { cancelable: false }
//             );
//           } else {
//             alert('Please insert a valid User Id');
//           }
//         }
//       );
//     });
//   };


  export let  onSaveToDatabase = (name, amount) =>{
    console.log('onSaveToDatabase', name+'  '+amount);
    appDatabase.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO shopping (name, amount) VALUES (?,?)',
          [name, amount],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Item Added Successfully Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => {},
                  },
                ],
                { cancelable: false }
              );
            } else alert('Failed');
          }
        );
      });
    };
  