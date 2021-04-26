//API_KEY ottenuta in seguito alla registrazione al servizio di AviationStack
const API_KEY = '792898ddad7f8991f83eed9dfaaf9801';

//credenziali ottenute in seguito alla registrazione al servizio di Amadeus.com
const client_id = 'OlD4Z6GmBYXUpi23jSUPvCAfZQNniv0z';
const client_secret = 'SGNujg2Wwa1XdeAA';

//variabili globali
let token;
let dateValueOriginal = undefined; //variabile globale
let dateValue = undefined; //variabile globale
let found; //variabile globale (flag)


//funzione che riceve un flight e lo aggiunge dinamicamente nella tabella dei voli, inizialmente nascosta
function addFlight(doc){
    //console.log('La funzione addFlight() è stata chiamata.\n');

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

function onAmadeusJson(json){
    const num = json.data.length;

    //controllo che la sezione delle attrazioni preferite dai clienti non sia già presente in viewport
    if(document.querySelector('.attractions') === null){
        //creo una nuova sezione nella viewport, al di sotto della tabella dei voli
        const box = document.createElement('div');
        box.classList.add('attractions');
        document.querySelector('section').appendChild(box);

        const p = document.createElement('p');
        p.textContent = 'Alcune delle attrazioni a Londra preferite dai nostri viaggiatori...';
        p.classList.add('testoBlu');
        box.appendChild(p);

        const boxContent = document.createElement('div');
        boxContent.style.display = 'flex';
        boxContent.style.alignItems = 'center';
        boxContent.style.justifyContent = 'center';
        box.appendChild(boxContent);
        
        const image1 = document.createElement('img');
        image1.src = 'https://i1.wp.com/alessandrosicurocomunication.com/wp-content/uploads/2020/10/https___www.history.com_.image_MTYyNDg1MjE3MTI1Mjc5Mzk4_topic-london-gettyimages-760251843-promo.jpg?fit=1920%2C1080&ssl=1';
        image1.classList.add('attractionsImage');
        boxContent.appendChild(image1);

        const image2 = document.createElement('img');
        image2.src = 'https://media.tacdn.com/media/attractions-splice-spp-674x446/09/93/6a/89.jpg';
        image2.classList.add('attractionsImage');
        boxContent.appendChild(image2);

        const ul = document.createElement('ul');
        boxContent.appendChild(ul);
        
        for(let i=0; i < num; i++){
            doc = json.data[i];
            const li = document.createElement('li');
            li.textContent = doc.name;
            li.classList.add('testoBlu');
            li.style.fontSize = '18px';
            ul.appendChild(li);

            console.log(doc.name); 
        } 
    }
}

function onAmadeusResponse(response){
    return response.json();
}

//funzione che gestisce il file .json restituito da aviationStack inseguito a richiesta
function onJson (json, found){
    const rows = document.querySelectorAll('#flightTable tr');
    for(row of rows){
        if(row.dataset.type !== 'heading'){
            row.innerHTML = '';
        }
    }
    found = false;
    
    const num = json.data.length;
    //console.log('Numero di elementi restituiti: ' + num);
    for(let i=0; i < num; i++){
        doc = json.data[i];
        //console.log('Data: ' + doc.flight_date + '\n');
        if(doc.flight_date === dateValue){
            //console.log('Ho trovato una corrispondenza in data' + dateValue);
            found = true; //setto la variabile flag a true
            //console.log('[onJson function] found = ' + found);
            //stampa di controllo, su console, dell'elemento per cui è stata trovata una corrispondenza
            /*
            console.log('Numero di volo n.' + i + ': ' + doc.flight.number + '\n');
            console.log(doc.departure.airport + ' ' + doc.departure.iata + '\n');
            console.log(doc.arrival.airport + ' ' + doc.arrival.iata + '\n');
            console.log(doc.departure.scheduled + '\n');
            console.log(doc.arrival.scheduled + '\n');
            console.log(doc.flight_status + '\n');
            */
            //aggiungo dinamicamente il volo per cui ho trovato una corrispondenza
            addFlight(doc); //chiamata alla funzione che gestisce l'inserimento di una nuova riga (volo) in tabella

        }
    }
    console.log(json);

    //console.log('[fuori dal ciclo for() ] found = ' + found);
    if(found === false){
        alert('Nessun volo trovato per i parametri di ricerca');
        const heading = document.querySelector('#heading');
        heading.style.display = 'none';
    }
    else{
            if(found === true){
                const params = 'north=51.520180&west=-0.169882&south=51.484703&east=-0.061048';
                //effettuo richiesta ad Amadeus.com
                fetch('https://test.api.amadeus.com/v1/reference-data/locations/pois/by-square?' + params, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(onAmadeusResponse).then(onAmadeusJson);
            }
    }

    found = false;
}

function onResponse (response){
    //console.log(response.status);
    return response.json();
}


function search(event){
    event.preventDefault();
    
    const departureValue = encodeURIComponent(form.departureAirport.value);
    //console.log(departureValue);
    const arrivalValue = encodeURIComponent(form.arrivalAirport.value);
    //console.log(arrivalValue);
    dateValueOriginal = encodeURIComponent(form.date.value);
    //console.log('Data originale:' + dateValueOriginal + '\n');

    let data = new Date();
    let day= data.getDate();
    let month = data.getMonth() + 1;
    if(month < 10){
        month = '0' + month;
    }
    let year = data.getFullYear();
    dateValue = year + '-' + month + '-' + day;
    //console.log('Data modificata (dateValue):' + dateValue + '\n');

    //Se aeroporto di partenza e aeroporto di arrivo coincidono...
    if(departureValue === arrivalValue){
        alert('Occorre scegliere Aeroporto di Partenza e Aeroporto di Arrivo diversi fra loro');
    }
    
    /* Al fine di verificare che l'utente selezioni una data nel form di ricerca,
       non effettuo il controllo che segue, bensì in HTML specifico che
       l'elemento input  di tipo "date" è required */

    /*
    //Se non è stata selezionata una data...
    if(dateValue === ''){
        alert('Occorre scegliere una data.');
    }
    */
   
    //Preparo richiesta...
    const url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + '&dep_iata=' + departureValue + '&arr_iata=' + arrivalValue; 
    //console.log(url);
    //Effettuo richiesta...
    fetch(url).then(onResponse).then(onJson, found);
}


function onTokenJson(json){
    token = json.access_token; //memorizzo il token ricevuto da Amadeus.com
    console.log(json.application_name + '\n');
    console.log(json.access_token);
}

function onTokenResponse(response){
    return response.json();
}

//Richiesta del token al servizio di Amadeus.com
fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'post',
    body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}).then(onTokenResponse).then(onTokenJson);

//seleziono il form di ricerca e gli associo l'handler search()
const form = document.forms['searchFlight'];
form.addEventListener('submit', search);

