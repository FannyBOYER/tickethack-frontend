document.querySelector('#searchbtn').addEventListener('click', function() {

    //Création variable avec valeurs des inputs
    const newTrip = {
        departure : document.querySelector('#departure').value,
        arrival : document.querySelector('#arrival').value,
        date : document.querySelector('#date').value,
    }
    // console.log(newTrip)

    //Envoi des info au back --> on execute route POST/trips
    fetch('http://localhost:3000/trips', {
        method : 'POST', 
        headers : {'Content-Type' : 'application/json'}, 
        body : JSON.stringify(newTrip)
    })

    //On manipule la réponse qui revient du back
    .then (response => response.json()) 
    .then (data => {
        console.log(data); 
        redacTrajet (data.trajet)
    })
   
})

function redacTrajet(data){
    for (const tab of data){
        departure = tab.departure
        arrival = tab.arrival
        date = tab.date
    }
}

