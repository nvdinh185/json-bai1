const formidable = require('formidable');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config.json');

class Middleware {

    uploadFile(req, res, next) {
        const dirUpload = 'client/avatar';
        if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);
        const form = new formidable.IncomingForm();
        form.uploadDir = dirUpload;
        form.parse(req, (err, fields, files) => {
            var formData = {};
            if (err) {
                res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(JSON.stringify({ message: 'Parse Formdata Error', error: err }));
            } else {
                for (var key in fields) {
                    formData[key] = fields[key];
                }
                var isSelectedFile = !(Object.entries(files).length === 0 && files.constructor === Object);
                var key = "file";
                if (isSelectedFile) {
                    var fileName = files[key].originalFilename.split('.')[0];
                    var ext = files[key].originalFilename.split('.')[1];
                    //đường dẫn thực file upload lên
                    var newPath = `${dirUpload}/${fileName}_${Date.now()}.${ext}`;

                    var oldPath = files[key].filepath;
                    //chuyển file từ thư mục temp sang thư mục upload_files
                    fs.renameSync(oldPath, newPath);

                    formData[key] = newPath.slice(14);
                } else {
                    formData[key] = '';
                }
                // console.log(formData);
                req.form_data = formData;
                next();
            }
        })
    }

    authorize(req, res, next) {
        const token = req.headers['authorization'].slice(7);
        jwt.verify(token, secret,
            (err, decoded) => {
                if (err) {
                    console.log('Lỗi xác thực:', err.message);
                    return res.status(401).json({ message: err.message });
                } else {
                    // console.log('decoded: ', decoded);
                    next();
                };
            });
    }

}

module.exports = new Middleware();