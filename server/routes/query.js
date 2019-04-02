const jsforce = require('jsforce');
const keys = require('../config/keys');

module.exports = (app) => {
    // app.get('/api/showroom-visitor', (req, res) => {
    //     var conn = new jsforce.Connection({
    //         // you can change loginUrl to connect to sandbox or prerelease env.
    //         loginUrl : 'https://test.salesforce.com'
    //       });
    //       conn.login(keys.sfUsername, keys.sfPassword+keys.sfToken, function(err, userInfo) {
    //         if (err) { return console.error(err); }
    //         const  records = [];
    //         var query = conn.query(`SELECT Name,email FROM Lead WHERE email LIKE '${params.email}'`)
    //         .on("record", function(record) {
    //             records.push(record);
    //         })
    //         .on("end", function() {
    //             if(records.length === 1){
    //                 conn.update({
    //                     Id: records[0].Id,
    //                     NumberOfVisits: records[0].NumberOfVisits++
    //                 })
    //             }
    //             res.status(200)
    //             res.send(records[0])
    //         })
    //         .on("error", function(err) {
    //             console.error(err);
    //             res.status(404)
    //             res.send('Visitor Not Found')
    //         })
    //         .run({ autoFetch : true, maxFetch : 4000 }); 
    //         // synonym of Query#execute();
    //             })
    //       });
    app.post('/api/showroom-visitor', (req,res)=> {

        let { firstName,email,lastName,industry,companyName,street,city,state,zip,phone,classification,addToEmailList,referrer } = req.body
        //create an object that maps form values to 'Showroom Visitor' custom object in Salesforce.
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

        //instantiate Salesforce connection 
        var conn = new jsforce.Connection({ 
            loginUrl : keys.loginURL
          });

        //Check for existing records; if existing record does not exist, create it. 
        let checkExisting = (newVisitorObject,callback) => {

            const records = [];
            
            //initiate connection, run async query and await records. 
            conn.login(keys.sfUsername, keys.sfPassword+keys.sfToken, async function(err, userInfo) {
                if (err) { return console.error(err); }          
                var query = await conn.query(`SELECT Id,Name, email__c, Last_Name__c, Industry__c, Company_Name__c, 
                Street__c,City__c,State__c,zip__c,Phone_Number__c, Classification__c, NumberOfVisits__c, AddToEmailList__c,
                Referrer__c FROM Showroom_Visitor__c WHERE email__c LIKE '${newVisitorObject.email__c}'`)
                    .on("record", function(record) {
                    records.push(record);
                    })
                if(records.length === 0){
                    callback(newVisitorObject);
                }else{
                    console.log(records[0])
                    res.send(records[0])
                    
                }
            })
        }
        
        checkExisting(newShowroomVisitor,(newShowroomVisitor) => {
            
            conn.sobject("Showroom_Visitor__c").create(newShowroomVisitor, function(err, ret) {
                if( err || !ret.success ){
                    return console.error(err, ret);
                }
                res.send(200,ret.id)
                console.log("Created record id : " + ret.id);        
              });
        });
})
    app.put('/api/showroom-visitor', (req,res) => {
        
    })   
}