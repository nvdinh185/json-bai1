const bookApi = 'http://localhost:3000/user';

var form = $('#update-form');
var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
if (currentUser) {
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
            var userById = await axios({
                method: "GET",
                url: bookApi + '/' + edId,
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            userById = userById.data;

            var id = $('input[name="id"]');
            id.val(userById.id);

            var email = $('input[name="email"]');
            email.val(userById.email);

            var password = $('input[name="password"]');
            password.val(userById.password);

            var fullname = $('input[name="fullname"]');
            fullname.val(userById.fullname);

            var avatar = $("#avatar");
            avatar.attr('src', `avatar/${userById.avatar}`);

        } catch (error) {
            console.log(error);
            var errorElement = $('#error');
            $(errorElement).text('Xảy ra lỗi khi lấy dữ liệu để sửa!');
            $(errorElement).attr('style', 'color: red; font-style: italic;');
        }
    }

    getUserById();
} else {
    // Nếu chưa đăng nhập thì chuyển hướng sang trang login.html
    location = 'login.html';
}

form.on('submit', async function (e) {
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
            url: bookApi + '/' + edId,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${currentUser.token}`
            },
        });

        //handle success
        // console.log('results: ', results);
        location = 'index.html?msg=2';
    } catch (error) {
        var errorElement = $('#error');
        $(errorElement).text('Xảy ra lỗi khi sửa!');
        $(errorElement).attr('style', 'color: red; font-style: italic;');
    }
})