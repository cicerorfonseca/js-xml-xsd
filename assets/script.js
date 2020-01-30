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
      displayFlights(this);
    }
  }

  xmlHttp.open("GET", xmlUrl, true);
  xmlHttp.send();
}

function displayFlights(xml) {
  var xmlDom = xml.responseXML;

  console.log(xmlDom);

  //Date and Time
  const updatedDate = xmlDom.documentElement.attributes.getNamedItem("updatedDate");
  const updatedTime = xmlDom.documentElement.attributes.getNamedItem("updatedTime");

  document.getElementById('dateTime').innerHTML += `${updatedDate.value}, ${updatedTime.value}`;

  //Arrivals
  arrivals = xmlDom.getElementsByTagName('arrival');

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

  console.log(flights)
};