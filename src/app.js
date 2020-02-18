const express = require('express')
const app = express()
const path = require('path');

app.use(express.urlencoded());
app.use('/', express.static(__dirname + '/'));
app.set('view engine', 'pug')  


const Pool  = require('pg').Pool;

const pool = new Pool({
    user: 'user' ,
    host:'localhost',
    database: 'db',
    password: 'pass',
    port: 8080,
})


//rendering the form to host 
app.get('/new_Visitor', (req, res) =>{ res.sendFile('${_dirname} /index.html')})
app.get('/', function(req, res){
    res.render('newVisitor');
 })



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

     }
}


const addNewVisitor = async (name, age, date, time, assistant, comment) => {
    try{
       const query = await pool.query(
          'INSERT INTO VISITORS(visitor_name,visitors_age,date_of_visit,time_of_visit,assistant_name,comments) VALUES ($1,$2,$3,$4,$5,$6)',
            [name,age,date,time,assistant,comment]       
      )
       console.log(query.rows)
       console.log('data saved')
       
    }catch(e) {
        console.log(e);

    };
};

// post which sends to database
 app.post('/action', function(req, res){
     console.log(JSON.stringify(req.body));

     var visitor = req.body['visitor_name'];
     var assistant_name = req.body['assistant_name'];
     var visitors_age = req.body['visitor_age'];
     var time_of_visit = req.body['time_of_visit'];
     var date_of_visit =req.body['date_of_visit'];
     var comments =req.body['comments'];
     addNewVisitor(visitor_name, assistant_name, visitors_age, date_of_visit, time_of_visit);
 });
    

 app.listen(3000, () => console.log(` app listening on port ${3000}!`));

