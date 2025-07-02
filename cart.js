function divTrajet(obj){
    console.log(obj)
    let divTrajet = document.createElement('div');
    divTrajet.setAttribute('class','trajet');
    divTrajet.textContent = `a`





}

fetch('http://localhost:3000/reservations/recup')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
           // divTrajet(data)


          
        })