require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    authCtrl =  require('./authController'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    app = express();

app.use(express.json())
app.use (session({
    resave: false, 
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60}
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('DB CONNECTED')
})
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/logout', authCtrl.logout)

const PORT = SERVER_PORT
app.listen(PORT, () => console.log(`server running baby on ${PORT}`));




