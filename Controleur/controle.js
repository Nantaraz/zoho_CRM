var Note = require('../Model/client.model');

//const zoho = require('zoho-node-sdk');
const zoho = require('@trifoia/zcrmsdk');

const contr = require('./zoho.crm');

    module.exports.GetList = (req, res,next) => {
        zoho.initialize(contr).then((client) => {
            client.API.MODULES.get({
                module: 'Contacts',
                // params: {
                //     page: 0,
                //     per_page: 25,
                //
            }).then((response) => {
                res.json(JSON.parse(response.body));
            }).catch(next);
        }).catch(next);
    }



    module.exports.PosteList = (req, res, next) => {

        zoho.initialize(contr).then((client) => {
            client.API.MODULES.post({
                module: 'Contacts',
                body: {
                    // Pay ATTENTION! Data is an array!
                    data: [
                      {
                        First_Name: "patrick",
                        Last_Name: "nirina",
                        Email: "psrnirina@gmail.com",
                        Mobile: "0344311824",
                      }
                    ],
                },
            }).then((data) => {
               
                Note.find()
                        .then(note => {
                            if(note.length==0) {
                                id = 0;
                                console.log('tafa',id);
                                
                            }else{
                                id = parseInt(note[note.length-1].id)+1;
                            }
                
                            const insert = new Note({id:id,nom:"nathan",email:"nanthan@gmail.com"});
                            insert.save()
                                .then(()=>{
                                    Note.find()
                                        .then(note=>{
                                            console.log("données envoyées");
                                            
                                        })
                                })
                                .catch(e=>{
                                    res.status(500).send({mes:e.mes || "erreur"})
                                })
                        })

                const { dat } = JSON.parse(data.body);

    
                res.json({ dat });
            });
        });
    }