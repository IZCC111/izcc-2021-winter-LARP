const express = require('express');
const { google } = require('googleapis');
const keys = require('./keys.json');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err, token) {
    if(err){
        console.log(err);
        return;
    } else{
        console.log('Connected');
        gsrun(client);
    }
});

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth: cl});

    const optclue = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'data!A2:A99'
    };
    const optans = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'data!B2:B99'
    };



    app.get('/', async function(req, res){
        let clue = await gsapi.spreadsheets.values.get(optclue);
        let answer = await gsapi.spreadsheets.values.get(optans);
        let clueArray = clue.data.values;
        let ansArray = answer.data.values;
        res.render('index',{clue: clueArray,answer: ansArray});
    });
};

app.listen(30, () => console.log('Server up and running'));