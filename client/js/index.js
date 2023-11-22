const bookApi = 'http://localhost:3000/user';

async function index() {

    var bodyElement = $('#tblBody');

    try {
        var listUsers = await axios.get(bookApi);
        listUsers = listUsers.data;

        var htmls = listUsers.map(function (user) {
            return `<tr align='center'>
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td><img src="avatar/${user.avatar ? user.avatar : 'No-Image.png'}"
                    alt="Không có hình ảnh" width="100px" height="100px" /></td>
                <td>${user.fullname}</td>
                <td>
                    <button onclick="onUpdate('${user.id}')">Sửa</button>
                    <button onclick="onDelete('${user.id}')">Xóa</button>
                </td>
            </tr>`
        })
        bodyElement.html(htmls.join(''));
    } catch (error) {
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu!');
        errorElement.attr('style', 'color: red; font-style: italic;');
    }
}

index();

function onUpdate(id) {
    location = `capnhat.html?id=${id}`;
}

async function onDelete(id) {
    if (confirm('Bạn có chắc muốn xóa không?')) {
        try {
            await axios({
                method: "DELETE",
                url: bookApi + '/' + id
            });
            location = 'index.html?msg=3';
        } catch (error) {
            var errorElement = $('#error');
            errorElement.text('Xảy ra lỗi khi xóa!');
            errorElement.attr('style', 'color: red; font-style: italic;');
        }
    }
}

function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var msg = getParameterByName('msg');

var msgElement = $('#msg');
$(msgElement).attr('style', 'color: green; font-style: italic;');
if (msg === '1') {
    msgElement.text('Đã thêm thành công!');
} else if (msg === '2') {
    msgElement.text('Đã sửa thành công!');
} else if (msg === '3') {
    msgElement.text('Đã xóa thành công!');
}