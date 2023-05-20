module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    // console.log(`typeof: ${typeof err}`);
    // console.log(`name: ${err.name}`);
    // console.log(`err: ${err}`);
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (typeof (err) === 'object') {
        // custom application error
        return res.status(402).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}