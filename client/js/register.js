var form = document.forms['register-form'];

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formValue = {};
    for (const el of e.target) {
        if (el.name) {
            formValue[el.name] = el.value;
        }
    }
    formValue.avatar = 'default.jpg';

    try {
        var results = await axios({
            method: "POST",
            url: "http://localhost:3000/users",
            data: formValue
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