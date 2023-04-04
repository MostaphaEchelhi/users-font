import {printLoginForm, printLogoutBtn } from "./userForm.js"

let root = document.getElementById("root");
let showUserListBtn = document.getElementById("showUserListBtn");

let newUser = document.getElementById("newUser");
let newUserPassword = document.getElementById("newUserPassword")
let saveUserBtn = document.getElementById("saveUserBtn");
//let loginUsername = document.getElementById("loginUsername");
//let loginPassword = document.getElementById("loginPassword")
//let loginUserBtn = document.getElementById("loginUserBtn");
let UserGreeting = document.getElementById("UserGreeting");

if (localStorage.getItem("username")) {
    console.log("är inloggad")
    printLogoutBtn();
} else {
    console.log("är ej inloggad");
    printLoginForm();
}



let loggedInUser = localStorage.getItem("username");

if (loggedInUser) {
    UserGreeting.innerText = "Godmorgon " + loggedInUser;
}

showUserListBtn.addEventListener("click", printUserList);

function printUserList() {
    
    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(users => {
    //console.log(data);

    console.log(users);

    let usersList = document.createElement("ul");
    usersList.innerHTML = "";

    users.map(user => {
        let li = document.createElement("li")
        li.id = user.id;
        li.innerText = user.name;
        usersList.appendChild(li);
    })

    usersList.addEventListener("click", (e) => {
        console.log("click på lista", e.target.id);

        printUserInfo(e.target.id);
    })

    root.innerHTML = "";
    root.appendChild(usersList);

});    



function printUserInfo(userId) {
    //console.log("Visar att det funkar");

    fetch("http://localhost:3000/users/" + userId + "/apihemlighet")
    .then(res => res.json())
    .then(data => {
        console.log(data);
    
// KOLLA OM 401, SKRIV NÅGOT SNÄLLT TILL BESÖKAREN 
//ANNARS
    let userInfoDiv = document.createElement("div")
    userInfoDiv.innerHTML = "<p>" + data.name + "<br/>" + data.password + "</p>";
    root.innerHTML = "";
    root.append(userInfoDiv);
    })
    .catch(err => console.log("err", err))
    .finally(final => {
        document.body.innerHTML = "<h1>NEJ</h1>";
        console.log("final". final);
    })
}





}

saveUserBtn.addEventListener("click", () => {
    let user = {name: newUser.value, password: newUserPassword.value};
    console.log(user);

    fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json", 
    },
    body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        printUserList(data);
    });
    newUser.value = "";
    newUserPassword.value = "";

})

