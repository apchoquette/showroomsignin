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
            var query = conn.query(`SELECT Name,email FROM Lead WHERE email LIKE '${params.email}'`)
            .on("record", function(record) {
                records.push(record);
            })
            .on("end", function() {
                console.log("total in database : " + query.totalSize);
                console.log("total fetched : " + query.totalFetched);
                if(records.length === 1){
                    conn.update({
                        Id: records[0].Id,
                        NumberOfVisits: records[0].NumberOfVisits++
                    })
                }
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
    app.post('/api/showroom-visitor', (req,res)=> {

        let { firstName,email,lastName,industry,companyName,street,city,state,zip,phone,classification,addToEmailList,referrer } = req.body

        let newShowroomVisitor = {
            Name: firstName,
            email__c: email,
            Last_Name__c: lastName,
            Industry__c: industry,
            Company_Name__c: companyName,
            Street__c: street,
            City__c: city,
            State__c: state,
            zip__c: zip,
            Phone_Number__c: phone,
            Classification__c: classification,
            NumberOfVisits__c: 1, 
            AddToEmailList__c: addToEmailList,
            Referrer__c: referrer

        }

        let httpCode = 404;

        var conn = new jsforce.Connection({
            
            loginUrl : 'https://test.salesforce.com'
          });
          conn.login(keys.sfUsername, keys.sfPassword+keys.sfToken, function(err, userInfo) {
            if (err) { return console.error(err); }
            conn.sobject("Showroom_Visitor__c").create(newShowroomVisitor, function(err, ret) {
                if (err || !ret.success) { 
                    httpCode = 400
                    return console.error(err, ret); }
                console.log("Created record id : " + ret.id);
                httpCode = 200;
                // ...
              });
    })

    res.status(httpCode)
    httpCode === 200 ? res.send('All Good!') : res.send('An Error Occurred')
})
          
            
}