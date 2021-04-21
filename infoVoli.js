const API_KEY = '792898ddad7f8991f83eed9dfaaf9801';
let dateValue = undefined; //variabile globale

//const iata = 'CDG';
//const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + '&dep_iata=' + iata; 
//const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY; 

//funzione che riceve un flight e lo aggiunge dinamicamente nella griglia dei voli, inizialmente nascosta
function addFlight(flight){
    
    
    
}

//funzione che gestisce il file .json restituito da aviationStack inseguito a richiesta
function onJson (json){
    const flightGrid = document.querySelector('#flightGrid');
    flightGrid.innerHTML = '';
    
        const num = json.data.length;
        console.log('Numero di elementi restituiti: ' + num);
        for(let i=0; i < num; i++){
            doc = json.data[i];
            //console.log('Data: ' + doc.flight_date + '\n');
            if(doc.flight_date === dateValue){
                console.log('Ho trovato una corrispondenza in data' + dateValue);
                //aggiungo dinamicamente il volo per cui ho trovato una corrispondenza
                //flight_number = doc.flight.number;
                console.log('Numero di volo n.' + i + ': ' + doc.flight.number + '\n');
                console.log(doc.departure.airport + ' ' + doc.departure.iata + '\n');
                console.log(doc.arrival.airport + ' ' + doc.arrival.iata + '\n');
                console.log(doc.departure.scheduled + '\n'); //gestione data mediante apposita funzione
                console.log(doc.arrival.scheduled + '\n'); //gestione data mediante apposita funzione
                console.log(doc.flight_status + '\n');
                //addFlight(doc);
            }
        }
    console.log(json);
}

function onResponse (response){
    console.log(response.status);
    return response.json();
}

//fetch(url).then(onResponse).then(onJson);

function search(event){
    event.preventDefault();
    
    const departureValue = encodeURIComponent(form.departureAirport.value);
    console.log(departureValue);
    const arrivalValue = encodeURIComponent(form.arrivalAirport.value);
    console.log(arrivalValue);
    dateValue = encodeURIComponent(form.date.value);
    console.log('Data originale:' + dateValue);
    dateValue = '2021-04-21';
    console.log('Data modificata:' + dateValue);

    //Se aeroporto di partenza e aeroporto di arrivo coincidono...
    if(departureValue === arrivalValue){
        alert('Occorre scegliere Aeroporto di Partenza e Aeroporto di Arrivo diversi fra loro');
    }
    /*
    //Se non è stata selezionata una data...
    if(dateValue === ''){
        alert('Occorre scegliere una data.');
    }
    */
   
    //Preparo richiesta...
    const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + '&dep_iata=' + departureValue + '&arr_iata=' + arrivalValue; 
    //const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + '&dep_iata=' + departureValue + '&arr_iata=' + arrivalValue + '&flight_status=' + 'landed'; 
    //const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + '&flight_date=' + dateValue; 
    console.log(url);
    //Effettuo richiesta...
    fetch(url).then(onResponse).then(onJson);
}

const form = document.forms['searchFlight'];
form.addEventListener('submit', search);