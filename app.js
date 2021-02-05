const express = require('express');
const {google} = require('googleapis');
const keys = require('./keys.json');
const ejs = require('ejs');
const path = require('path');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const SECRET = 'IZCC2021nowinterjizz';

require('events').EventEmitter.defaultMaxListeners = 0;
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static(path.join(__dirname, 'images')));
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
    const opthint = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'hint!D2:D99'
    };
    const opthintid = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'hint!A2:A99'
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
    const optteam4 = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!F2:F99'
    };
    const optteam5 = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!G2:G99'
    };
    const optteama = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'team!H2:H99'
    };
    const optname = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'SECRET!A1:G1'
    };
    const optusername = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'SECRET!A2:G2'
    };
    const optpassword = {
        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
        range: 'SECRET!A3:G3'
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
            let tname = await gsapi.spreadsheets.values.get(optname);
            let clueArray = clue.data.values;
            let ansArray = answer.data.values;
            let tuserArray = [];
            let tnameArray = [];
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                tuserArray[i] = tusername.data.values[0][i];
                tnameArray[i] = tname.data.values[0][i];
            }
            for (let i = 0; i < tuserArray.length; i++) {
                if (tokenusername === tuserArray[i]) {
                    switch (i) {
                        case 0:
                            let cluetf0 = await gsapi.spreadsheets.values.get(optteam0);
                            res.render('index', {
                                clue: clueArray,
                                answer: ansArray,
                                cluetf: cluetf0.data.values,
                                tname: tnameArray[i]
                            });
                            break;
                        case 1:
                            let cluetf1 = await gsapi.spreadsheets.values.get(optteam1);
                            res.render('index', {
                                clue: clueArray,
                                answer: ansArray,
                                cluetf: cluetf1.data.values,
                                tname: tnameArray[i]
                            });
                            break;
                        case 2:
                            let cluetf2 = await gsapi.spreadsheets.values.get(optteam2);
                            res.render('index', {
                                clue: clueArray,
                                answer: ansArray,
                                cluetf: cluetf2.data.values,
                                tname: tnameArray[i]
                            });
                            break;
                        case 3:
                            let cluetf3 = await gsapi.spreadsheets.values.get(optteam3);
                            res.render('index', {
                                clue: clueArray,
                                answer: ansArray,
                                cluetf: cluetf3.data.values,
                                tname: tnameArray[i]
                            });
                            break;
                        case 4:
                            let cluetf4 = await gsapi.spreadsheets.values.get(optteam4);
                            res.render('index', {
                                clue: clueArray,
                                answer: ansArray,
                                cluetf: cluetf4.data.values,
                                tname: tnameArray[i]
                            });
                            break;
                        case 5:
                            let cluetf5 = await gsapi.spreadsheets.values.get(optteam5);
                            res.render('index', {
                                clue: clueArray,
                                answer: ansArray,
                                cluetf: cluetf5.data.values,
                                tname: tnameArray[i]
                            });
                            break;
                        case 6:
                            let cluetfa = await gsapi.spreadsheets.values.get(optteama);
                            res.render('index', {
                                clue: clueArray,
                                answer: ansArray,
                                cluetf: cluetfa.data.values,
                                tname: tnameArray[i]
                            });
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
                    res.cookie("token", token)
                    res.redirect('/story');
                    console.log(iusername + "已登入");
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

    app.post('/logout', async function (req, res) {
        await res.clearCookie('token');
        await res.redirect('/');
    });

    app.post('/foundclue', async function (req, res) {
        let cluei = parseInt(req.body.i);
        let clue = await gsapi.spreadsheets.values.get(optclue);
        let clueArray = clue.data.values;
        let cookietoken = req.cookies.token;
        if (cookietoken) {
            jwt.verify(cookietoken, SECRET, function (err) {
                if (err) {
                    console.log("token錯誤");
                    res.clearCookie('token');
                    res.redirect('/');
                    //token過期判斷
                }
            });
            var detoken = jwt.verify(cookietoken, SECRET);
            tokenusername = detoken.username;
            console.log(tokenusername + "找到了線索「" + clueArray[cluei] + "」");
            let tusername = await gsapi.spreadsheets.values.get(optusername);
            let tusernameArray = [];
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                tusernameArray[i] = tusername.data.values[0][i];
            }
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                if (tokenusername === tusernameArray[i]) {
                    switch (i) {
                        case 0:
                            let cluetf0 = await gsapi.spreadsheets.values.get(optteam0);
                            verifytf(cluei, i, cluetf0.data.values, req, res);
                            break;
                        case 1:
                            let cluetf1 = await gsapi.spreadsheets.values.get(optteam1);
                            verifytf(cluei, i, cluetf1.data.values, req, res);
                            break;
                        case 2:
                            let cluetf2 = await gsapi.spreadsheets.values.get(optteam2);
                            verifytf(cluei, i, cluetf2.data.values, req, res);
                            break;
                        case 3:
                            let cluetf3 = await gsapi.spreadsheets.values.get(optteam3);
                            verifytf(cluei, i, cluetf3.data.values, req, res);
                            break;
                        case 4:
                            let cluetf4 = await gsapi.spreadsheets.values.get(optteam4);
                            verifytf(cluei, i, cluetf4.data.values, req, res);
                            break;
                        case 5:
                            let cluetf5 = await gsapi.spreadsheets.values.get(optteam5);
                            verifytf(cluei, i, cluetf5.data.values, req, res);
                            break;
                        case 6:
                            let cluetfa = await gsapi.spreadsheets.values.get(optteama);
                            verifytf(cluei, i, cluetfa.data.values, req, res);
                            break;
                    }
                }
            }
        }
        res.send("")
    });


    async function verifytf(cluei, teamc, ctf, req, res) {
        let tname = await gsapi.spreadsheets.values.get(optname);
        let tnameArray = [];
        for (let i = 0; i < tname.data.values[0].length; i++) {
            tnameArray.push(tname.data.values[0][i]);
        }
        if (ctf[cluei][0] === "true") {
            res.send();
        } else {
            ctf[cluei][0] = "true";
            switch (teamc) {
                case 0:
                    const cluetf0 = {
                        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
                        range: 'team!B2',
                        valueInputOption: 'USER_ENTERED',
                        resource: {"values": ctf}
                    }
                    await gsapi.spreadsheets.values.update(cluetf0);
                    break;
                case 1:
                    const cluetf1 = {
                        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
                        range: 'team!C2',
                        valueInputOption: 'USER_ENTERED',
                        resource: {"values": ctf}
                    }
                    await gsapi.spreadsheets.values.update(cluetf1);
                    break;
                case 2:
                    const cluetf2 = {
                        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
                        range: 'team!D2',
                        valueInputOption: 'USER_ENTERED',
                        resource: {"values": ctf}
                    }
                    await gsapi.spreadsheets.values.update(cluetf2);
                    break;
                case 3:
                    const cluetf3 = {
                        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
                        range: 'team!E2',
                        valueInputOption: 'USER_ENTERED',
                        resource: {"values": ctf}
                    }
                    await gsapi.spreadsheets.values.update(cluetf3);
                    break;
                case 4:
                    const cluetf4 = {
                        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
                        range: 'team!F2',
                        valueInputOption: 'USER_ENTERED',
                        resource: {"values": ctf}
                    }
                    await gsapi.spreadsheets.values.update(cluetf4);
                    break;
                case 5:
                    const cluetf5 = {
                        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
                        range: 'team!G2',
                        valueInputOption: 'USER_ENTERED',
                        resource: {"values": ctf}
                    }
                    await gsapi.spreadsheets.values.update(cluetf5);
                    break;
                case 6:
                    const cluetfa = {
                        spreadsheetId: '1R_vFc0ZIhAHydCOBoXIpBDDS1XZbBCevfyJHB6cUw5E',
                        range: 'team!H2',
                        valueInputOption: 'USER_ENTERED',
                        resource: {"values": ctf}
                    }
                    await gsapi.spreadsheets.values.update(cluetfa);
                    break;
            }
        }
    }

    app.get('/story', async function (req, res) {
        res.render('story');
    });


    app.post('/start', async function (req, res) {
        res.redirect('/');
    });

    app.get('/sus', async function (req, res) {
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
            let tusername = await gsapi.spreadsheets.values.get(optusername);
            let tname = await gsapi.spreadsheets.values.get(optname);
            let tuserArray = [];
            let tnameArray = [];
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                tuserArray[i] = tusername.data.values[0][i];
                tnameArray[i] = tname.data.values[0][i];
            }
            for (let i = 0; i < tuserArray.length; i++) {
                if (tokenusername === tuserArray[i]) {
                    res.render('sus', {
                        tname: tnameArray[i]
                    });
                }
            }
        } else {
            res.render('login');
        }
    });

    app.get('/map', async function (req, res) {
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
            let tusername = await gsapi.spreadsheets.values.get(optusername);
            let tname = await gsapi.spreadsheets.values.get(optname);
            let hintid = await gsapi.spreadsheets.values.get(opthintid);
            let hint = await gsapi.spreadsheets.values.get(opthint);
            let hintidArray = hintid.data.values;
            let hintArray = hint.data.values;
            let tuserArray = [];
            let tnameArray = [];
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                tuserArray[i] = tusername.data.values[0][i];
                tnameArray[i] = tname.data.values[0][i];
            }
            for (let i = 0; i < tuserArray.length; i++) {
                if (tokenusername === tuserArray[i]) {
                    res.render('map', {
                        tname: tnameArray[i],
                        hintid: hintidArray,
                        hint: hintArray
                    });
                }
            }
        } else {
            res.render('login');
        }
    });

};

app.listen(5555, () => console.log('Server up and running'));