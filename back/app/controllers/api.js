const request = require('request');
const xml2js = require('xml2js');

module.exports = function(app) {
    app.get('/feed/:username/:repo', function(req, res) {
        var username = req.params.username;
        var repo = req.params.repo;
        var token = req.query.token;

        request('https://github.com/' + username + '/' + repo + '/releases.atom' + (token ? ('?token=' + token) : ''), function (error, response, body) {
            if (error) {
                console.log(error);
            } else if (response.statusCode != 200) {
                res.status(response.statusCode).send(body);
            } else {
                xml2js.parseString(body, function (err, result) {
                    res.status(200).json(result);
                });
            }
        });
    });
}