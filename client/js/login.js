var form = document.forms['login-form'];

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userInfo = {};
    for (const el of e.target) {
        if (el.name) {
            userInfo[el.name] = el.value;
        }
    }
    // console.log(userInfo);

    var user = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    }).then(function (response) {
        return response.json();
    });

    // handle success
    // console.log('OK', user);

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location = 'index.html';

})