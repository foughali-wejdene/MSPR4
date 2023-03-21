const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = 'https://8ahsruk0tw.api.quickmocker.com';

describe('Revendeurs API', function() {
  it('should retrieve all products with a 200 or 201 status code', function(done) {
    request(app)
      .get('/Revendeurs')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('array');
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  
  it('should retrieve a single product with a 200 or 201 status code', function(done) {
    request(app)
      .get('/Revendeurs/1')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(1);
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  
  it('should create a new product with a 201 status code', function(done) {
    request(app)
      .post('/Revendeurs')
      .send({ name: 'New Product', price: 10.99 })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('New Product');
        expect(res.body.price).to.equal(10.99);
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  
  it('should update an existing product with a 200 or 201 status code', function(done) {
    request(app)
      .put('/Revendeurs/1')
      .send({ name: 'Updated Product', price: 19.99 })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(1);
        expect(res.body.name).to.equal('Updated Product');
        expect(res.body.price).to.equal(19.99);
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  
  it('should delete an existing product with a 200 or 204 status code', function(done) {
    request(app)
      .delete('/Revendeurs/1')
      .expect(function(res) {
        expect(res.statusCode).to.be.oneOf([200, 204]);
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
