const express = require('express')
const app = express()
const path = require('path');

app.use(express.urlencoded());
app.use('/', express.static(__dirname + '/'));
app.set('view engine', 'pug')   

//rendering the form to host 
app.get('/new_Visitor', (req, res) =>{ res.sendFile('${_dirname} /index.html')})
app.get('/', function(req, res){
    res.render('newVisitor');
 });


// creating the table
 const createTable = async () => {
     try{
        const query = await pool.query(
           `CREATE TABLE IF NOT EXISTS
            VISITORS(
            ID  SERIAL PRIMARY KEY,
            visitor_name VARCHAR(60),
            visitors_age  INT,
            date_of_visit  DATE,
            time_of_visit  TIME,
            assistant_name VARCHAR(60),
            comments        VARCHAR(200)

           );`
       )
        console.log(query)
        console.log('table created successful')

     }catch(e) {
         console.log(e);

     };
};

 //post which sends to database
 app.post('/action', function(req, res){
     console.log(JSON.stringify(req.body));

     var visitor = req.body['visitor_name'];
     var assistant_name = req.body['assistant_name'];
     var visitors_age = req.body['visitor_age'];
     var date_of_visit =req.body['date_of_visit'];
     var comments =req.body['comments'];
 }
    

 app.listen(3000, () => console.log(` app listening on port ${3000}!`));

