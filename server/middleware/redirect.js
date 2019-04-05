module.exports = (app) => {
    app.use(function (req, res, next) {
        if (req.headers['x-forwarded-proto'] === 'https') {
          res.redirect('http://' + req.hostname + req.url);
        } else {
          next();
        }
      });
}

