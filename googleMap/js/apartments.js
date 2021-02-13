/*
    http://localhost:4000/api/cities
    http://localhost:4000/api/apartments
*/
const error=document.getElementById("error");
const cities=document.getElementById("cities");
const apartments=document.getElementById("apartments");

show = (element)=> element.style.display="block";
hide = (element)=> element.style.display="none";

//show(error);
//hide(error);
getCities = async() =>{
    try{
        hide(error);
        //call api to featch data
        const result=axios.get('http://localhost:4000/api/cities');
        //Await the result from the server and store
        //the result in a varible named data
        const {data}=await result;
        //iterate over the returned result and add it to the list
        data.forEach(d => {
            let cityHtml=`<a href='#' id='${d.city.toLowerCase() }' class='list-group-item filter'> ${d.city}</a> `; 
            cities.innerHTML +=cityHtml;
        });
        console.log(data);
    }catch(err){
        show(error);
        console.log(error);
        
    }
}

getApartments = async () =>{
    try{
        hide(error);
         //call api to featch data
         const result=axios.get('http://localhost:4000/api/apartments');
        //Await the result from the server and store
        //the result in a varible named data
        const {data}=await result;
        //iterate over the returned result and add it to the list
        data.forEach(apartment => {
            let cityClass=apartment.city.toLowerCase().replace(' ','-');
            let listing=
            `<a href='#' class='${ cityClass } listings list-group-item list-group-item-action flex-column align-items-start'>  
                <div class='d-flex w-100 justify-content-between'>
                    <h6 class='mb-1'> ${apartment.description} </h6> 
                    <small> ${apartment.price} Kr </small>
                </div>
                <p class='mb-1'> ${apartment.address} </p>
                <small>Bedrooms : ${apartment.bedrooms} /Neigborhood :${apartment.neighborhood}
                </small> </a>`; 

            apartments.innerHTML +=listing;
        });
        console.log(data);
        }catch(err){

    }
}

cities.onclick =( event ) =>{
    try{
        [...document.querySelectorAll('.filter')].forEach(element =>{
            element.classList.remove(...['active']);
        });
        event.target.classList.add(...['active']);
        const city=event.target.getAttribute('id');
        [...document.querySelectorAll('#apartments a')].forEach(element => {

            if(element.classList.contains(city) || city==='all')
                element.style.display='block';
            else
                element.style.display='none';
        });

    }catch(err){
        console.log('onclick :ERROR ',err);
    }
}
apartments.onclick =(event) =>{
    try {
        // Locate the <p> element that holds the address
        //The <p> element might be a child or a grandchild to the <a>
        let element = event.target;
        if(element.localName !=='a')
            element = element.parentElement;
        if(element.localName !=='a')
            element = element.parentElement;

        const address=element.querySelector('p');
        window.open(`http://maps.google.com?q=${address.innerText}`);
        console.log(address);   

    }catch(err){
        console.log('onclick :ERROR ',err);
    }
}
getCities();
getApartments();