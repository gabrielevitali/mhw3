const API_KEY = '792898ddad7f8991f83eed9dfaaf9801';
let dateValueOriginal = undefined; //variabile globale
let dateValue = undefined; //variabile globale
//let found = false; //variabile globale (flag)

//const iata = 'CDG';
//const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + '&dep_iata=' + iata; 
//const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY; 

//funzione che riceve un flight e lo aggiunge dinamicamente nella griglia dei voli, inizialmente nascosta
/*
function addFlight(doc){
    const flightGrid = document.querySelector('#flightGrid');
    console.log('Sono entrato in questa funzione')
    const flight = document.createElement('div');
    // const flightGridHeading = document.querySelector('.flightGridHeading').style = 'flex';
    flight.classList.add('flightGridHeading');
    flight.style.display = 'flex';
    flightGrid.appendChild(flight);

    
    //creo p per N. Volo
    const nVolo = document.createElement('p');
    flight.classList.add('paragraph');
    nVolo.textContent = doc.flight.number;
    flight.appendChild(nVolo);

    //creo p per Aeroporto di Partenza
    const departureAirport = document.createElement('p');
    flight.classList.add('paragraph');
    departureAirport.textContent = doc.departure.airport + ' ' + doc.departure.iata;
    flight.appendChild(departureAirport);

    //creo p per Aeroporto di Arrivo
    const arrivalAirport = document.createElement('p');
    flight.classList.add('paragraph');
    arrivalAirport.textContent = doc.arrival.airport + ' ' + doc.arrival.iata;
    flight.appendChild(arrivalAirport);

    //creo p per Data e Orario di Partenza
    let departureDate = document.createElement('p');
    flight.classList.add('paragraph');
    //gestisco data e orario di Partenza
    const depTime = doc.departure.scheduled.substring(11, 16);
    departureDate.textContent = dateValueOriginal + ' ' + depTime;
    flight.appendChild(departureDate);

    //creo p per Data e Orario di Arrivo
    let arrivalDate = document.createElement('p');
    flight.classList.add('paragraph');
    //gestisco data e orario di Partenza
    const arrTime = doc.arrival.scheduled.substring(11, 16);
    arrivalDate.textContent = dateValueOriginal + ' ' + arrTime;
    flight.appendChild(arrivalDate);

    //creo p per Stato Volo
    let status = document.createElement('p');
    flight.classList.add('paragraph');
    status.textContent = doc.flight_status;
    flight.appendChild(status);
}
*/

//funzione che riceve un flight e lo aggiunge dinamicamente nella tabella dei voli, inizialmente nascosta
function addFlight(doc){
    console.log('La funzione addFlight() è stata chiamata.\n');

    /* Se tale funzione viene chiamata, significa che è stata trovata almeno una corrispondenza,
       dunque rendo visibile l'intestazione della tabella */
    const heading = document.querySelector('#heading');
    heading.style.display = 'table-row';

    const flightTable = document.querySelector('#flightTable');
    
    //creo una nuova riga (vuota) e la aggiungo alla tabella
    const flightRow = document.createElement('tr');
    flightRow.classList.add('tr');
    flightTable.appendChild(flightRow);

    //creo cella per N. Volo
    const nVolo = document.createElement('td');
    nVolo.classList.add('td');
    nVolo.textContent = doc.flight.number;
    flightRow.appendChild(nVolo);

    //creo cella per Aeroporto di Partenza
    const departureAirport = document.createElement('td');
    departureAirport.classList.add('td');
    departureAirport.textContent = doc.departure.airport + ' ' + doc.departure.iata;
    flightRow.appendChild(departureAirport);

    //creo cella per Aeroporto di Arrivo
    const arrivalAirport = document.createElement('td');
    arrivalAirport.classList.add('td');
    arrivalAirport.textContent = doc.arrival.airport + ' ' + doc.arrival.iata;
    flightRow.appendChild(arrivalAirport);

    //creo cella per Data e Orario di Partenza
    const departureDate = document.createElement('td');
    departureDate.classList.add('td');
    //gestisco data e orario di Partenza
    const depTime = doc.departure.scheduled.substring(11, 16);
    departureDate.textContent = dateValue + ' ' + depTime;
    flightRow.appendChild(departureDate);

    //creo p per Data e Orario di Arrivo
    const arrivalDate = document.createElement('td');
    arrivalDate.classList.add('td');
    //gestisco data e orario di Partenza
    const arrTime = doc.arrival.scheduled.substring(11, 16);
    arrivalDate.textContent = dateValue + ' ' + arrTime;
    flightRow.appendChild(arrivalDate);

    //creo p per Stato Volo
    const status = document.createElement('td');
    status.classList.add('td');
    status.textContent = doc.flight_status;
    flightRow.appendChild(status);
    
    return;
}


//funzione che gestisce il file .json restituito da aviationStack inseguito a richiesta
function onJson (json){
    const rows = document.querySelectorAll('#flightTable tr');
    for(row of rows){
        if(row.dataset.type !== 'heading'){
            row.innerHTML = '';
        }
    }
    
    const num = json.data.length;
    //console.log('Numero di elementi restituiti: ' + num);
    for(let i=0; i < num; i++){
        doc = json.data[i];
        //console.log('Data: ' + doc.flight_date + '\n');
        if(doc.flight_date === dateValue){
            //console.log('Ho trovato una corrispondenza in data' + dateValue);
            //found = true; //setto la variabile flag a true
            //aggiungo dinamicamente il volo per cui ho trovato una corrispondenza
            console.log('Numero di volo n.' + i + ': ' + doc.flight.number + '\n');
            console.log(doc.departure.airport + ' ' + doc.departure.iata + '\n');
            console.log(doc.arrival.airport + ' ' + doc.arrival.iata + '\n');
            console.log(doc.departure.scheduled + '\n');
            console.log(doc.arrival.scheduled + '\n');
            console.log(doc.flight_status + '\n');
            addFlight(doc); //chiamata alla funzione che gestisce l'inserimento di una nuova riga (volo) in tabella
        }
    }
    console.log(json);

    /*
    if(found === false){
        alert('Nessun volo trovato per i parametri di ricerca');
    }
    */
}

function onResponse (response){
    console.log(response.status);
    return response.json();
}

//fetch(url).then(onResponse).then(onJson);

function search(event){
    event.preventDefault();
    
    const departureValue = encodeURIComponent(form.departureAirport.value);
    //console.log(departureValue);
    const arrivalValue = encodeURIComponent(form.arrivalAirport.value);
    //console.log(arrivalValue);
    dateValueOriginal = encodeURIComponent(form.date.value);
    console.log('Data originale:' + dateValue);
    dateValue = '2021-04-21';

    let data = new Date();
    let day= data.getDate();
    let month = data.getMonth() + 1;
    if(month < 10){
        month = '0' + month;
    }
    let year = data.getFullYear();
    dateValue = year + '-' + month + '-' + day;
    console.log('Data modificata (dateValue):' + dateValue);

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