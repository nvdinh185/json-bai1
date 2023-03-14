var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
if (currentUser) {

    (async () => {
        var tblElement = document.getElementById('tbl');

        var bodyElement = tblElement.getElementsByTagName('tbody')[0];

        try {
            var listUsers = await axios({
                method: "GET",
                url: "http://localhost:3000/users",
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            listUsers = listUsers.data;

            for (const user of listUsers) {
                var trElement = document.createElement('tr');
                trElement.innerHTML =
                    `<tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td><img src="${user.avatar}" alt="" width="100px" height="100px" /></td>
                        <td>${user.fullname}</td>
                    </tr>`;
                trElement.setAttribute('align', 'center');

                bodyElement.appendChild(trElement);

            }
        } catch (error) {
            var errorElement = document.getElementById('error');
            errorElement.innerText = 'Xảy ra lỗi!';
            Object.assign(errorElement.style, {
                display: 'block',
                color: 'red',
                fontStyle: 'italic',
                fontWeight: 'bold'
            })
        }
    })()

    var greetingElement = document.getElementById('greeting');
    greetingElement.innerText = 'Xin chào : ' + currentUser.fullname;

    var logoutElement = document.getElementById('logout');
    logoutElement.onclick = function () {
        localStorage.removeItem('currentUser');
        location.reload();
    }

} else {
    // Nếu chưa login thì chuyển hướng sang trang login.html
    window.location = 'login.html';
}