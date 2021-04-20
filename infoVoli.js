const API_KEY = '792898ddad7f8991f83eed9dfaaf9801';
const iata = 'CDG';
const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + '&dep_iata=' + iata; 
console.log(url);
//const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY; 


function onJson (json){
    json
    console.log(json);
}

function onResponse (response){
    console.log(response.status);
    return response.json();
}

fetch(url).then(onResponse).then(onJson);

function search(event){
    event.preventDefault();
    
    const departureValue = encodeURIComponent(form.departureAirport.value);
    console.log(departureValue);
    const arrivalValue = encodeURIComponent(form.arrivalAirport.value);
    console.log(arrivalValue);
    const dataValue = encodeURIComponent(form.date.value);
    console.log(dataValue);

    //Se aeroporto di partenza e aeroporto di arrivo coincidono...
    if(departureValue === arrivalValue){
        alert('Occorre scegliere Aeroporto di Partenza e Aeroporto di Arrivo diversi fra loro');
    }
    //Se non è stata selezionata una data...
    if(dataValue === ''){
        alert('Occorre scegliere una data.');
    }
}

const form = document.forms['searchFlight'];
form.addEventListener('submit', search);