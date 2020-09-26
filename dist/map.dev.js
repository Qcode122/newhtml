"use strict";

/* Variables for the code */
var data, state, date, date_val, numloops, glob_date, mil_case, jsontext, tcases, kk;
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

function getChart() {
  var ctx, mychart;
  return regeneratorRuntime.async(function getChart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getmonthnewcases());

        case 2:
          try {
            ctx = document.getElementById('container').getContext('2d');
            mychart = new Chart(ctx, {
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
                  data: tt_list
                }]
              },
              options: {
                maintainAspectRatio: true,
                responsive: false
              }
            });
          } catch (err) {
            console.log(err);
          }

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}
/* Getting json data */


function getjsondata() {
  return regeneratorRuntime.async(function getjsondata$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch('https://covid.ourworldindata.org/data/owid-covid-data.json'));

        case 3:
          state = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(state.json());

        case 6:
          data = _context2.sent;
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}
/* Getting the country iso code from the csv file*/


function getCountryisocode() {
  var country_iso, country, countrycsv, i, _i;

  return regeneratorRuntime.async(function getCountryisocode$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("countryiso.csv"));

        case 2:
          country_iso = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(country_iso.text());

        case 5:
          country = _context3.sent;
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
          return _context3.stop();
      }
    }
  });
}
/* Iterating the countries iso code into a variable
to be used in the code*/


function getCountry() {
  var v;
  return regeneratorRuntime.async(function getCountry$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
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
          return _context4.stop();
      }
    }
  });
}
/* Iterating the month lengths into a list*/


var listy = [];
var mont = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getmonthsum() {
  var resum, i;
  return regeneratorRuntime.async(function getmonthsum$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          resum = 0;

          for (i = 0; i <= 12; i++) {
            resum = resum + mont[i];
            listy[i] = resum;
          }

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}
/*Getting the value of the total test cases for each country*/


var sumy = 0;
var tt_list = [];

function getmonthnewcases() {
  var i, z;
  return regeneratorRuntime.async(function getmonthnewcases$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(getmonthsum());

        case 2:
          _context6.next = 4;
          return regeneratorRuntime.awrap(getjsondata());

        case 4:
          _context6.next = 6;
          return regeneratorRuntime.awrap(getCountry());

        case 6:
          _context6.prev = 6;
          i = 0;

        case 8:
          if (!(i < 12)) {
            _context6.next = 28;
            break;
          }

          z = listy[i];

        case 10:
          if (!(z <= listy[i + 1])) {
            _context6.next = 25;
            break;
          }

          if (!(data[isocount]["data"][z].hasOwnProperty("total_cases_per_million") == true)) {
            _context6.next = 16;
            break;
          }

          sumy += Number(data[isocount]["data"][z]["total_cases_per_million"]);
          tt_list[i] = sumy;
          _context6.next = 19;
          break;

        case 16:
          if (!(data[isocount]["data"][z].hasOwnProperty("total_cases_per_million") == false)) {
            _context6.next = 19;
            break;
          }

          data[isocount]["data"][z]["total_cases_per_million"] = sumy;
          return _context6.abrupt("continue", 22);

        case 19:
          if (!(z == data[isocount]["data"].length - 1)) {
            _context6.next = 21;
            break;
          }

          return _context6.abrupt("break", 25);

        case 21:
          console.log(data[isocount]["data"][z]["date"], sumy, data[isocount]["data"][z]["total_cases_per_million"]);

        case 22:
          z++;
          _context6.next = 10;
          break;

        case 25:
          i++;
          _context6.next = 8;
          break;

        case 28:
          console.log(tt_list);
          _context6.next = 34;
          break;

        case 31:
          _context6.prev = 31;
          _context6.t0 = _context6["catch"](6);
          console.log(_context6.t0);

        case 34:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 31]]);
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