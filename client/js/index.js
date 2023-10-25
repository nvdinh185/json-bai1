const bookApi = 'http://localhost:3000/user';

async function index() {

    var bodyElement = $('#tblBody');

    try {
        var listUsers = await axios.get(bookApi);
        listUsers = listUsers.data;

        bodyElement.html('');
        for (const user of listUsers) {
            bodyElement.html(bodyElement.html() +
                `<tr align='center'>
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.fullname}</td>
                    <td>
                        <button onclick="onUpdate('${user.id}')">Sửa</button>
                        <button onclick="onDelete('${user.id}')">Xóa</button>
                    </td>
                </tr>`);
        }
    } catch (error) {
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu!');
        errorElement.attr('style', 'display: block; color: red; font-style: italic;');
    }
}

index();

function onUpdate(id) {
    location = `capnhat.html?id=${id}`;
}

async function onDelete(id) {
    if (confirm('Bạn có chắc muốn xóa không?')) {
        await axios({
            method: "DELETE",
            url: bookApi + '/' + id
        });
        index();
    }
}