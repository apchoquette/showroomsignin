const jsforce = require('jsforce');
const keys = require('../config/keys');

module.exports = (app) => {

    app.get('/api/showroom-visitor/:email', (req,res) => {
        
        const { email } = req.params
        
        const records = [];

        var conn = new jsforce.Connection({ 
            loginUrl : keys.loginURL
          });
            
            //initiate connection, run async query and await records. 
        conn.login(keys.sfUsername, keys.sfPassword+keys.sfToken, async function(err, userInfo) {
            if (err) { 
                res.status(408)
                return console.error(err); 
            }          
            var query = await conn.query(`SELECT Id,Name, email__c, Industry__c, Company_Name__c, 
                Street__c,City__c,State__c,zip__c,Phone_Number__c, Classification__c, NumberOfVisits__c, AddToEmailList__c,
                Referrer__c, Referrer_Name__c FROM Showroom_Visitor__c WHERE email__c LIKE '${email}'`)
                    .on("record", function(record) {
                    records.push(record);
                    })
                if(records.length === 0){
                    res.status(404).send('User not found.')
                }else{
                    res.status(200).send(records[0])
                    
                }
            })
    })
    

    app.post('/api/showroom-visitor', (req,res)=> {

        let { firstName,email,lastName,industry,companyName,street,city,state,zip,phone,classification,addToEmailList,referrer, referrerDetail, material } = req.body
        //create an object that maps form values to 'Showroom Visitor' custom object in Salesforce.
        let newShowroomVisitor = {
            Name: firstName + ' ' + lastName,
            email__c: email,
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
            Referrer__c: referrer,
            Referrer_Name__c: referrerDetail,
            Product_Interest__c: material

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
                if (err) { 
                    res.status(408)
                    return console.error(err); 
                }          
                var query = await conn.query(`SELECT Id,Name, email__c, Industry__c, Company_Name__c, 
                Street__c,City__c,State__c,zip__c,Phone_Number__c, Classification__c, NumberOfVisits__c, AddToEmailList__c,
                Referrer__c, Referrer_Name__c FROM Showroom_Visitor__c WHERE email__c LIKE '${newVisitorObject.email__c}'`)
                    .on("record", function(record) {
                    records.push(record);
                    })
                if(records.length === 0){
                    callback(newVisitorObject);
                }else{
                    console.log(records[0])
                    res.status(200).send(records[0])
                    
                }
            })
        }
        
        checkExisting(newShowroomVisitor,(newShowroomVisitor) => {
            if(newShowroomVisitor.Name !== '' || newShowroomVisitor.Name !== 'undefined undefined'){
                conn.sobject("Showroom_Visitor__c").create(newShowroomVisitor, function(err, ret) {
                    if( err || !ret.success ){
                        res.status(400).send(err)
                        return console.error(err, ret);
                    }
                    
                    res.status(200).send(ret.id);
                    console.log("Created record id : " + ret.id);        
                  });
            }
            
            
        });
})
    app.put('/api/showroom-visitor/:sfId', (req,res) => {

        const { sfId } = req.params

        const { number, street, city, state, zip, phone, addToEmailList, material } = req.body

        console.log(number)

        const conn = new jsforce.Connection({ 
            loginUrl : keys.loginURL
        });
        
        conn.login(keys.sfUsername, keys.sfPassword+keys.sfToken, async function(err, userInfo) {
            if (err) { return console.error(err); }
            conn.sobject("Showroom_Visitor__c").update({ 
                Id : sfId,
                NumberOfVisits__c: number + 1,
                Street__c: street,
                City__c: city,
                State__c: state,
                zip__c: zip,
                AddToEmailList__c: addToEmailList,
                Phone_Number__c: phone,
                Product_Interest__c: material

              }).then( function (response) {
                  res.status(200).send(response)
              }).catch( function(err, ret) {
                if (err || !ret.success) { 
                    res.status(400).send(err)
                    return console.error(err, ret); }
                    
                
              })})
            
            })
            
        
        
        

        



        
       
}