const bookApi = 'http://localhost:3000/user';

var form = $('#update-form');

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

        var id = $('input[name="id"]');
        id.val(userById.id);

        var email = $('input[name="email"]');
        email.val(userById.email);

        var password = $('input[name="password"]');
        password.val(userById.password);

        var fullname = $('input[name="fullname"]');
        fullname.val(userById.fullname);

    } catch (error) {
        var errorElement = $('#error');
        $(errorElement).text('Xảy ra lỗi khi lấy dữ liệu để sửa!');
        $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
    }
}

getUserById();


form.on('submit', async function (e) {
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
            url: bookApi,
            data: formValue
        });

        //handle success
        // console.log('results: ', results);
        location = 'index.html';
    } catch (error) {
        var errorElement = $('#error');
        $(errorElement).text('Xảy ra lỗi khi sửa!');
        $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
    }
})