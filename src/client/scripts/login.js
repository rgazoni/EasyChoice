async function signIn(){
    let user = $('#usernameInput');
    let password = $('#loginPasswordInput');

    await fetch("/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            username: user.val(),
            password: password.val()
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message);
        console.log(data.status);
        if(data.status)
            window.location.reload();
    });

}

async function signUp(){
    let user = $('#registerUsernameInput').val();
    let password = $('#registerPasswordInput').val();

    console.log(user);
    console.log(password);
    await fetch("/api/users/signup", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            username: user,
            password: password
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.status)
            window.location.reload();
    });

    window.location.reload();
}

async function logout(){
    await fetch("/api/users/logout", {
        method: "GET",
    });
}


