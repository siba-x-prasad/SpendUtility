

export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
// console.log(groupBy(['one', 'two', 'three'], 'length'));

export const getLast7DaysExpense = function (xs, key) {

    var d1 = new Date();
    var d2 = new Date(d1);

    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const filterWeeklyExpense = (expenseList) => {

    var date = new Date();
    date.setDate(date.getDate() - 8);

    let lastweekExpense = expenseList.filter(function (e) {
        return new Date(e.date) > date
    });
    return lastweekExpense;
};

export const filterMonthlyExpense = (expenseList) => {

    var date = new Date();
    date.setDate(date.getDate() - 30);

    let lastweekExpense = expenseList.filter(function (e) {
        return new Date(e.date) > date
    });
    return lastweekExpense;
};

export const grupMonthlyExpenseByCategory = (expenseList) => {

    result = expenseList.reduce(function (r, a) {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
    }, Object.create(null));

    let array = [];

    const colors = ["red", "blue", "green", "black", "yellow", "silver", "pink"];

    let colorCount = 0;

    for (const [key, value] of Object.entries(result)) {
        let sum = 0;
        value.forEach(function (valueItem) {
            sum = sum + Number(valueItem.amount);
        });

        const obj = {
            name: key, amount: sum, color: colors[colorCount],
            legendFontColor: "white",
            legendFontSize: 14
        };
        array.push(obj);
        colorCount++;
    }
    return array;
};


export const getSectionDataMonthlyExpenseByCategory = (expenseList) => {

    result = expenseList.reduce(function (r, a) {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
    }, Object.create(null));

    let array = [];

    for (const [key, value] of Object.entries(result)) {
        let sum = 0;
        value.forEach(function (valueItem) {
            sum = sum + Number(valueItem.amount);
        });

        const obj = {
            title: key, amount: sum, data: value
        }; 
        array.push(obj);
    }
    return array;
};

export const getWeeklyyExpense = (expenseList) => {

    result = expenseList.reduce(function (r, a) {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
    }, Object.create(null));

    let arrayLable = [];
    let arrayAmount = [];

    for (const [key, value] of Object.entries(result)) {
        let sum = 0;
        value.forEach(function (valueItem) {
            sum = sum + Number(valueItem.amount);
        });
        console.log( 'L:abel '+key+' amount  '+sum);
        arrayLable.push(key);
        arrayAmount.push(sum);
    }
    console.log('array '+typeof(arrayLable)+' amount '+typeof(arrayAmount));
    return [arrayLable, arrayAmount];
};

dtst = () => {
    var today = new Date();
    var priorDate = new Date(new Date().setDate(new Date().getDate() - 30));

    console.log(Math.floor(today.getTime() / 1000));
    console.log(Math.floor(priorDate.getTime() / 1000));
    const mills = Math.floor(Date.now() / 1000);
    console.log(mills);
}
