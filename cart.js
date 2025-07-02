function divTrajet(obj){
    console.log(obj)

    let divTrajet = document.createElement('div');
    divTrajet.setAttribute('class','trajet');
    divTrajet.textContent = obj.departure+'>'+obj.arrival;


    let divDate = document.createElement('div');
    divDate.setAttribute('class','date');
    const objDate = newDate(obj.date)
    
    a.getUTCHours() , a.getMinutes()


    divDate.textContent = obj.date





}

_id: "6863db055b3d2f1c31535bd7"
​​​​
arrival: "Bruxelles"
​​​​
date: "2025-07-01T08:16:16.993Z"
​​​​
departure: "Marseille"
​​​​
price: 73





fetch('http://localhost:3000/reservations/recup')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
           // divTrajet(data)


          
        })