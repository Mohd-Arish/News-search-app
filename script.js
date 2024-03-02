const apik= "01fa1587c50e43feb0b4985200ac8c33"
const cardcon= document.querySelector("#card-con")
const searchipfield= document.querySelector("#search-input")
const searchbtn= document.querySelector(".search-btn")

async function randomnews(){
try {
    const apiurl= `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apikey=${apik}`
    const resp= await fetch(apiurl)
    const data= await resp.json()
    return data.articles;
    
} catch (error) {
    console.log("News cannot be shown right now", error) 
    return[];
}
}

searchbtn.addEventListener('click', async()=>{
    const query= searchipfield.value.trim()
    if(query != ""){
        try {
            const rarticles= await fetchrandomarticles(query)
            displaycards(rarticles)
            
        } catch (error) {
            console.log("Your query cannot be shown right now", error)
        }
    }
})

async function fetchrandomarticles(query){
    try {
        const apiurl= `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apik}`
        const resp= await fetch(apiurl)
        const data= await resp.json()
        return data.articles;
        
    } catch (error) {
        console.log("News cannot be shown right now", error)
        return[];
    }
}


function  displaycards(articles){
    if (!Array.isArray(articles)) {
        console.error("Invalid articles data:", articles);
        return; 
        }
    cardcon.innerHTML= ""
    articles.forEach((elem) => {
        const newscrd= document.createElement("div")
        newscrd.classList.add("news-card")
        const img= document.createElement("img")
        img.src= elem.urlToImage
        img.alt= elem.title
        const titlee= document.createElement("h2")
        const truncatedtitle= elem.title.length >= 50 ?
        elem.title.slice(0, 50) + "...." : elem.title
        titlee.textContent= truncatedtitle;

        const para= document.createElement("p")
        para.textContent= elem.description;

        newscrd.appendChild(img)
        newscrd.appendChild(titlee)
        newscrd.appendChild(para)
        newscrd.addEventListener('click', ()=>{
            window.open(elem.url, "_blank")
        })
        cardcon.appendChild(newscrd)
    });

}


(async()=>{
    try {
        const articles= await randomnews()
        displaycards(articles)
        
    } catch (error) {
        console.log("News cannot be shown right now", error)
    }
})
();

