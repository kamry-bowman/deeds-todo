require('dotenv').config();
process.env.NODE_ENV = 'test';

const proxyquire = require('proxyquire');

const chai = require('chai');
const chaiHttp = require('chai-http');

// stub out jwks-rsa module in middleware to avoid needing to
// obtain actual tokens from Amazon
function jwksRsaStub({ cache, jwksUri }) {
  if (cache && jwksUri) {
    return {
      getSigningKey: (kid, cb) => {
        console.log(kid);
        cb(null, 'test-secret');
      },
    };
  }
  throw new Error('bad config passed to jwk-rsa');
}

jwksRsaStub['@global'] = true;

const { server } = proxyquire('../server', { 'jwks-rsa': jwksRsaStub });

chai.use(chaiHttp);

const expect = chai.expect;

let httpServer;

describe('test server', function() {
  before(function() {
    return server.start().then(result => {
      httpServer = result;
    });
  });
  after(function() {
    return httpServer.close();
  });
  describe('todos', function() {
    it('get returned for a user', function() {
      const query = `
      query userTodos($username: String!) {
        todos(username: $username) {
          title
          description
          id
          completed
          date
        }
      }
    `;
      return chai
        .request(httpServer)
        .post('/')
        .set('authorization', 'jwt token')
        .send({
          query: query,
          variables: { username: 'kamry' },
        })
        .then(({ res }) => {
          const data = JSON.parse(res.text).data;
          expect(data.todos).to.be.an('array');
          expect(data.todos[0].title).to.be.a('string');
        });
    });
    // it('creates a todo', function() {
    //   const query = `mutation CreateTodo(
    //     $title: String!
    //     $description: String
    //     $username: String!
    //   ) {
    //     createTodo(title: $title, description: $description, username: $username) {
    //       title
    //       description
    //       id
    //       completed
    //       user {
    //         username
    //       }
    //       date
    //     }
    //   }
    // `;
    //   return chai
    //     .request(httpServer)
    //     .post('/')
    //     .send({
    //       query: query,
    //       variables: {
    //         username: 'kamry',
    //         description: 'Fast',
    //         title: 'Clean room',
    //       },
    //     })
    //     .then(({ res }) => {
    //       const data = JSON.parse(res.text).data;
    //       expect(data.createTodo).not.to.be.undefined;
    //       expect(data.createTodo.title).to.be.a('string');
    //     });
    // });
  });
});
