module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    // console.log(`typeof: ${typeof err}`);
    console.log(`message: ${err.message}`);

    // default to 500 server error
    return res.status(500).send({ message: err.message });
}