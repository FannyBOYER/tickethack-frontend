function divTrajet(obj,id) {
  const objDate = new Date(obj.date);
  let horaire = `${objDate.getUTCHours()}:${objDate.getMinutes()}`;
  let trajet = `
                <div class ="trajet" >
                    <p>${obj.departure} > ${obj.arrival}</p>
                    <p>${horaire}</p>
                    <p>${obj.price}€</p>
                    <button id="${id}">x</button>
                </div>
                `;
  return trajet;
}

fetch("http://localhost:3000/reservations/recup/false")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#resultat").innerHTML = "";
    let total = 0; 
    for (let obj of data.recup) {
      let newDiv = divTrajet(obj.trip,obj._id);
      document.querySelector("#resultat").innerHTML += newDiv;
      total += Number(obj.trip.price);
      document.querySelector('#total').textContent = total;
    }
    document.querySelector("#end").style.display ="none";
    
    if (data.recup.length === 0){
        document.querySelector("#end").textContent = "Why not plan a Trip ?";
        document.querySelector("#end").style.display = "block";

        document.querySelector("#resultat").textContent = "No tickets in your cart."
        document.querySelector(".total").style.display ="none";
    }


    for (let button of document.querySelectorAll("#resultat button")) {
      button.addEventListener("click", () => {
        let id = button.getAttribute("id");
        fetch(`http://localhost:3000/reservations/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: undefined
            }).then(response=>response.json())
            .then(data =>{
                console.log(data);
                button.parentElement.remove();
                if (document.querySelectorAll("#resultat button").length === 0){
                        document.querySelector("#end").textContent = "Why not plan a Trip ?";
                        document.querySelector("#end").style.display = "block";

                        document.querySelector("#resultat").textContent = "No tickets in your cart."
                        document.querySelector(".total").style.display ="none";
                }


            } )
      });
    }
  });

  document.querySelector("#purchase").addEventListener("click",()=>{
     fetch(`http://localhost:3000/reservations/purchase`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: undefined
            }).then(response=>response.json())
            .then(data =>{
                console.log(data);
                window.location.assign("purchase.html");

            } )
  })

