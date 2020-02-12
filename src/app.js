const express = require('express')
const app = express()




app.use(express.urlencoded());
app.use('/', express.static(__dirname + '/'));
app.set('view engine', 'pug')   




//rendering the form
app.get('/', (req, res) => res.sendFile('${_dirname} /index'))
app.get('/newVisitor', function(req, res){


    res.render('newVisitor');
 });

 // post which sends to database
 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
       res.render('show_message', {
          message: "Sorry, you provided worng info", type: "error"});
    } else {
       var newPerson = new Person({
          name: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         
       newPerson.save(function(err, Person){
          if(err)
             res.render('show_message', {message: "Database error", type: "error"});
          else
             res.render('show_message', {
                message: "New person added", type: "success", person: personInfo});
       });
    }
 });



app.listen(3000, () => console.log(` app listening on port ${3000}!`))

