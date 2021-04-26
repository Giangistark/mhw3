const api_key= "1ded505d1434366e5b30c47d1d94a203";
const newsbox= document.querySelector(".newsbox.API");
const today = new Date().toISOString().slice(0, 10);

function OnJson(json){
    //console.log(json);
    newsbox.innerHTML= "";
    if(json.count===0){
        console.log("nessuna notizia");
        return 0;
    }
    newsbox.classList.remove("hidden");

    let finestra;
    let titolo;
    let imgbox;
    let img;
    let descrizione;
    let i=1;

    for(const dat of json.data){
        if(i<=10){
            finestra= document.createElement("div");
            finestra.classList.add("finestranews");
        }
        else{
            finestra= document.createElement("div");
            finestra.classList.add("finestranews", "hidden");
        }
        //console.log("create");
        titolo= document.createElement("div");
        titolo.classList.add("titolonews");
        titolo.innerHTML= "<a href="+dat.url+">"+dat.title.slice(0,30)+"</a>";
        if(dat.image!==null){
            imgbox= document.createElement("div");
            imgbox.classList.add("imgnews");
            img= document.createElement("img");
            img.src=dat.image;
        }
        descrizione= document.createElement("div");
        descrizione.classList.add("descrizione");
        descrizione.textContent=(dat.description.slice(0,100)+"...");
        //console.log("append");
        newsbox.appendChild(finestra);
        finestra.appendChild(titolo);
        if(dat.image!==null){
            finestra.appendChild(imgbox);
            imgbox.appendChild(img);
        }
        finestra.appendChild(descrizione);

        i++;
        //console.log("restart");
    }

    if(i>10){
        const button= document.querySelector("button");
        button.classList.remove("hidden");
    }
}

function OnResponse(response){
    //console.log(response);
    if(response.ok){
        return response.json();
    }
}



function CallMostraMeno(event){
    const button= event.currentTarget;
    button.removeEventListener("click",CallMostraMeno);
    button.addEventListener("click",CallMostraTutto);
    button.textContent= "mostra tutto";
    const finestre= document.querySelectorAll(".API .finestranews");
    let i=1;
    for(finestra of finestre){
        if(i>10)
            finestra.classList.add("hidden");
        i++;
    }
}

function CallMostraTutto(event){
    const button= event.currentTarget;
    button.removeEventListener("click",CallMostraTutto);
    button.addEventListener("click",CallMostraMeno);
    button.textContent= "mostra meno";
    const finestrenascoste= document.querySelectorAll(".finestranews.hidden");
    //console.log(finestrenascoste);
    for(finestra of finestrenascoste)
        finestra.classList.remove("hidden");
}




fetch("http://api.mediastack.com/v1/news?access_key="+api_key+"&categories=technology&date="+today+"&sort=popularity").then(OnResponse).then(OnJson);
const mostra=document.querySelector("button");
mostra.addEventListener("click", CallMostraTutto);