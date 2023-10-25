const bookApi = 'http://localhost:3000/users';

async function index() {
    var tblElement = document.getElementById('tbl');

    var bodyElement = tblElement.getElementsByTagName('tbody')[0];

    try {
        var listUsers = await axios.get(bookApi);
        listUsers = listUsers.data;

        bodyElement.innerHTML = '';
        for (const user of listUsers) {
            bodyElement.innerHTML +=
                `<tr align='center'>
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.fullname}</td>
                    <td>
                        <button onclick="onUpdate('${user.id}')">Sửa</button>
                        <button onclick="onDelete('${user.id}')">Xóa</button>
                    </td>
                </tr>`;
        }
    } catch (error) {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Xảy ra lỗi: ' + error;
        errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
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
            url: `${bookApi}/${id}`
        });
        index();
    }
}