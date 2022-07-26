var supertest = require("supertest");
var chai = require("chai");
const Pool = require('pg-pool')

const pool = new Pool({
  user: 'ahsan',
  host: 'localhost',
  database: 'movies',
  password: '0320',
  port: 5432
})

let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api ()
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      // res.body.error.should.equal(false);
      res.body.should.not.have.property('error')
      done();
    });
  });

});


describe('Get/Post Movies', () => {
  
  it('it should POST a movie ', async () => {
    let book = {
        name: "The Lord of the Rings",
        rating: '10.0'
        
    }
  server
      .post('/addmovie')
      .send(book)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.book.should.have.property('name');
            res.body.book.should.have.property('rating');
        
      })
   })

   it('it should GET all the movies', (done) => {
    let num;
    pool.query('SELECT COUNT(*) FROM movies_list', (error, results) => 
    {
    num =parseInt(results.rows[0]["count"]);
    });
    
    server
        .get('/movies')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(num);
          done();
        })
  });
});