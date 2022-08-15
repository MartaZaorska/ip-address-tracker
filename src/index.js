import 'leaflet/dist/leaflet.css';
import "./style/index.css";

import L from 'leaflet/dist/leaflet.js';
import UI from './UI';
import * as utils from './utils';

import iconSVG from './images/icon-location.svg';

const mapElement = document.getElementById("map");
const formElement = document.getElementById("ip-form");

//Map initialization and configuration
const map = L.map(mapElement, { zoomControl: false });
const icon = L.icon({iconUrl: iconSVG, iconSize: [46, 56], iconAnchor: [23, 56]});
const marker = L.marker([37.40599, -122.078514], {icon}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<span class="map__footer">&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</span>',
}).addTo(map);

map.setView([37.40599, -122.078514], 15);

function setMarker(position){
  marker.setLatLng(position);
  map.flyTo(position, 15);
}

async function getData(data = {}){
  const resultData = await utils.fetchData(data);
  if(!Array.isArray(resultData) && resultData.messages) return UI.displayMessage(resultData.messages);
  UI.displayResult(resultData);
  setMarker(resultData[0]);
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const { ipOrDomain } = e.target.elements;
  if(ipOrDomain?.value === "") return UI.displayMessage("Please enter a valid IP address or domain name");

  const data = { ipAddress: "", domain: "" };

  if(utils.validateIPAddress(ipOrDomain.value)){
    data.ipAddress = ipOrDomain.value;
  }else if(utils.validateDomainName(ipOrDomain.value)){
    data.domain = ipOrDomain.value;
  }else{
    return UI.displayMessage("Please enter a valid IP address or domain name.");
  }

  getData(data);
  e.target.reset();
});

getData();