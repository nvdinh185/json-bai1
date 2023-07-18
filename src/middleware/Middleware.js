const formidable = require('formidable');
const fs = require('fs');

class Middleware {

    uploadFile(req, res, next) {
        const dirUpload = 'client/avatar';
        if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);
        const form = new formidable.IncomingForm();
        form.uploadDir = dirUpload;
        form.parse(req, async (err, fields, files) => {
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
                    var filenameStored = `${dirUpload}/${fileName}_${Date.now()}.${ext}`;

                    var oldpath = files[key].filepath;
                    var newpath = filenameStored
                    //chuyển file từ thư mục temp sang thư mục upload_files
                    await new Promise((resolve, reject) => {
                        fs.rename(oldpath, newpath, err => {
                            if (err) {
                                reject("Error..." + err);
                            } else {
                                resolve('OK');
                            }
                        });
                    })

                    formData[key] = filenameStored.slice(7);
                } else {
                    formData[key] = '';
                }
                // console.log(formData);
                req.form_data = formData;
                next();
            }
        })
    }

}

module.exports = new Middleware();