var form = document.forms['register-form'];

// Hàm này để validate khi blur hoặc nhập vào ô input
function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
        }
    }

    input.oninput = function () {
        errorElement.setAttribute('style', 'display: none;');
        input.classList.remove('invalid');
    }
}

handleBlurInput(document.querySelector('input[name="email"]'));
handleBlurInput(document.querySelector('input[name="password"]'));
handleBlurInput(document.querySelector('input[name="fullname"]'));

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var check = true;
    if (isRequired(document.querySelector('input[name="email"]'))) {
        check = false;
    }
    if (isRequired(document.querySelector('input[name="password"]'))) {
        check = false;
    }
    if (isRequired(document.querySelector('input[name="fullname"]'))) {
        check = false;
    }
    if (check) {

        const formValue = {};
        for (const el of e.target) {
            if (el.name) {
                formValue[el.name] = el.value;
            }
        }

        try {
            var results = await axios({
                method: "POST",
                url: "http://localhost:3000/users",
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
    }

    function isRequired(input) {
        var errorElement = input.parentElement.querySelector('.form-message');
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
            return true;
        }
    }
})