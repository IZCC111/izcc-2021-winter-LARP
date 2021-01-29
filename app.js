const express = require('express');
const {google} = require('googleapis');
const keys = require('./keys.json');
const ejs = require('ejs');
const path = require('path');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const SECRET = 'IZCC2021winterjizz';

require('events').EventEmitter.defaultMaxListeners = 0;
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err, token) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected');
        gsrun(client);
    }
});

async function gsrun(cl) {
    const gsapi = google.sheets({version: 'v4', auth: cl});

    const optclue = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'data!A2:A99'
    };
    const optans = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'data!B2:B99'
    };
    const optteam0 = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!B1:B99'
    };
    const optteam1 = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!C2:C99'
    };
    const optteam2 = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!D2:D99'
    };
    const optteam3 = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!E2:E99'
    };
    const optteama = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!F2:F99'
    };
    const optusername = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'SECRET!A2:E2'
    };
    const optpassword = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'SECRET!A3:E3'
    };


    app.get('/', async function (req, res) {
        let cookietoken = req.cookies.token;
        if (cookietoken) {
            jwt.verify(cookietoken, SECRET, function (err) {
                if (err) {
                    console.log("token錯誤");
                    res.clearCookie('token');
                    res.render('login');
                    //token過期判斷
                }
            });
            var detoken = jwt.verify(cookietoken, SECRET);
            tokenusername = detoken.username;
            let clue = await gsapi.spreadsheets.values.get(optclue);
            let answer = await gsapi.spreadsheets.values.get(optans);
            let tusername = await gsapi.spreadsheets.values.get(optusername);
            let clueArray = clue.data.values;
            let ansArray = answer.data.values;
            let tuserArray = [];
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                tuserArray[i] = tusername.data.values[0][i];
            }
            for (let i = 0; i < tuserArray.length; i++) {
                if (tokenusername === tuserArray[i]) {
                    switch (i) {
                        case 0:
                            let cluetf0 = await gsapi.spreadsheets.values.get(optteam0);
                            res.render('index', {clue: clueArray, answer: ansArray, cluetf: cluetf0.data.values});
                            break;
                        case 1:
                            let cluetf1 = await gsapi.spreadsheets.values.get(optteam1);
                            res.render('index', {clue: clueArray, answer: ansArray, cluetf: cluetf1.data.values});
                            break;
                        case 2:
                            let cluetf2 = await gsapi.spreadsheets.values.get(optteam2);
                            res.render('index', {clue: clueArray, answer: ansArray, cluetf: cluetf2.data.values});
                            break;
                        case 3:
                            let cluetf3 = await gsapi.spreadsheets.values.get(optteam3);
                            res.render('index', {clue: clueArray, answer: ansArray, cluetf: cluetf3.data.values});
                            break;
                        case 4:
                            let cluetfa = await gsapi.spreadsheets.values.get(optteama);
                            res.render('index', {clue: clueArray, answer: ansArray, cluetf: cluetfa.data.values});
                            break;
                    }
                }
            }
        } else {
            res.render('login');
        }
    });


    app.post('/login', async function (req, res) {
        var iusername = req.body.username;
        var ipassword = req.body.password;
        let username = await gsapi.spreadsheets.values.get(optusername);
        let password = await gsapi.spreadsheets.values.get(optpassword);
        let usernameArray = [];
        let passwordArray = [];
        for (let i = 0; i < username.data.values[0].length; i++) {
            usernameArray[i] = username.data.values[0][i];
            passwordArray[i] = password.data.values[0][i];
        }
        let test = 0;
        for (let i = 0; i < username.data.values[0].length; i++) {
            if (iusername === usernameArray[i]) {
                if (ipassword === passwordArray[i]) {
                    var token = jwt.sign({username: iusername}, SECRET, {expiresIn: '3h'});
                    console.log(token)
                    res.cookie("token", token).redirect(req.get('referer'));
                } else {
                    test++;
                    if (test === username.data.values[0].length) {
                        res.render('invalidLogin');
                    }
                }
            } else {
                test++;
                if (test === username.data.values[0].length) {
                    res.render('invalidLogin');
                }
            }
        }
    });
};

app.listen(30, () => console.log('Server up and running'));