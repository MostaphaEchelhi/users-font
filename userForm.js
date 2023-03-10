let userForm = document.getElementById("userForm");


export function printLoginForm() {
    //skapa vy för att logga in 
    
    let loginUsername = document.createElement("input");
    loginUsername.placeholder = "Namn";
    let loginPassword = document.createElement("input");
    loginPassword.placeholder = "Lösenord";
    let loginUserBtn = document.createElement("button");
    loginUserBtn.innerText = "logga in";
    
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
                printLogoutBtn();
            } else {
                UserGreeting.innerText = "Fel lösenord eller användarnamn";
            }
        });
        
    
    });
    
    userForm.innerHTML = "";
    userForm.append(loginUsername, loginPassword, loginUserBtn)
    
}

export function printLogoutBtn() {
    //skapa loggga ut knapp
    let logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logga ut";

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        printLoginForm();
    })
    userForm.innerHTML = "";
    userForm.appendChild(logoutBtn);
}
