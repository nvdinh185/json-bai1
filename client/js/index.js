const getData = async () => {
    var tblElement = document.getElementById('tbl');

    var bodyElement = tblElement.getElementsByTagName('tbody')[0];

    try {
        var listUsers = await axios({
            method: "GET",
            url: "http://localhost:3000/user",
            headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        listUsers = listUsers.data;

        bodyElement.innerHTML = '';
        for (const user of listUsers) {
            bodyElement.innerHTML +=
                `<tr align='center'>
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td><img src="avatar/${user.avatar}" alt="Không có hình ảnh" width="100px" height="100px" /></td>
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
        Object.assign(errorElement.style, {
            display: 'block',
            color: 'red',
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow'
        })
    }
}

var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
if (currentUser) {
    getData();

    var greetingElement = document.getElementById('greeting');
    greetingElement.innerText = 'Xin chào : ' + currentUser.fullname;

    var logoutElement = document.getElementById('logout');
    logoutElement.onclick = function () {
        localStorage.removeItem('currentUser');
        location.reload();
    }

} else {
    // Nếu chưa đăng nhập thì chuyển hướng sang trang dangnhap.html
    location = 'dangnhap.html';
}

function onUpdate(id) {
    if (currentUser && currentUser.role === 1) {
        location = `capnhat.html?id=${id}`;
    } else {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Không có quyền sửa!';
        Object.assign(errorElement.style, {
            display: 'block',
            color: 'red',
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow'
        })
    }
}

async function onDelete(id) {
    if (currentUser && currentUser.role === 1) {
        if (confirm('Bạn có chắc muốn xóa không?')) {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/user/delete/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser.token}`
                },
            });
            getData();
        }
    } else {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Không có quyền xóa!';
        Object.assign(errorElement.style, {
            display: 'block',
            color: 'red',
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow'
        })
    }
}