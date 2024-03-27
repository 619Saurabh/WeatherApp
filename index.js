//Fetching all the HTML elements which requires

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm= document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorPage = document.querySelector(".error-container");
const errorMsg = document.querySelector("[data-errorMsg]");




//Intitial variables required 

let currentTab = userTab;
const API_KEY = "96305c6303a5215a50d247f9d1db6287";
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab){

if(clickedTab != currentTab){//If the tab which is clicked is different from the tab which we are currently on

    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active"))
    {

        userInfoContainer.classList.remove("active");//Hiding User weather data container from UI 
        grantAccessContainer.classList.remove("active");//Hiding Grant Access location container from UI 
        searchForm.classList.add("active");//Showing Search Weather form container in UI                                             
        
        searchInput.value = ""; 

    }

    else{ //else means you are on Your Weather tab
       
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        errorPage.classList.remove("active");
        getfromSessionStorage();

    }       
}


}



//When we click on Your Weather tab
userTab.addEventListener('click', () => {
switchTab(userTab);
});


//When we click on Search Weather tab
searchTab.addEventListener('click', () => {
    switchTab(searchTab);
    });






//This function checks if the coordinates(i.e latitude and longitude) are alreadry saved in Browser's session storage 
function getfromSessionStorage(){


    const localCoordinates = sessionStorage.getItem("user-coordinates");
 
    if(!localCoordinates){
    
    grantAccessContainer.classList.add("active");//Visible Grant Access Location conatainer in UI 
                                                

    }

   else{
      const coordinates = JSON.parse(localCoordinates);
      fetchUserWeatherInfo(coordinates);     
    }
}


async function fetchUserWeatherInfo(coordinates){

    //Taking out latitude and longitude from coordinates JSON object
     const{lat, lon} = coordinates;
     grantAccessContainer.classList.remove("active");

     

     loadingScreen.classList.add("active");//Making loader screen visible

     //Now, making API call

     try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

     }

     catch(error){

       
        loadingScreen.classList.remove("active");
        alert("Error in fetching API response");

     }
  

}



  //This renderWeatherInfo() function works is to take out the values from data(i.e Weather data in JSON format) and inserts in User
  // weather data container(i.e user-info-container or userInfoContainer element) to render/display in UI
function renderWeatherInfo(weatherInfo){//rendering function to render weather data/info in UI(i.e in user-info-container or userInfoContainer element)

    //Now, what weather data do you need from weatherInfo(storing Weather data in JOSN format(JSON object)) to render in UI(i.e in 
    //userInfoContainer element(i.e User weather data/info container))
   //The data we need from weatherInfo(storing JSON object) variable - city name, country code(then only we can take out flag),description of
   //weather, weather icon, value of temperature, value of windspeed, value of humidity and value of cloudiness
 //So, all these values we need from our weatheInfo response JSON object and we have to set these values in UI elements.So, first we have to
 //fetch all these elements from UI then only we can set values inside them
 //First we fetch all the elements from UI then takes out the data from weatherInfo response JSON object and then set/insert that values 
 //inside these elements

 //Firstly, we have to fetch all the elements from Ui inside which you have to set/insert data from weatherInfo response JSON object

 const cityName = document.querySelector("[data-cityName]");

 const countryIcon = document.querySelector("[data-countryIcon]");

 const desc = document.querySelector("[data-weatherDesc]");

 const weatherIcon = document.querySelector("[data-weatherIcon]");

 const temp = document.querySelector("[data-temp]");

 const windspeed = document.querySelector("[data-windspeed]");

 const humidity = document.querySelector("[data-humidity]");

 const cloudiness = document.querySelector("[data-cloudiness]");



//Now, taking out the values from weatherInfo response JSON object and set/put it in these fetched UI elements

cityName.innerText = weatherInfo?.name;//fetched the value of name property of WeatherInfo object and stored it in cityName element using
                                       //innerText property
//Now, we have to take out the country icon image.So, for that we have a CDN link and in this CDN link we just have to put country name
//and it fetches the icon/image of flag of that country
//countryIcon is an <img> element/tag
countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;//fetched the value of country property of
//sys object from weatherInfo object and coverts it into lower case using toLowerCase() method of string and passed it in CDN link of flagcdn 
//using $ and template literal({}) and set this CDN link in src attribute of countryIcon element(i.e <img> tag) using src property


//The src property sets or returns the value of the src attribute of a script.

desc.innerText = weatherInfo?.weather?.[0]?.description;//fetched the value of description property from first element which is an object at 
//index 0 of weather(which is an array of object) in weatherInfo object and stored it in desc element using innerText property

//Now, we have to take out weather icon image. So, for this also we have a link using which we can take out weather icon image
weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;//fetched the value of icon property from first  
//element which is an object at index 0 of weather(which is an array of object) in weatherInfo object and passed it in link of OpenWeather 
//image link using $ and template literal({}) and set this link in src attribute of weatherIcon element(i.e <img> tag) using src property

temp.innerText = `${weatherInfo?.main?.temp} °C`;//fetched the value of temp property from main object in weatherInfo object and stored it in temp 
                                        //element using innerText property
                                        //using ${}(template literal) to embed expressions(i.e weatherInfo?.main?.temp) inside string so that
                                        //it could be evaluated and not treated as a string

windspeed.innerText = `${weatherInfo?.wind?.speed}m/s`;//fetched the value of speed property(key) from wind object in weatherInfo object and 
//stored it in windspeed element using innerText property    

humidity.innerText = `${weatherInfo?.main?.humidity}%`;//fetched the value of humidity property(key) of main object inside weatherInfo object
// and stored it in humidity element using innerText property

cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;//fetched the value of all property(key) of clouds object inside weatherInfo object and 
//stored it in cloudiness element using innerText property

//So, in this way we filled all the data in our fetched elements


}


