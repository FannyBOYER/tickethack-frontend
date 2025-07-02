function divPurchase(obj) {
  const objDate = new Date(obj.date);
  let horaire = `${objDate.getUTCHours()}:${objDate.getMinutes()}`;
  let temps = Date.parse(obj.date) - Date.now();
  temps = msToHHMM(temps);
  let trajet = `
                <div class ="trajet" >
                    <p>${obj.departure} > ${obj.arrival}</p>
                    <p>${horaire}</p>
                    <p>${obj.price}€</p>
                    <p>Departure in ${temps}</p>
                </div>
                `;
  return trajet;
}

function msToHHMM(ms) {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Formater avec zéro devant si besoin
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}




fetch("https://tickethack-backend-tau-tan.vercel.app/reservations/recup/true")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    document.querySelector("#resultat").innerHTML = "";

    
    for (let obj of data.recup) {
      let newDiv = divPurchase(obj.trip);
      document.querySelector("#resultat").innerHTML += newDiv;
    }

    if (data.recup.length === 0){
        document.querySelector("#end").textContent = "Why not plan a Trip ?";
        document.querySelector("#resultat").textContent = "No Booking yet."
    }

  });

  
