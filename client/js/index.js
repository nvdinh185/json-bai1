if (localStorage.getItem('currentUser')) {

    (async () => {
        var tblElement = document.getElementById('tbl');

        var bodyElement = tblElement.getElementsByTagName('tbody')[0];

        var listUsers = await fetch('http://localhost:3000/users')
            .then(function (response) {
                return response.json();
            });

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
    })()

} else {
    // Nếu chưa login thì chuyển hướng sang trang login.html
    window.location = 'login.html';
}