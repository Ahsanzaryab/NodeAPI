const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencodeda
app.use(express.urlencoded({ extended: true }));

// simple route (endpoint)
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/addmovie.html");
  
});


// set port, listen for requests
//  removed "process.env.PORT ||"
const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const api = require('./modules/api');

app.get('/movies/', api.getAllMovies);
app.post('/addmovie/', api.addMovie)


