import { openDatabase } from 'react-native-sqlite-storage';
import ShoppingItem from '../models/ShoppingItem';

const tableNameShopping = 'shopping';
 

var appDatabase = openDatabase({ name: 'UserDatabase.db' });

export default appDatabase;