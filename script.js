const accessKey ="VpNFW264hl53GevHekCxzC1AGKtduvOUdgvZOq6L5Io";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-img");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn")
// const search = document.querySelector(".result")
console.log(searchResults)

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    console.log("inputData:" , inputData);
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response  = await fetch(url);
    console.log("response:", response);
    const data = await response.json();
    console.log("data:", data);

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }
 

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        // Append imageWrapper to searchResults
        searchResults.appendChild(imageWrapper);
    });

    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}


formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener("click",()=>{
    searchImages();
})
