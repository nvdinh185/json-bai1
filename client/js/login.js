if (localStorage.getItem('currentUser')) {
    // Nếu đã đăng nhập thì chuyển hướng sang trang index.html
    location = 'index.html';
} else {
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
        try {
            var user = await axios({
                method: "POST",
                url: "http://localhost:3000/user/login",
                data: userInfo,
                headers: { "Content-Type": "application/json" },
            });

            // handle success
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            location = 'index.html';
        } catch (err) {
            // console.log(err.message);
            var errorElement = document.getElementById('error');
            errorElement.innerText = 'Xảy ra lỗi!';
            Object.assign(errorElement.style, {
                display: 'block',
                color: 'red',
                fontStyle: 'italic',
                fontWeight: 'bold'
            })
        }
    })
}