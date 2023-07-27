async function index() {
    var tblElement = document.getElementById('tbl');

    var bodyElement = tblElement.getElementsByTagName('tbody')[0];

    try {
        var listUsers = await axios({
            method: "GET",
            url: "http://localhost:3000/user",
        });
        listUsers = listUsers.data;

        bodyElement.innerHTML = '';
        for (const user of listUsers) {
            var trElement = document.createElement('tr');
            trElement.innerHTML =
                `<tr>
                    <td>${user.email}</td>
                    <td><img src="avatar/${user.avatar ? user.avatar : 'No-Image.png'}"
                    alt="Không có hình ảnh" width="100px" height="100px" /></td>
                    <td>${user.fullname}</td>
                    <td>
                        <button onclick="onUpdate('${user.id}')">Sửa</button>
                        <button onclick="onDelete('${user.id}')">Xóa</button>
                    </td>
                </tr>`;
            trElement.setAttribute('align', 'center');

            bodyElement.appendChild(trElement);

        }
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
}

index();

function onUpdate(id) {
    location = `capnhat.html?id=${id}`;
}

async function onDelete(id) {
    if (confirm('Bạn có chắc muốn xóa không?')) {
        await axios({
            method: "DELETE",
            url: `http://localhost:3000/user/delete/${id}`,
            headers: { "Content-Type": "application/json" },
        });
        index();
    }
}