const {addNewVisitor,createTable} = require('./database')
const express = require('express')
const app = express()
const path = require('path');

app.use(express.urlencoded());
app.use('/', express.static(__dirname + '/'));
app.set('view engine', 'pug')  


//rendering the form to host 
app.get('/new_Visitor', (req, res) =>{ 
    res.sendFile('${_dirname} /index.html')})



// creating the table
 
createTable();

// post which sends to database
 app.post('/action', function(req, res){
     //console.log(JSON.stringify(req.body));
     const visitor = req.body.name;
     const assistant_name = req.body.assistant;
     const visitors_age = req.body.age;
     const time_of_visit = req.body.time;
     const date_of_visit =req.body.date;
     const comments =req.body.comment;
     console.log(visitor);
     addNewVisitor(visitor, visitors_age, date_of_visit, time_of_visit, assistant_name,comments);
     res.render('newVisitor')
     res.end();
 });
    


app.listen(3000, () => console.log(` app listening on port ${3000}!`));

