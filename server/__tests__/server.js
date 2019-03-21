process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../server');
chai.use(chaiHttp);

const expect = chai.expect;

let httpServer;

describe('smoke test', function() {
  before(function() {
    return server.start().then(result => {
      httpServer = result;
    });
  });
  after(function() {
    return httpServer.close();
  });
  it('checks equality', function() {
    return chai
      .request(httpServer)
      .get('/')
      .then(res => {
        // console.log(res);
        expect(res).not.to.be.undefined;
      });
  });
});
