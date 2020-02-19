const Pool  = require('pg').Pool;

const pool = new Pool({
    user: 'user' ,
    host:'localhost',
    database: 'db',
    password: 'pass',
    port: 5432
})

pool.connect( (err, res)=>{
    if (err ) console.log(err)
    console.log(res)
})

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
       console.log(query.rows)
       console.log('table created successful')

    }catch(e) {
        
        console.log(e);

    }
}

const addNewVisitor = async (name, age, date, time, assistant, comment) => {
    try{
       const query = await pool.query(
          'INSERT INTO VISITORS(visitor_name,visitors_age,date_of_visit,time_of_visit,assistant_name,comments) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [name,age,date,time,assistant,comment]       
      )
       console.log(query.rows)
       console.log('data saved')
       
    }catch(e) {
        console.log(e);

    };
};

createTable();
module.exports = {addNewVisitor, createTable};