//But if the coordinates(i.e latitude and longitude) are not saved/stored in Browser's Session storage then Grant Access location container UI
//(i.e grantAccessContainer) would have been visible in UI
//So, if Grant Access location container UI(i.e grantAccessContainer) is visible in UI then it means we have been applied a addEventListener()
//method on Grant Access button that whenever we click on Grant Access button then find out the current position/location of user using 
//geolocation API and when you got the current position/location of user or when you got the current coordinates(i.e latitude and longitude) 
//then stored/saved that coordinates(i.e latitude and longitude) in Browser's session storage





function getLocation(){

    if(navigator.geolocation){//Here, we are checking whether in your browser geolocation feature or geolocation API is supported or not

        navigator.geolocation.getCurrentPosition(showPosition);//If geolocation feature is supported in your browser then find out current 
    }                                              //position/location of user using navigator.geolocation.getCurrentPosition() method and 
                                                   //inside getCurrentPosition() method we have to pass a callback function showPosition 

   

    else{//if in your browser geolocation feature or geolocation API is not supported  

        //H.W- show an alert message for no geolocation feature support available
        alert("Geolocation is not supported in this browser.");

    }
}

function showPosition(position){//And in showPosition() function input parametes we got the position object from geolocation API
                                //And this position object has the coordinates(i.e latitude and longitude) of current location stored in it

    //Creted a userCoordinates object which stores the coordinates of current location i.e value of latitude and longitude in lat and lon
    //property(key)                            
    const userCoordinates = {

        lat: position.coords.latitude,//Fetching value of current location's latitude property(key) from coords object in position object
        lon: position.coords.longitude//Fetching value of current location's longitude property(key) from coords object in position object
    };      
    
    //Now, we will store these coordinates(i.e latitude or longitude) or userCoordinates object in Browser's session storage
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));//Storing/saving the coordinates(i.e latitude and longitude) of 
                                            //user's current location(which is stored in userCoordinates object) in Browser's session storage
                                            // by the name of item user-coordinates using sessionStorage object or
                                            //sessioStorage.setItem() method
   
   //JSON.stringify() static method converts a JavaScript value(i.e JavaScipt object or JSON oject(key-value pair)) to a JSON string   
   //(string format)                                      
  //So, here we are converting userCoordinates(which is an object) into a JSON string through JSON.stringify() method and saving that converted 
  //userCoordinates(which stores coordinates(i.e latitude and longitude)) in the Browser's session storage by the name of item user-coordinates 
  //using sessionStorage object or sessioStorage.setItem() method
  
  //sessionStorage is an object which allows you to save data in the form of key/value pairs in the browser

  //Now, we have to show/display the weather data of user's current location in UI on the basis of coordinates(i.e latitude and longitude) 
  //which are saved/stored in Broswer's session storage by calling OpenWeather API. So, for that we have already created a async function
  //fetchUserWeatherInfo() which calls a Weather API to fetch user's current location weather data on the basis of coordinates
  //(i.e latitude and longitude) saved/stored in Broswer's session storage and render that fetched weather data of user's current location
  //on UI.
  //So, we just have to call fetchUserWeatherInfo() async function to show/display the weather data of user's current location in UI on the 
  //basis of coordinates(i.e latitude and longitude) stored in userCoordinates object.So, for that we have to pass userCoordinates object as
  //input arguement in fetchUserWeatherInfo() function
  fetchUserWeatherInfo(userCoordinates);


}

