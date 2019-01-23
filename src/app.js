const fs  = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const { accounts, users, writeJSON } =  require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.port || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res)=>{
    res.render('index', {title: 'Account Summary', accounts });
})


app.get('/profile', (req, res)=>{
    res.render('profile', {user: users[0]})
})

app.listen(port, ()=>{
    console.log(chalk.yellow(`App started on port ${port}`));
})