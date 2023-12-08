//Extracts saved local storage data
let currID = localStorage.getItem("currID"); 
let currName = localStorage.getItem("currName")

//initializes user id to 0
function init() {
    currID = 0;
}

//Extract all the users to an array "user" and call the populateUsers functions
const getJSONUsers = async () => {
    let users = fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(user => populateUsers(user))
}

//Extracts each user from the array and create html elements to display them
let populateUsers = (obj) => {
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
            //uploads current id and current name to a local storage (Credit to Jelani Creary)
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

//Extracts all posts to one array and called the populatePosts function
const getJSONPosts = () => {
    console.log(currID)
    let posts = fetch(`https://jsonplaceholder.typicode.com/users/${currID}/posts`)
        .then(response => response.json())
        .then(post => populatePosts(post))
}

//Extracts each post and display them as html elements
const populatePosts = (obj) => {
    const section = document.getElementById('postsection')
    const posts = obj;
    console.log(posts);
    posts.map(post => {
        const postContainer = document.createElement("div");

        const displayPost = document.createElement("div");
        displayPost.classList.add("displaypost");

        const poster = document.createElement("h2");
        poster.textContent = `Posted by: ${currName}`;
        poster.classList.add("postText");

        const postTitle = document.createElement("h3");
        postTitle.textContent = post.title;
        postTitle.classList.add("postTitle");

        const postBody = document.createElement("p");
        postBody.textContent = post.body;
        postBody.classList.add("postText");

        const commentContainer = document.createElement("div");
        commentContainer.style.display = "none";

        //Extracts each comment from each post according to postid and creates html elements to display them
        let comments = fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(response => response.json())
            .then(comment => {
                console.log(post.id);
                comment.map(comm => {
                    console.log(comm);
                    const commentBox = document.createElement("div");
                    commentBox.classList.add("comContainer");

                    const commentTitle = document.createElement("h3");
                    commentTitle.textContent = comm.name;
                    commentTitle.classList.add("postTitle");

                    const commentEmail = document.createElement("p");
                    commentEmail.textContent = `From: ${comm.email}`;
                    commentEmail.classList.add("email");

                    const commentBody = document.createElement("p");
                    commentBody.textContent = comm.body;
                    commentBody.classList.add("postText");

                    commentBox.appendChild(commentTitle);
                    commentBox.appendChild(commentEmail);
                    commentBox.appendChild(commentBody);
                    commentContainer.appendChild(commentBox);
                })
            })

        const seeComments = document.createElement("p");
        seeComments.textContent = "See Comments";
        seeComments.classList.add("seeMore");

        //Hides or Displays the comments on click
        hideComments = false;
        seeComments.addEventListener("click", () => {
            if (hideComments) {
                seeComments.textContent = "See Comments";
                hideComments = false;
                commentContainer.style.display = "none";
            }
            else {
                seeComments.textContent = "Hide Comments";
                hideComments = true;
                commentContainer.style.display = "block";
            }
        })

        displayPost.appendChild(poster);
        displayPost.appendChild(postTitle);
        displayPost.appendChild(postBody);
        displayPost.appendChild(seeComments);
        displayPost.appendChild(commentContainer)

        postContainer.appendChild(displayPost)

        section.appendChild(postContainer);
    });
}