//Fetching Grant Access button from Grant Access location container(UI)
const grantAccessButton = document.querySelector("[data-grantAccess]");

//Applying addEventListener() method on Grant Access button(i.e grantAccessButton) on click event that whenever we click on Grant Access button
//(i.e grantAccessButton) we have to call a function getLocation() to find out the current location of user using geolocation API and 
//save/store the user's current location coordinates(i.e latitide and longitude) in Browser's session storage 
grantAccessButton.addEventListener("click", getLocation);



//When we click on Search Weather tab then Search Weather form container(i.e searchForm element) UI will be visible which is having an input
// field to search city name
//So, for Search Weather tab form container(i.e searchForm element) UI also, when we got city name in input field we have to make an API call
// with that city name to fetch the weather data of that city
//And have to render that fetched weather data of searched city in UI. Rendering function will be exactly same as we use in Your Weather tab 
//for rendering user's current location weather data i.e renderWeatherInfo(weatherInfo) function.Only the API call function will be different
// because API is different for both Your Weather tab and Search Weather tab
//So, we have to write an API call function for Search Weather tab also


//Whatever input value or city name we wil give in input field of Search Weather tab, with that city name API call will be made.So, we have to
// take out the input value or city name from input field

//fetching input field element(<input>) in Search Weather tab from UI
const searchInput = document.querySelector("[data-searchInput]");

//Applying addEventListener() method on Search Weather form(i.e searchForm) (which is a <form> element) 
//that when searchForm element is submitted then you have to call this arrow function
//submit event occurs when a form is submitted that means we click on a button inside form element then it submits the form data to the server
//i.e Whenever we submit the form(<form> element) i.e searchForm element then call fetchSearchWeatherInfo(cityName) function to fetch weather
//data of searched city througn an API call and render that weather info of searched city in UI
searchForm.addEventListener("submit", (e) => {//When an event occurs then addEventListener()'s listener function gets an event object
                                              //e is the event object(which stores all the information about that event)
    e.preventDefault();//Preventing or avoiding the default behaviour/action of search button in <form> element i.e when we click on search 
    //button inside <form> element the form's data will be submitted to the server.But we prevented this behaviour of form by using
    // preventDefault() method
    //i.e Deferring/preventing the default behaviour/action of <form> element which is submit the form's data to the server
    //i.e We are removing the default behaviour/action of <form> element which is submit the form's data to the server 

    let cityName = searchInput.value;//Fetching the value of value attribute of serach input element(i.e searchInput element) using value
                                     //property
    
    if(cityName === "") //if cityName variable is empty i.e value of search input element(i.e searchInput element) is empty which means
                       //we did not search for any city name in input element(i.e searchInput element) yet                              
    return; //then do nothing or return nothing

    else{//if cityName variable is not empty i.e value of search input element(i.e searchInput element) is not empty which means
         //we searched for a city name in input element(i.e searchInput element)

         //then call fetchSearchWeatherInfo() function by passing cityName as an input argument in it and this function fetches the weather 
         //data of searched city in input element(i.e searchInput element) through an API call with that city name which is stored in cityName 
         //variable

        //  searchInput.value="";
         fetchSearchWeatherInfo(cityName);
    }



} )


