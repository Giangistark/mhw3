
const jokes_div= document.querySelector("#jokes");

function onJson(json){
    //console.log(json);
    jokes_div.innerHTML= "";
    if(json.type==="single"){
        const joke= json.joke;
        const joketext =document.createElement("div");
        joketext.textContent= joke;
        jokes_div.appendChild(joketext);
    }
    else{
        const setup= json.setup;
        let joketext =document.createElement("div");
        joketext.textContent= setup;
        jokes_div.appendChild(joketext);
        const delivery= json.delivery;
        joketext =document.createElement("div");
        joketext.textContent= delivery;
        jokes_div.appendChild(joketext);
    }
        
}



function onResponse(response){
    //console.log(response);
    if(response.ok){
        return response.json();
    }
}




fetch("https://v2.jokeapi.dev/joke/Programming").then(onResponse).then(onJson);