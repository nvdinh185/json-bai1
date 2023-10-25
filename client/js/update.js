const bookApi = 'http://localhost:3000/users';

var form = document.forms['update-form'];

function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var edId = getParameterByName('id');

async function getUserById() {
    try {
        var userById = await axios.get(bookApi + '/' + edId);
        userById = userById.data;

        var id = form.querySelector('input[name="id"]');
        id.value = userById.id;

        var email = form.querySelector('input[name="email"]');
        email.value = userById.email;

        var password = form.querySelector('input[name="password"]');
        password.value = userById.password;

        var fullname = form.querySelector('input[name="fullname"]');
        fullname.value = userById.fullname;

    } catch (error) {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Xảy ra lỗi: ' + error;
        errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
    }
}

getUserById();


form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formValue = {};
    for (const el of e.target) {
        if (el.name) {
            formValue[el.name] = el.value;
        }
    }

    try {
        var results = await axios({
            method: "PUT",
            url: `${bookApi}/${formValue.id}`,
            data: formValue
        });

        //handle success
        // console.log('results: ', results);
        location = 'index.html';
    } catch (error) {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Xảy ra lỗi: ' + error;
        errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
    }
})