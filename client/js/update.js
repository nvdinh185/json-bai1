var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
if (currentUser && currentUser.role === 1) {
    var fullnameElement = document.getElementById('fullname');
    fullnameElement.innerText = 'Cập nhật thông tin cho : ' + currentUser.fullname;

    var form = document.forms['update-form'];

    var email = form.querySelector('input[name="email"]');
    email.value = currentUser.email;

    var fullname = form.querySelector('input[name="fullname"]');
    fullname.value = currentUser.fullname;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", currentUser.id);
        for (const el of e.target) {
            if (el.files) {
                formData.append("file", el.files[0]);
            } else if (el.value) {
                formData.append(el.name, el.value);
            }
        }
        try {
            var results = await axios({
                method: "POST",
                url: "http://localhost:3000/users/update",
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