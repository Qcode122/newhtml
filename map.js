/* Variables for the code */
var data, state, date, date_val, numloops, glob_date, mil_case, jsontext, tcases, kk;
var months = [
    "January", "February",
    "March", "April",
    "May", "June",
    "July", "August",
    "September", "October",
    "November", "December"
]
var tbb = [];
const table = [];
const date_table = [];
const date_list = [];
const mill_c = [];
const countries = new Array();
var isocodes = {};
const table_country = new Array(1);
var isocount, insel;
var month = new Array();
/*var month_number = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
};
var month_lengths = {
        "January": 31,
        "February": 29,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31
    }*/
/*--------------------------------*/

/* Getting the graph from the json data */
async function getChart() {

    await getmonthnewcases();

    try {
        var ctx = document.getElementById('container').getContext('2d');
        const mychart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: "#test",
                    data: months,
                    backgroundColor: '#af90ca'
                }]
            },
            options: {
                maintainAspectRatio: true,
                responsive: false,
            }
        });
    } catch (err) {
        console.log(err);
    }
}

/* Getting json data */
async function getjsondata() {
    state = await fetch('https://covid.ourworldindata.org/data/owid-covid-data.json');
    data = await state.json();
}

/* Getting the country iso code from the csv file*/
async function getCountryisocode() {
    const country_iso = await fetch("countryiso.csv");
    const country = await country_iso.text();
    const countrycsv = country.split("\n").slice(1);
    for (let i = 0; i < 246; i++) {
        countries[i] = countrycsv;
    }
    for (let i = 0; i < 246; i++) {
        table_country[i] = countries[0][i].split(',')
        isocodes[table_country[i][2]] = table_country[i][0];
    }
}
/* Iterating the countries iso code into a variable
to be used in the code*/
async function getCountry() {
    await getCountryisocode();

    html_country = document.getElementById('count').value;
    for (var v in isocodes) {
        if (html_country == isocodes[v]) {
            isocount = v;
        }
    }
}
/* Iterating the month lengths into a list*/
var listy = [];
var mont = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
async function getmonthsum() {
    var resum = 0;
    for (let i = 0; i < 12; i++) {
        resum = resum + mont[i];
        listy[i] = resum
    }
}

/*Getting the value of the total test cases for each country*/
var sumy = 0;
var tt_list = [];
async function getmonthnewcases() {

    await getjsondata();
    await getmonthsum();
    await getCountry();

    for (let i = 0; i < 12; i++) {
        for (let z = listy[i]; z < listy[i + 1]; z++) {
            if (data[isocount]['data'][z].hasOwnProperty(data[isocount]['data'][z]['total_cases_per_million']) == true) {
                sumy += data[isocount]['data'][z]['total_cases_per_million']
            }
        }
        tt_list[i] = sumy;
    }
    console.log(tt_list);
}

/* Get value from the api */
/*async function getjsonapi() {
    await getjsondata();
    await getCountry();
    await changemonthlengths();
    try {
        for (date_val; date_val <= numloops; date_val++) {
            jsontext = data[isocount]["data"][date_val]["date"];
            table.push(jsontext);
        }
    } catch (err) {
        console.log(err);
    }
}*/

/*var tble = [];
var sum = 0;
var vvv;
var obb;
*/
/* Getting the month and dates from the json api*/
/*async function changemonthlengths() {
    await changemonth();
    for (v in month_number) {
        if (insel == v) {
            for (vv in month_lengths) {
                if (insel == vv) {
                    for (let i = month_number[v] - 1; i >= 0; i--) {
                        obb = Object.keys(month_lengths)[i];
                        vvv = month_lengths[obb];
                        sum = sum + vvv;
                    }
                    date_val = sum;
                    numloops = date_val + month_lengths[vv];
                }
            }
        }
    }
    console.log(insel, numloops, date_val);
}*/

/* Get value from the select element in html */
/*async function changemonth() {
    var getopt = document.getElementById('dropmonth');
    insel = getopt.options[getopt.selectedIndex].textContent;
}*/

/* Getting the total test case for each month from the json api*/
/*var total_month_dict = {}
async function getTotalCases() {
    await getCountry();
    await changemonthlengths();
    await getjsondata();

    for (date_val; date_val <= numloops; date_val++) {
        mil_case = data[isocount]['data'][date_val]['total_cases_per_million'];
        mill_c[date_val] = mil_case;
    }
    console.log(mill_c);
}*/

/* Getting the sum of data from the api for each country*/
/*var sum_month = 0;
var show_sum;
async function sumtotaltestmonth() {
    await getTotalCases()
    for (let i = 0; i < mill_c.length; i++) {
        sum_month = sum_month + mill_c[i];
    }
    show_sum = sum_month;
}*/