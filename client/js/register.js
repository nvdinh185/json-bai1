var form = $('#register-form');

// Hàm này để validate khi blur hoặc nhập vào ô input
function handleBlurInput(input) {
    var errorElement = input.parent().children()[2];
    input.blur(function () {
        if (input.val().trim() === '') {
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text('Yêu cầu nhập!');
            input.addClass('invalid');
        }
    })

    input.on('input', function () {
        $(errorElement).attr('style', 'display: none;');
        input.removeClass('invalid');
    })
}

handleBlurInput($('input[name="email"]'));
handleBlurInput($('input[name="password"]'));
handleBlurInput($('input[name="fullname"]'));

form.on('submit', async function (e) {
    e.preventDefault();

    var check = true;
    if (isRequired($('input[name="email"]'))) {
        check = false;
    }
    if (isRequired($('input[name="password"]'))) {
        check = false;
    }
    if (isRequired($('input[name="fullname"]'))) {
        check = false;
    }

    if (check) {

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
                method: "POST",
                url: "http://localhost:3000/user",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            //handle success
            // console.log('results: ', results);
            location = 'index.html?msg=1';
        } catch (error) {
            var errorElement = $('#error');
            $(errorElement).text('Xảy ra lỗi khi thêm');
            $(errorElement).attr('style', 'color: red; font-style: italic;');
        }
    }

    function isRequired(input) {
        var errorElement = input.parent().children()[2];
        if (input.val().trim() === '') {
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text('Yêu cầu nhập!');
            input.addClass('invalid');
            return true;
        }
    }
})