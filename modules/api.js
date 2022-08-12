
 
  // DB connection 
  // log in as a specific user and database Command : psql -d db -U user
  const Pool = require('pg').Pool;

  const pool = new Pool({
    user: 'ahsan',
    host: 'localhost',
    database: 'movies',
    password: '0320',
    port: 5432
  });
  



  const getAllMovies = async (req, res) => {
    pool.query('SELECT * FROM movies_list ORDER BY id ASC', (error, results) => {
      res.status(200).json(results.rows);
    });
  };



  const addMovie = async (req, res) => {
    const { name, rating } = req.body;
    const movie = req.body;
    console.log(movie);
    pool.query('INSERT INTO movies_list (name, rating) VALUES ($1, $2)', [name, rating], (error, results) => {
      // res.status(201).send(`movie added successfully.`);
    });
  };

  module.exports = {
    getAllMovies,
    addMovie,
    };

  

