let numItems = 0; //variabile globale che tiene il conto degli elementi presenti nella sezione dei preferiti

//funzione che interviene quando clicco su una starMinus (stellina col -)
function removeFavorite(event) {

    numItems--;
    const sectionGridItem = event.currentTarget.parentNode.parentNode; 
    //posso utilizzare parentNode in quanto so per certo che non dovrò applicare modifiche alla struttura HTML
    const selectedCity = sectionGridItem.querySelector('.city').textContent;

    //se la sezione dei preferiti contiene un solo elemento...
    if(numItems === 0){
        sectionGridItem.innerHTML = '';
        document.querySelector('#favorites').classList.add('hidden');
    }
    else{ //altrimenti...
        sectionGridItem.innerHTML = '';
    }
    
    const sectionGridItems = document.querySelectorAll('.sectionGridItem');
    for(const item of sectionGridItems){
        if(item.dataset.city === selectedCity){
            //console.log('Hai cliccato sulla città: ' + item.dataset.city);
            star = item.querySelector('.starPlus');
            star.addEventListener('click', addFavorite);
        }
    }
}

//funzione che interviene quando clicco su una starPlus (stellina col +) 
function addFavorite(event) {

    event.currentTarget.removeEventListener('click', addFavorite);
    numItems++;
    //console.log(numItems);

    document.querySelector('#favorites').classList.remove('hidden'); //faccio comparire la sezione dei preferiti nella viewport
    const selectedCity = event.currentTarget.parentNode.parentNode.dataset.city; //in questo modo so quale elemento della griglia (=> quale città) è stato cliccato
    
    const sectionGridItem = document.createElement('div');
    sectionGridItem.classList.add('sectionGridItem');
    document.querySelector('#favorites .sectionGrid').appendChild(sectionGridItem);

    // gestisco top (contenitore di: nome della città, img starMinus)
    const sectionGridItemTop = document.createElement('div');
    sectionGridItemTop.classList.add('itemTop');
    sectionGridItem.appendChild(sectionGridItemTop); //aggiungo top

    //gestisco nome della città in top
    const p = document.createElement('p');
    p.textContent = selectedCity;
    p.classList.add('city');
    sectionGridItemTop.appendChild(p);
    
    //gestisco img starMinus in top
    const starMinus = document.createElement('img');
    starMinus.src = "https://cdn1.iconfinder.com/data/icons/web-interface-part-2/32/star-remove-512.png";
    starMinus.classList.add('starMinus');
    sectionGridItemTop.appendChild(starMinus);

    //gestisco img città
    const imgPath = cities[selectedCity].img;
    const img = document.createElement('img');
    img.src = imgPath;
    sectionGridItem.appendChild(img); //aggiungo img città

    starMinus.addEventListener('click', removeFavorite);
}

//assegno listener addFavorite alle starPlus
const stars = document.querySelectorAll('.itemTop .starPlus');
for(const star of stars){
    star.addEventListener('click', addFavorite);
}

//funzione che interviene quando clicco sulla descrizione di un item
function hideDescription(event) {
    event.currentTarget.removeEventListener('click', hideDescription);
    
    event.currentTarget.classList.remove('fixDescription');
    event.currentTarget.textContent = 'Clicca per più dettagli';
    
    event.currentTarget.addEventListener('click', showDescription);
}

//funzione che interviene quando clicco su "Clicca per più dettagli"
function showDescription(event) {
    event.currentTarget.removeEventListener('click', showDescription);

    selected = event.currentTarget.parentNode.dataset.city;
    event.currentTarget.textContent = cities[selected].description;
    event.currentTarget.classList.add('fixDescription');

    event.currentTarget.addEventListener('click', hideDescription);
}

//assegno listener a tutte le scritte "Clicca per più dettagli"
const descriptions = document.querySelectorAll('.description');
for(const description of descriptions){
    description.addEventListener('click', showDescription);
}

function filter(){ //viene richiamata ogni volta che digito un carattere nella barra di ricerca

    //seleziono testo digitato nella barra di ricerca
    const text = document.querySelector('#search').value.toLowerCase(); /* il metodo toLowerCase() applicato in questa
                                                                           riga e alla riga 121 mi permette di rendere
                                                                           il filtro di ricerca case unsensitive */
    //console.log('Testo: ' + text);

    const sect = document.querySelector('#main');
    const sectionGridItems = sect.querySelectorAll('.sectionGridItem');

    //quando svuoto la barra di ricerca tutti gli elementi originali devono essere visibili
    if(text.length === 0){ //se la barra di ricerca non contiene più del testo...
        //rimuovo la classe 'hidden' a tutti gli elementi (città)
        for(const sectionGridItem of sectionGridItems){
            sectionGridItem.classList.remove('hidden');
        }
    } //fine if()
    //quando digito una lettera...
    else{ //se la barra di ricerca contiene del testo //inizio else esterno
        for(let sectionGridItem of sectionGridItems){

            let city = sectionGridItem.dataset.city;
            //console.log('City = ' + city);

            if(city.toLowerCase().indexOf(text) === -1){ /* se il testo digitato NON è presente 
                                                            nel nome (.city)di ciascun item... */
                //applico la classe 'hidden' al sectionGridItem che non contiene la substring text
                sectionGridItem.classList.add('hidden');
            }
            else { //inizio else interno
                //rimuovo classe hidden al sectionGridItem che CONTIENE la substring text
                sectionGridItem.classList.remove('hidden');
            } //fine else interno
        }
    } //fine else esterno
} //fine funzione filter()

//assegno il listener "filter" alla barra di ricerca quando si verifica l'evento keyup
document.querySelector('#search').addEventListener('keyup', filter);