document.querySelector('#searchbtn').addEventListener('click', function() {

    //Création variable avec valeurs des inputs
    const newTrip = {
        departure : document.querySelector('#departure').value,
        arrival : document.querySelector('#arrival').value,
        date : document.querySelector('#date').value,
    }
    // console.log(newTrip)

    //on exclu direct l'option ou des infos ne sont pas renseignées 
    if (!newTrip.departure || !newTrip.arrival || !newTrip.date) {
        document.querySelector('#imgresult').src ="images/notfound.png" 
        document.querySelector('#paraphresult').textContent = "No trip found"
    }

    //Envoi des info au back --> on execute route POST/trips
    fetch('https://tickethack-backend-tau-tan.vercel.app/trips', {
        method : 'POST', 
        headers : {'Content-Type' : 'application/json'}, 
        body : JSON.stringify(newTrip)
    })

    //On manipule la réponse qui revient du back
    .then (response => response.json()) 
    .then (data => {
        console.log(data); 
        if(data.trajet.length === 0) {
            document.querySelector('#imgresult').src ="images/notfound.png" 
            document.querySelector('#paraphresult').textContent = "No trip found"
        } else {
            document.querySelector('#imgresult').style.display = "none";
            document.querySelector('#paraphresult').style.display = "none";
            redacTrajet (data.trajet)

            document.querySelectorAll('#results button')         //recupe les boutons avec id

            for (const btn of document.querySelectorAll('#results button')){
                let idBtn = btn.getAttribute('id')
                btn.addEventListener('click', function(){
                    fetch(`https://tickethack-backend-tau-tan.vercel.app/reservations/add/${idBtn}`)
                    .then (response => response.json())
                    .then (data => {
                        console.log(data)
                    })
                })
            }
        }    
    })
   
})

function redacTrajet(data){
    document.querySelector('#results').innerHTML = "";

    for (const tab of data){
        let departure = tab.departure;
        let arrival = tab.arrival;
        let price = tab.price
        let id = tab._id
        let date = new Date(tab.date);
        let dateHour = `${date.getUTCHours()}:${date.getMinutes()}`

        document.querySelector('#results').innerHTML +=`
                <div class ="trajet">
                    <p> ${departure} > ${arrival}</p>
                    <p>${dateHour}</p>
                    <p>${price}€</p>
                    <button id="${id}">Book</button>
                </div>
        
            `
    }
}




