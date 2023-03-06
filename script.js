let usersList = document.getElementById("usersList");
let newUser = document.getElementById("newUser");
let newUserPassword = document.getElementById("newUserPassword")
let saveUserBtn = document.getElementById("saveUserBtn");
let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword")
let loginUserBtn = document.getElementById("loginUserBtn");
let UserGreeting = document.getElementById("UserGreeting");



fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => {
    //console.log(data);
    printUsers(data);
});    

let loggedInUser = localStorage.getItem("username");

if (loggedInUser) {
    UserGreeting.innerText = "Godmorgon " + loggedInUser;
}



function printUsers(users) {
    console.log(users);

    usersList.innerHTML = "";

    users.map(user => {
        let li = document.createElement("li")
        li.id = user.id;
        li.innerText = user.name;
        usersList.appendChild(li);
    })
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
        printUsers(data);
    });
    newUser.value = "";
    newUserPassword.value = "";

})

loginUserBtn.addEventListener("click", () => {
    
    let loginUser = {
        name: loginUsername.value,
        password: loginPassword.value
    } 
    console.log(loginUser);

    fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json", 
    },
    body: JSON.stringify(loginUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.name) {
            UserGreeting.innerText = "Godmorgon " + data.name;
            localStorage.setItem("username", data.name);
        } else {
            UserGreeting.innerText = "Fel lösenord eller användarnamn";
        }
    });
    loginUsername.value = "";
    loginPassword.value = "";

});
