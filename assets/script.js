/*
  Author:     Cicero Raldi da Fonseca
  ID:         0898946
  Date:       01-17-2020
  Purpose:    Web Programming with XML - Project 01
*/

//GLOBALS
const xmlUrl = 'flights-1.xml';
let flights = [];

function loadXMLDoc() {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      //Read the XML request and populate the flights array
      populateFlights(this);

      //Populate the html table according to the flights array data
      populateTable();
    }
  }

  xmlHttp.open("GET", xmlUrl, true);
  xmlHttp.send();
}

function populateFlights(xml) {
  var xmlDom = xml.responseXML;

  //Date and Time
  const updatedDate = xmlDom.getElementsByTagName('updatedDate');
  const updatedTime = xmlDom.getElementsByTagName('updatedTime');

  document.getElementById('dateTime').innerHTML += `${updatedDate[0].firstChild.nodeValue}, ${updatedTime[0].firstChild.nodeValue}`;

  //Arrivals
  const arrivals = xmlDom.getElementsByTagName('arrival');

  for (i = 0; i < arrivals.length; i++) {
    const arrivalsList = arrivals[i].children;
    flights.push(['arr']); //Identifies an arrival in the flights array
    for (j = 0; j < arrivalsList.length; j++) {
      flights[i].push(arrivalsList[j].firstChild.nodeValue);
    }
  }

  //Departures
  const departures = xmlDom.getElementsByTagName('departure');

  for (i = 0; i < departures.length; i++) {
    const departuresList = departures[i].children;
    flights.push(['dep']); //Identifies an departure in the flights array
    for (j = 0; j < departuresList.length; j++) {
      flights[flights.length - 1].push(departuresList[j].firstChild.nodeValue);
    }
  }

  console.log(flights);
};

function populateTable() {
  //Get table element by tag name so the header is not changed when the table is displayed
  let arrivalsTable = document.getElementById('arrivalsTable').getElementsByTagName('tbody')[0];
  let departuresTable = document.getElementById('departuresTable').getElementsByTagName('tbody')[0];

  //Populate arrivals table
  for (let i = 0; i < flights.length; i++) {
    //Get the table rows length to use as index so the insertrow will add to the end of table
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

  //Populate departures table
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