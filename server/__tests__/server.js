const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../server');
chai.use(chaiHttp);

const expect = chai.expect;

server.start();

describe('smoke test', function() {
  it('checks equality', function(done) {
    return chai
      .request(server)
      .get('/')
      .then(res => {
        console.log(res);
        expect(res).not.to.be.undefined;
        return done();
      });
  });
});
