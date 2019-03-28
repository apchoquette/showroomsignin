const jsforce = require('jsforce');
const keys = require('../config/keys');

module.exports = (app) => {
    app.get('/api/showroom-visitor', (req, res) => {
        var conn = new jsforce.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl : 'https://test.salesforce.com'
          });
          conn.login(keys.sfUsername, keys.sfPassword+keys.sfToken, function(err, userInfo) {
            if (err) { return console.error(err); }
            const  records = [];
            var query = conn.query("SELECT Name,email FROM Lead WHERE email LIKE 'apchoquette@gmail.com'")
            .on("record", function(record) {
                records.push(record);
            })
            .on("end", function() {
                console.log("total in database : " + query.totalSize);
                console.log("total fetched : " + query.totalFetched);
                res.status(200)
                res.send(records[0])
            })
            .on("error", function(err) {
                console.error(err);
                res.status(404)
                res.send('Visitor Not Found')
            })
            .run({ autoFetch : true, maxFetch : 4000 }); 
            // synonym of Query#execute();
                })
          });
          
            
}