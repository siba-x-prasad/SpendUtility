import appDatabase from "../database/appDatabase";
import EXPENSE_INCOME_CATEGORY from '../utilities/Constants';
const TABLE_EXPENSE = 'expense';
const TABLE_CATEGORY = 'category';
const TABLE_INCOME = 'income';
const TABLE_SHOPPING = 'shopping';
const TABLE_SPLIT_BILL = 'splitBill';

const QUERY_TABLE_EXPENSE = "SELECT name FROM sqlite_master WHERE type='table' AND name='expense'";
const QUERY_TABLE_CATEGORY = "SELECT name FROM sqlite_master WHERE type='table' AND name='category'";
const QUERY_TABLE_INCOME = "SELECT name FROM sqlite_master WHERE type='table' AND name='income'";
const QUERY_TABLE_SHOPPING = "SELECT name FROM sqlite_master WHERE type='table' AND name='shopping'";
const QUERY_TABLE_SPLIT_BILL = "SELECT name FROM sqlite_master WHERE type='table' AND name='splitBill'";

const CREATE_TABLE_EXPENSE = 'CREATE TABLE IF NOT EXISTS ' + TABLE_EXPENSE + '(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30),  amount VARCHAR(30), category VARCHAR(12), date VARCHAR(12), time REAL, repeat INTEGER(0))';
const CREATE_TABLE_INCOME = 'CREATE TABLE IF NOT EXISTS ' + TABLE_INCOME + '(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30),  amount VARCHAR(30), category VARCHAR(12), date VARCHAR(12), time REAL, repeat INTEGER(0))';
const CREATE_TABLE_CATEGORY = 'CREATE TABLE IF NOT EXISTS ' + TABLE_CATEGORY + '(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30),  type VARCHAR(7))';
const CREATE_TABLE_SHOPPING = 'CREATE TABLE IF NOT EXISTS ' + TABLE_SHOPPING + '(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20),  amount VARCHAR(30), date VARCHAR(12), done INTEGER(0) )';
const CREATE_TABLE_SPLIT_EXPENSE = 'CREATE TABLE IF NOT EXISTS ' + TABLE_SPLIT_BILL + '(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), expenseName VARCHAR(30),  amount VARCHAR(30), message VARCHAR(12), date VARCHAR(12),  time REAL,  status INTEGER(0), groupName VARCHAR(12))';

class AppDatabaseSetup {

    createSplitExpanseDatabaseTable = () => {
        console.log('createIncomeDatabase');
        appDatabase.transaction(function (txn) {
            txn.executeSql(
                QUERY_TABLE_SPLIT_BILL,
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS ' + TABLE_SPLIT_BILL, []);
                        txn.executeSql(
                            CREATE_TABLE_SPLIT_EXPENSE,
                            []
                        );
                    }
                }
            );
        });
    };

    createIncomeDatabase = () => {
        console.log('createIncomeDatabase');
        appDatabase.transaction(function (txn) {
            txn.executeSql(
                QUERY_TABLE_INCOME,
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS expense', []);
                        txn.executeSql(
                            CREATE_TABLE_INCOME,
                            []
                        );
                    }
                }
            );
        });
    };

    createCategoryTable = () => {
        console.log('createCategoryTable');
        appDatabase.transaction(function (txn) {
            txn.executeSql(
                QUERY_TABLE_CATEGORY,
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS category', []);
                        txn.executeSql(
                            CREATE_TABLE_CATEGORY,
                            []
                        );
                    }
                }
            );
        });
    };

    createExpenseDatabase = () => {
        console.log('createExpenseDatabase');
        appDatabase.transaction(function (txn) {
            txn.executeSql(
                QUERY_TABLE_EXPENSE,
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS expense', []);
                        txn.executeSql(
                            CREATE_TABLE_EXPENSE,
                            []
                        );
                    }
                }
            );
        });
    };

    createShoppingTable = () => {
        console.log('createShoppingTable');
        appDatabase.transaction(function (txn) {
            txn.executeSql(
                QUERY_TABLE_SHOPPING,
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS shopping', []);
                        txn.executeSql(
                            CREATE_TABLE_SHOPPING,
                            []
                        );
                    }
                }
            );
        });
    };


    insertDefaultCategory = () => {
        console.log('insertDefaultCategory');
        EXPENSE_INCOME_CATEGORY.forEach(element => {
            appDatabase.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO category (name, type) VALUES (?,?)',
                    [element.name, element.type],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                        } else alert('Failed');
                    }
                );
            });
        });
    };

    getCategoryCount = () => {
        console.log('getCategoryCount');
        appDatabase.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM category',
                [],
                (tx, results) => {
                    console.log('CATEGORY COUNT IS = ' + results.rows.length);
                    count = results.rows.length;
                    if (count == 0) {
                        console.log('inside condition');
                        insertDefaultCategory();
                    }
                }
            );
        });
    };
}

const appDatabaseSetup = new AppDatabaseSetup();

export default appDatabaseSetup;
