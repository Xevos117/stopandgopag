var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'89.46.111.134',
    user:'Sql1371436',
    password:'453sm2f01i',
    database:'Sql1371436_2'
})

console.log("Sono qua"+connection.connect());

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
  res.send({ message: "Express collegato!" });
  connection.query('SELECT * from login',function(err,rows,fields){
      if(err) throw err;
      console.log('l email salvata è'+rows[0].solution)
  });
});