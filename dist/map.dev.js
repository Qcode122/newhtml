"use strict";

/* Variables for the code */
var data, state, date, date_val, numloops, glob_date, mil_case, jsontext, tcases, kk;
var zero = 0;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var tbb = [];
var table = [];
var date_table = [];
var date_list = [];
var mill_c = [];
var countries = new Array();
var isocodes = {};
var table_country = new Array(1);
var isocount, insel;
var month = new Array();
var month_number = {
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
};
/*--------------------------------*/

function rel() {
  return regeneratorRuntime.async(function rel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          setTimeout(function () {
            document.location.reload();
          }, 30000);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}
/* Getting the graph from the json data */


function getchart() {
  var ctx, mychart;
  return regeneratorRuntime.async(function getchart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getmonthnewcases());

        case 2:
          ctx = document.getElementById('container').getContext('2d');
          mychart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: months,
              datasets: [{
                barThickness: 6,
                barPercentage: 0.5,
                maxBarThickness: 8,
                minBarLength: 2,
                label: "#test",
                data: tt_list,
                backgroundColor: '#af90ca'
              }]
            },
            options: {
              maintainAspectRatio: true,
              responsive: false
            }
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/* Getting json data */


function getjsondata() {
  return regeneratorRuntime.async(function getjsondata$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch('https://covid.ourworldindata.org/data/owid-covid-data.json'));

        case 2:
          state = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(state.json());

        case 5:
          data = _context3.sent;

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/* Getting the country iso code from the csv file*/


function getCountryisocode() {
  var country_iso, country, countrycsv, i, _i;

  return regeneratorRuntime.async(function getCountryisocode$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("countryiso.csv"));

        case 2:
          country_iso = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(country_iso.text());

        case 5:
          country = _context4.sent;
          countrycsv = country.split("\n").slice(1);

          for (i = 0; i < 246; i++) {
            countries[i] = countrycsv;
          }

          for (_i = 0; _i < 246; _i++) {
            table_country[_i] = countries[0][_i].split(',');
            isocodes[table_country[_i][2]] = table_country[_i][0];
          }

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
}
/* Iterating the countries iso code into a variable
to be used in the code*/


function getCountry() {
  var v;
  return regeneratorRuntime.async(function getCountry$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(getCountryisocode());

        case 2:
          html_country = document.getElementById('count').value;

          for (v in isocodes) {
            if (html_country == isocodes[v]) {
              isocount = v;
            }
          }

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}

var listy = [];
var mont = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getmonthsum() {
  var resum, i;
  return regeneratorRuntime.async(function getmonthsum$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          resum = 0;

          for (i = 0; i < 12; i++) {
            resum = resum + mont[i];
            listy[i] = resum;
          }

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}
/*Getting the value of the total test cases for each country*/


var sumy = 0;
var tt_list = [];

function getmonthnewcases() {
  var date_lists, date_l, i, z, lis;
  return regeneratorRuntime.async(function getmonthnewcases$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(getjsondata());

        case 2:
          _context7.next = 4;
          return regeneratorRuntime.awrap(getmonthsum());

        case 4:
          _context7.next = 6;
          return regeneratorRuntime.awrap(getCountry());

        case 6:
          date_lists = data[isocount]['data'].length;
          date_l = data[isocount]['data'];
          i = 0;

        case 9:
          if (!(i < 12)) {
            _context7.next = 28;
            break;
          }

          z = listy[i];

        case 11:
          if (!(z < listy[i + 1])) {
            _context7.next = 25;
            break;
          }

          lis = data[isocount]['data'][listy[i]];

          if (!(data[isocount]['data'][listy[i]]['total_cases_per_million'] in lis)) {
            _context7.next = 20;
            break;
          }

          sumy = sumy + data[isocount]['data'][listy[i]]['total_cases_per_million'];
          tt_list[i] = sumy;

          if (!(z == date_lists - 1)) {
            _context7.next = 18;
            break;
          }

          return _context7.abrupt("break", 25);

        case 18:
          _context7.next = 22;
          break;

        case 20:
          if (!(!data[isocount]['data'][listy[i]]['total_cases_per_million'] in lis)) {
            _context7.next = 22;
            break;
          }

          return _context7.abrupt("continue", 22);

        case 22:
          z++;
          _context7.next = 11;
          break;

        case 25:
          i++;
          _context7.next = 9;
          break;

        case 28:
          console.log(tt_list);

        case 29:
        case "end":
          return _context7.stop();
      }
    }
  });
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