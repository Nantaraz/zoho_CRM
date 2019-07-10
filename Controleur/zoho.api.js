// const express = require('express');
// const app = express.Router()

const zoho = require('@trifoia/zcrmsdk');

const contr = require('./zoho.crm');

module.exports.GetList = (req, res, next) => {
    zoho.initialize(contr).then((client) => {
        client.API.MODULES.get({
            module: 'Contacts',
            params: {
                page: 0,
                per_page: 25,
            },
        }).then((response) => {
            res.json(JSON.parse(response.body));
        }).catch(next);
    }).catch(next);
}