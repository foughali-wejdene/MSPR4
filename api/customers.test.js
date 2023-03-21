const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
//const app = require('/Users/wejdene/Desktop/MSPR4-1/mobile'); // l'application express

describe('Integration Test: Customers API', function() {
  it('GET /customers should return a list of customers', function(done) {
    //request(app)
      get('/customers')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('email');
        done();
      });
  });

});