//This function fetches the weather data of searched city stored in city variable through an API call 
//OR this function calls an API on the basis of city name stored in city variable
async function fetchSearchWeatherInfo(city){

    //console.log(city);//Logging on console just to check

    errorPage.classList.remove("active");//Hiding Error page from UI by removing active class from its calss list if it was there before 
    //submitting the city name in input element for search or before searching the weather data of new city in input element or before 
    //city Weather API call for new city
    //So, while we are doing an API call we have to show/visible a loader screen(i.e loadingScreen element) in UI by adding active class in 
    //its class list 
    loadingScreen.classList.add("active");//Showing/visibe loader/loading screen (i.e loadingScreen element) in UI by adding active class in 
                                         //its class list 
    //Now, whatever old weather data screen(i.e user-info-container or userInfoContainer element) was visible/showing in UI, we have to 
    //remove it from UI by removing active class from its class list 
    userInfoContainer.classList.remove("active");
  //If Grant Access location screen(i.e grantAccessContainer) was visible/showing in UI then remove it also from UI by removing active class
  // from its class list 
  grantAccessContainer.classList.remove("active");

  //Now, doing an API call with city name

  try{

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);//API call

    const data = await response.json();//Converting the response coming from API call into JSON format using json() method    
    
    //As soon as our API response comes or API response converted into JSON format, we have to remove/hide loader screen(i.e loadingScreen 
    //element) from UI by removing active class from its class list
    //console.log(data?.name);//Logging on console just to check


    //Applying condition for searching invalid city in input field whose weather data is not stored in OpenWeather API server i.e
    //When API is trying to fetch invalid city weather data from OpenWeather API server whose weather data is not stored in OpenWeather 
    //server then API response is this object i.e 

    // data  =  {
    //            "cod": "404",
    //            "message": "city not found"
    //          }
    
    //i.e This is the response coming from API when it fails to fetch the weather data of invalid city whose weather data is not stored in 
    //OpenWeather server

    if(!data?.sys){//Checking if the response coming from API i.e data json object has not contain sys property in it, if sys property
                   // does not contain in data response json object

        //explicitly throwing custom exception/error(i.e data response json object) of try block in catch block to handle it
        throw data;//then throw data response json object in catch block to handle
    }


  
    loadingScreen.classList.remove("active");//Removing/hiding loading screen from UI
    

    //Now we have to display weather data of searched city in UI
    //So, to display weather data of searched city in UI we have to visible User weather data container(i.e user-info-container or 
    //userInfoContainer element) in UI by adding active class in its class list
     userInfoContainer.classList.add("active");
    //Now, User weather data container(i.e user-info-container or userInfoContainer element) has come in UI but inside userInfoContainer 
    //element values of weather data has not come
    //So, for values to be inserted/render in userInfoContainer element we have to call render function i.e renderWeatherInfo()
    renderWeatherInfo(data);



  }

  catch(error){//Handling errors
   //Handling custom exception/error occurs in try block i.e if API response(i.e data oject) does not contain sys property in it then 
   //display/show/visible Error page in UI by adding active class in its class list
   //i.e if we searched invalid city in input field to fetch weather data through API call then display/show/visible Error page in UI by 
   //adding active class in its class list

   //i.e if error comes from API call or we called an API with invalid city due to which error or exception occurs then display Error page in
   //UI
   

    //H.W
    //alert("Error in fetching API response");
    // console.log(error);
    // console.log(error.message);

    //error = data; // Now, data response json object (which is coming from API call with invalid city) is stored in error object 

    loadingScreen.classList.remove("active");//Removing or hiding loading screen from UI as soon as API response comes
    userInfoContainer.classList.remove("active");//Removing or hiding weather data container (i.e user-info-container or userInfoContainer
    // element) from UI
    errorPage.classList.add("active");//Showing/visible Error page(i.e errorPage element) in UI by adding active class in its class list
    errorMsg.innerText = error?.message;//fetched the value of message property(key) of data response json object coming from API call with
    //invalid city(which is stored in error object )and stored it in errorMsg element using innerText property


  }

}




//This is the response coming from server to API or API to user when calling Weather API with invalid API Key 


// {
//     "cod": 401,
//     "message": "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
// }

//The 401(Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials(i.e here
// API key in our case) for the target resource