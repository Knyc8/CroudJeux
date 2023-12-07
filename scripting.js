let currID = localStorage.getItem("currID");
let currName = localStorage.getItem("currName")

function init() {
    currID = 0;
}

const getJSONUsers = async () => {
    let users = fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(user => populateUsers(user))


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

let populateUsers = (obj) =>{
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
            localStorage.setItem("currName", user.name);
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


const getJSONPosts = () => {
    console.log(currID)
    let posts = fetch(`https://jsonplaceholder.typicode.com/users/${currID}/posts`)
        .then(response => response.json())
        .then(post => populatePosts(post))
}

const populatePosts = (obj) =>{
    const section = document.getElementById('postsection')
    const posts = obj;
    console.log(posts);
    posts.map(post => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("displaypost");
        console.log(post)
        const displayPost = document.createElement("div");
        displayPost.classList.add("displayPost");

        const poster = document.createElement("h2");
        poster.textContent = `Posted by: ${currName}`;
        poster.classList.add("displayname");

        const postTitle = document.createElement("h3");
        postTitle.textContent = post.title;
        postTitle.classList.add("displayname");

        const postBody = document.createElement("p");
        postBody.textContent = post.body;
        postBody.classList.add("displayname");

        const seeComments = document.createElement("p");
        seeComments.textContent = "See Comments";
        seeComments.classList.add("displayname");
        hideComments = false;
        seeComments.addEventListener("click", ()=> {
            if (hideComments) {
                seeComments.textContent = "See Comments";
                hideComments = false;
            }
            else {
                seeComments.textContent = "Hide Comments";
                hideComments = true;
            }
        })

        displayPost.appendChild(poster);
        displayPost.appendChild(postTitle);
        displayPost.appendChild(postBody);
        displayPost.appendChild(seeComments);

        postContainer.appendChild(displayPost)

        section.appendChild(postContainer);
    });
}