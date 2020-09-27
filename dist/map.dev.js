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


var state, data;

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


var tt_list = [];

function getmonthnewcases() {
  var i, sumy, z;
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
            _context6.next = 29;
            break;
          }

          sumy = 0;
          z = listy[i];

        case 11:
          if (!(z <= listy[i + 1])) {
            _context6.next = 26;
            break;
          }

          if (!(data[isocount]["data"][z].hasOwnProperty("total_cases_per_million") == true)) {
            _context6.next = 17;
            break;
          }

          sumy += Number(data[isocount]["data"][z]["total_cases_per_million"]);
          tt_list[i] = sumy;
          _context6.next = 20;
          break;

        case 17:
          if (!(data[isocount]["data"][z].hasOwnProperty("total_cases_per_million") == false)) {
            _context6.next = 20;
            break;
          }

          data[isocount]["data"][z]["total_cases_per_million"] = sumy;
          return _context6.abrupt("continue", 23);

        case 20:
          if (!(z == data[isocount]["data"].length - 1)) {
            _context6.next = 22;
            break;
          }

          return _context6.abrupt("break", 26);

        case 22:
          console.log(data[isocount]["data"][z]["date"], sumy, data[isocount]["data"][z]["total_cases_per_million"]);

        case 23:
          z++;
          _context6.next = 11;
          break;

        case 26:
          i++;
          _context6.next = 8;
          break;

        case 29:
          console.log(tt_list);
          _context6.next = 35;
          break;

        case 32:
          _context6.prev = 32;
          _context6.t0 = _context6["catch"](6);
          console.log(_context6.t0);

        case 35:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 32]]);
}