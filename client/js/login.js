var form = document.forms['login-form'];

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userInfo = {};
    for (const el of e.target) {
        if (el.name) {
            userInfo[el.name] = el.value;
        }
    }
    console.log(userInfo);

    // await fetch({
    //     method: "POST",
    //     url: "http://localhost:3000/login",
    //     data: userInfo,
    //     headers: { "Content-Type": "application/json" }
    // });

    // handle success
    console.log('OK');

})