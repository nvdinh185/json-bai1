var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
if (currentUser && currentUser.role === 1) {
    function getParameterByName(name, url = location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var id = getParameterByName('id');
    async function getUserById(userId) {
        var userById = await axios({
            method: "GET",
            url: `http://localhost:3000/user/${userId}`,
            headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        userById = userById.data;

        var fullnameElement = document.getElementById('fullname');
        fullnameElement.innerText = 'Cập nhật thông tin cho : ' + userById.fullname;

        var id = form.querySelector('input[name="id"]');
        id.value = userById.id;

        var email = form.querySelector('input[name="email"]');
        email.value = userById.email;

        var fullname = form.querySelector('input[name="fullname"]');
        fullname.value = userById.fullname;

        var avatar = form.querySelector('#avatar');
        avatar.src = `avatar/${userById.avatar}`;
    }
    getUserById(id);

    var form = document.forms['update-form'];
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData();
        for (const el of e.target) {
            if (el.files) {
                formData.append("file", el.files[0]);
            } else if (el.name) {
                formData.append(el.name, el.value);
            }
        }
        try {
            var results = await axios({
                method: "PUT",
                url: "http://localhost:3000/user/update",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${currentUser.token}`
                },
            });

            //handle success
            // console.log('results: ', results);
            location = 'index.html';
        } catch (error) {
            var errorElement = document.getElementById('error');
            errorElement.innerText = 'Xảy ra lỗi: ' + error;
            Object.assign(errorElement.style, {
                display: 'block',
                color: 'red',
                fontStyle: 'italic',
                fontWeight: 'bold',
                backgroundColor: 'yellow'
            })
        }
    })
} else {
    location = 'index.html?err=1';
}