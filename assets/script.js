/*
  Author:     Cicero Raldi da Fonseca
  ID:         0898946
  Date:       01-17-2020
  Purpose:    Web Programming with XML - Project 01
*/


//GLOBALS
const flightsUrl = "flights.xml";
let flights = [];

function loadXMLDoc() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let xmlDoc = request.responseXML;
      let xmlFlights = xmlDoc.documentElement.children;
      let dateTime = document.getElementById('dateTime');

      for (let i = 0; i < xmlFlights.length; i++) { //<flights> children
        if (xmlFlights[i].tagName === 'updatedDate') { //get updated date
          dateTime.innerHTML += xmlFlights[i].innerHTML + ', ';
        } else if (xmlFlights[i].tagName === 'updatedTime') { //get updated time
          dateTime.innerHTML += xmlFlights[i].innerHTML;
        } else if (xmlFlights[i].tagName === 'arrivals') { //get arrivals
          for (let j = 0; j < xmlFlights[i].children.length; j++) { //<arrivals> children
            flights.push(['arr', xmlFlights[i].children[j].id]);
            for (let x = 0; x < xmlFlights[i].children[j].children.length; x++) { //<flight> children
              flights[j].push(xmlFlights[i].children[j].children[x].innerHTML); //<flight> attributes
            }
          }
        } else if (xmlFlights[i].tagName === 'departures') { //get departures
          for (let j = 0; j < xmlFlights[i].children.length; j++) { //<departures> children
            flights.push(['dep', xmlFlights[i].children[j].id]);
            for (let x = 0; x < xmlFlights[i].children[j].children.length; x++) { //<flight> children
              flights[flights.length - 1].push(xmlFlights[i].children[j].children[x].innerHTML); //<flight> attributes
            }
          }
        }
      }
    };

    displayFlights();
  }

  console.log(request);

  request.open("GET", flightsUrl);
  request.send();
};

function displayFlights() {
  let arrivalsTable = document.getElementById('arrivalsTable').getElementsByTagName('tbody')[0];

  let departuresTable = document.getElementById('departuresTable').getElementsByTagName('tbody')[0];

  //populate arrivals table
  for (let i = 0; i < flights.length; i++) {
    //get the table rows length to use as index so the insertrow will add to the end of table
    let tableIndex = arrivalsTable.rows.length;

    //'arr' = <arrivals>
    if (flights[i][0] === 'arr') {
      var arrRow = arrivalsTable.insertRow(tableIndex);
      //-1 because the first index must not be printed
      for (let x = 0; x < flights[i].length - 1; x++) {
        var arrCell = arrRow.insertCell(x).innerHTML = flights[i][x + 1];
      }
      tableIndex++;
    }
  }

  //populate departures table
  for (let j = 0; j < flights.length; j++) {
    //get the table rows length to use as index so the insertrow will add to the end of table
    let tableIndex = departuresTable.rows.length;

    //'dep' = <departures>
    if (flights[j][0] === 'dep') {
      var depRow = departuresTable.insertRow(tableIndex);
      //-1 because the first index must not be printed
      for (let k = 0; k < flights[j].length - 1; k++) {
        var depCell = depRow.insertCell(k).innerHTML = flights[j][k + 1];
      }
      tableIndex++;
    }
  }
};