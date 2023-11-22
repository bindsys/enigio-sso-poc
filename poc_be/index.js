require("dotenv").config();
const config = require('./server/utils/config')
let express = require("express");
let session = require("cookie-session");
const cors = require('cors');
let {uptime, env} = process;
let {PORT, HOSTNAME, COOKIE_SESSION_SECRET, COOKIE_SESSION_NAME} = env;
const db = require('./db/models');
const sequelize = db.sequelize;
let {getUserInfo, postToken, getLogin, getLogout} = require("./cognito");
const jwt = require("jsonwebtoken");
const {raw} = require("express");

let app = express();
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: COOKIE_SESSION_SECRET,
        name: COOKIE_SESSION_NAME,
        cookie: {
            secure: false,
            httpOnly: true,
        },
    })
);

// sequelize
//     .authenticate()
//     .then(() => console.log('Database connected...'))
//     .catch(err => console.log('Error: ' + err));


app.post("/sso", async (req, res) => {
    console.log('begin login SSO');
    try {
        const {channel} = req.body;
        const url = await getLogin(channel);
        res.status(200).send({ok: true, uptime: uptime(), login: url});
    } catch (err) {
        console.log(err);
        res.status(400).send({ok: false, error: err.message});
    }
});

app.get("/oauth/cognito", async (req, res) => {
    try {
        let {code, channel} = req.query;
        const tokens = await postToken({code, channel});
        const userInfo = await getUserInfo({accessToken: tokens.access_token });
        const decodedAccessTkn = await jwt.decode(tokens.access_token, { complete: true });
        const decodedIdTkn = await jwt.decode(tokens.id_token, { complete: true });
        console.log('decoded access token data', decodedAccessTkn)
        console.log('decoded id token data', decodedAccessTkn)
        res.status(200).send({
            ok: true, data: {
                ...tokens,
                decoded: {
                    accessTokenData: {
                        ...decodedAccessTkn
                    },
                    idTokenData: {
                        ...decodedIdTkn
                    }
                },
                user: {
                    email: userInfo.email,
                    emailVerified: userInfo.email_verified,
                    id: userInfo.username,
                    logout: await getLogout(channel)
                }
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ok: false, error: err.message});
    }
});

app.get('/userInfo', async (req, res) => {
    console.log('begin load userInfo');
    const header = req.header('Authorization');
    if (!header) return res.status(401).send({ok: false, error: 'You don have permission to access this API'});
    const tokens = header.split(" ");
    if (!tokens || tokens.length < 2) return res.status(401).send({
        ok: false,
        error: 'You don have permission to access this API'
    });
    const token = tokens[1];

    try {
        const userInfo = await getUserInfo({accessToken: token});
        return res.status(200).send({
            ok: true, data: {
                user: {
                    email: userInfo.email,
                    emailVerified: userInfo.email_verified,
                    id: userInfo.username
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ok: false, error: err.message});
    }
});

app.get("/oauth/cognito/logout", async (req, res) => {
    const {channel} = req.query;
    getLogout(channel).catch(err => console.log(err));
    return res.status(200).send({oke: true, data: 1})
});

app.get('/params/nest', async (req, res) => {
    const {filter} = req.query;
    return res.status(200).send({ok: true, data: filter});
})


app.listen(Number(PORT), HOSTNAME, () => {
    console.log(`Running at [${HOSTNAME}]:${PORT}`);
});
