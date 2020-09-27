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
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "whitesmoke",
                    borderColr: "blue",
                    pointRadius: 2.1,
                    label: "#test",
                    data: tt_list,
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
var state, data;
async function getjsondata() {
    try {
        state = await fetch('https://covid.ourworldindata.org/data/owid-covid-data.json');
        data = await state.json();
    } catch (err) {
        console.log(err);
    }
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
var mont = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
async function getmonthsum() {
    var resum = 0;
    for (let i = 0; i <= 12; i++) {
        resum = resum + mont[i];
        listy[i] = resum
    }
}

/*Getting the value of the total test cases for each country*/
var tt_list = [];
async function getmonthnewcases() {

    await getmonthsum();
    await getjsondata();
    await getCountry();

    try {
        for (let i = 0; i < 12; i++) {
            var sumy = 0;
            for (let z = listy[i]; z <= listy[i + 1]; z++) {
                if (data[isocount]["data"][z].hasOwnProperty("total_cases_per_million") == true) {
                    sumy += Number(data[isocount]["data"][z]["total_cases_per_million"]);
                    tt_list[i] = sumy;
                } else if (data[isocount]["data"][z].hasOwnProperty("total_cases_per_million") == false) {
                    data[isocount]["data"][z]["total_cases_per_million"] = sumy;
                    continue;
                }
                if (z == data[isocount]["data"].length - 1) {
                    break;
                }
                console.log(data[isocount]["data"][z]["date"], sumy, data[isocount]["data"][z]["total_cases_per_million"]);
            }
        }
        console.log(tt_list);
    } catch (err) {
        console.log(err);
    }

}