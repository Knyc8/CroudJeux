let currID = localStorage.getItem("currID");

function init() {
    currID = 0;
}

const getJSON = async () => {
    let users = fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(user => populateUsers(user))


    // let posts = fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then(response => response.json())
    //     .then(post => console.log(post))


    // let comments = fetch('https://jsonplaceholder.typicode.com/comments')
    //     .then(response => response.json())
    //     .then(comment => console.log(comment))


    // let albums = fetch('https://jsonplaceholder.typicode.com/albums')
    //     .then(response => response.json())
    //     .then(album => console.log(album))


    // let photos = fetch('https://jsonplaceholder.typicode.com/photos')
    //     .then(response => response.json())
    //     .then(photo => console.log(photo))


    // let todos = fetch('https://jsonplaceholder.typicode.com/todos')
    //     .then(response => response.json())
    //     .then(todo => console.log(todo))


}

function populateUsers(obj) {
    console.log(obj);
    const section = document.querySelector("section");
    const users = obj;

    for (const user of users) {
        const nameContainer = document.createElement("div");
        nameContainer.classList.add("displaycard");


        const handle = document.createElement("div");
        handle.classList.add("handle");


        const displayname = document.createElement("a");
        displayname.textContent = user.name;
        displayname.href = "userpage.html";
        displayname.classList.add("displayname");
        displayname.id = user.id;
        displayname.addEventListener('click', () => {
            console.log(true);
            currID = user.id;
            console.log(user.id);
            localStorage.setItem("currID", user.id);
        })

        const username = document.createElement("p");
        username.textContent = `@${user.username}`;
        username.classList.add("info");


        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;
        email.classList.add("info");


        const address = document.createElement("p");
        address.textContent = `Address: ${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}
        Geo: ${user.address.geo.lat} ${user.address.geo.lng}`;
        address.classList.add("info");


        const phone = document.createElement("p");
        phone.textContent = `Cell Number: ${user.phone}`;
        phone.classList.add("info");


        const website = document.createElement("p");
        website.textContent = `Website: ${user.website}`;
        website.classList.add("info");


        const company = document.createElement("div");
        company.textContent = "Company: "
        company.classList.add("info")
        const compname = document.createElement("p");
        compname.textContent = user.company.name;
        const catchphrase = document.createElement("p");
        catchphrase.textContent = user.company.catchPhrase;
        const bs = document.createElement("p");
        bs.textContent = user.company.bs;


        company.appendChild(compname);
        company.appendChild(catchphrase);
        company.appendChild(bs);


        nameContainer.appendChild(displayname);
        nameContainer.appendChild(username);
        nameContainer.appendChild(email);
        nameContainer.appendChild(address);
        nameContainer.appendChild(phone);
        nameContainer.appendChild(website);
        nameContainer.appendChild(company)
        section.appendChild(nameContainer);
    }
}


// const userClick = document.querySelectorAll(".displayname")[0];
// userClick.addEventListener('click', ()=> {
//     console.log(true)
// })
// console.log(document.querySelector(".displayName a"));

// document.body.on("click", "a", function() {
//     //this == the link that was clicked
//     var href = $(this).attr("href");
//     alert("You're trying to go to " + href);
// });

function initPosts() {
    console.log(currID)
}