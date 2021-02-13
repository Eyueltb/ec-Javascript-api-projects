/*
  http://localhost:4000/school/cart
  http://localhost:4000/school/courses
  http://localhost:4000/school/teachers
*/
const error=document.getElementById("error");
const cart=document.getElementById("cart-count");
const tInfo=document.getElementById("teacher-images");
const courses=document.getElementById("courses");
const price=document.getElementById("cart-Price");

show = (element)=> element.style.display="block";
hide = (element)=> element.style.display="none";
//show(error);
//hide(error);



getTeachers= async () =>{
    try{
        hide(error);// hide the error 
        const result=axios.get('http://localhost:4000/school/teachers');
        //Await the result from the server and store it in variable data
        const {data}=await result;
  
        data.forEach((d,i)=> {
        let teacherInfo=`<div class='m-3 d-flex flex-column mx-auto text-center display-9 text-white heading-font'> 
            <img src='images/avatars/avatar-${i+1}.jpg' class='rounded-circle avatar-size mx-auto mb-1'>
            <div>${d.Prefix} ${d.LastName}</div>
            </div>`;  
            tInfo.innerHTML +=teacherInfo;
     
        });
        console.log(data);
    }catch(err){
        console.log('onclick :ERROR ',err);
    }
}

getCourses= async () =>{
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    try{
        hide(error);// hide the error 
        const result=axios.get('http://localhost:4000/school/courses');
        //Await the result from the server and store it in variable data
        const {data}=await result;
        i=1;
        data.forEach(d => {
        let courseInfo=`<div class='class-card d-flex flex-column flex-wrap justify-content-center'>
        <img src='images/events/events-img${i}.jpg' class='w-100'>
        <div class='d-flex flex-column text-white bg-info p-4'>
              <div class='display-8 heading-font mb-3'> ${d.Title}</div>
              <div> <i class='far fa-calender-alt mr-2 mb-2'> </i>Age ${d.MinAge} to ${d.MaxAge} Years </div>
              <div><i class='far fa-clock mr-2 mb-4'> </i> ${d.Time}-11:00AM</div>
              <div class='mb-4'>${d.Description}.
              <button class='btn btn-lg btn-warning text-uppercase text-white my-1'>Learn More</button>
            </div>
        </div>
        <div class='date d-flex flex-column justify-content-center align-items-center px-2 bg-info text-white font-weight-bold display-9'>
            <div>${monthNames[d.Date.slice(5,6)]}</div>
            <div>${d.Date.slice(8,10)}</div>
        </div>
  </div>`;  
           
        courses.innerHTML +=courseInfo;
        i+=1;
        });
        console.log(data);
    }catch(err){
        console.log('onclick :ERROR ',err);
    }
}
getCart= async () =>{
    try{
        hide(error);// hide the error
        //call api to featch data
       const result=axios.get('http://localhost:4000/school/cart');
       //Await the result from the server and store it in variable data
       const {data}=await result;
       //iterate over the returned result and add it to the list
       let count=0;
       let totalPrice=0;
       data.forEach(d => {
           count+=d.Count;
           totalPrice+=d.Price;
       });
       cart.innerHTML =data.length;
       price.innerHTML =totalPrice.toFixed(2);
       console.log(data);
    }catch(err){
        console.log('onclick :ERROR ',err);
    }
}

getTeachers();
getCourses();
getCart();