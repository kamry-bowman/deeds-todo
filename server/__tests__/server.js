require('dotenv').config();
process.env.NODE_ENV = 'test';

const proxyquire = require('proxyquire');

const chai = require('chai');
const chaiHttp = require('chai-http');

// stub out jwks-rsa and jsonwebtoken modules in middleware to avoid needing to
// obtain actual tokens from Amazon
const token = {
  token: `jim's token`,
  value: { username: 'jim', id: 'jim111' },
};

const jwtStub = {
  '@global': true,
  verify(authorization, getKey, config, callback) {
    if (authorization === token.token) {
      // Promise.resolve to force async event loop resolution
      return Promise.resolve().then(() => callback(null, token.value));
    } else {
      return Promise.resolve().then(() => callback('bad token'));
    }
  },
};

const { server } = proxyquire('../server', {
  jsonwebtoken: jwtStub,
});

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
  describe('authentication', function() {
    it('rejects bad tokens with 401', function() {
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
        .set('authorization', 'bad token')
        .send({
          query: query,
          variables: { username: 'kamry' },
        })
        .then(({ res }) => {
          expect(res.statusCode).to.equal(401);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('Not authorized');
        });
    });
  });
  describe('todos query', function() {
    const query = `
    query userTodos($username: String!) {
      todos(username: $username) {
        title
        description
        id
        completed
        date
        user {
          username
        }
      }
    }
  `;

    it('get returned for a user', function() {
      return chai
        .request(httpServer)
        .post('/')
        .set('authorization', token.token)
        .send({
          query: query,
          variables: { username: token.value.username },
        })
        .then(({ res }) => {
          expect(res.statusCode).to.equal(200);
          const data = JSON.parse(res.text).data;
          expect(data.todos).to.be.an('array');
          expect(data.todos[0].title).to.be.a('string');
        });
    });
    it('get rejected for wrong user', function() {
      return chai
        .request(httpServer)
        .post('/')
        .set('authorization', token.token)
        .send({
          query: query,
          variables: { username: 'andrew' },
        })
        .then(({ res }) => {
          expect(res.statusCode).to.equal(200);
          const data = JSON.parse(res.text);
          expect(data.data).to.equal(null);
          expect(data.errors[0].message).to.equal('Not Authorised!');
        });
    });
  });
  describe('createTodo mutation', function() {
    const query = `mutation CreateTodo(
        $title: String!
        $description: String
        $username: String!
      ) {
        createTodo(title: $title, description: $description, username: $username) {
          title
          description
          id
          completed
          user {
            username
          }
          date
        }
      }
    `;
    it('creates a todo', function() {
      return chai
        .request(httpServer)
        .post('/')
        .set('authorization', token.token)
        .send({
          query: query,
          variables: {
            username: token.value.username,
            description: 'Fast',
            title: 'Clean room',
          },
        })
        .then(({ res }) => {
          const data = JSON.parse(res.text).data;
          expect(data.createTodo).not.to.be.undefined;
          expect(data.createTodo.title).to.be.a('string');
        });
    });
    it('rejects for bad user', function() {
      return chai
        .request(httpServer)
        .post('/')
        .set('authorization', token.token)
        .send({
          query: query,
          variables: {
            username: token.value.username + 'bad',
            description: 'Fast',
            title: 'Clean room',
          },
        })
        .then(({ res }) => {
          expect(res.statusCode).to.equal(200);
          const data = JSON.parse(res.text);
          expect(data.data.createTodo).to.equal(null);
          expect(data.errors[0].message).to.equal('Not Authorised!');
        });
    });
  });
  describe('update Todo mutation', function() {
    const query = `mutation EditTodo(
      $title: String
      $description: String
      $completed: Boolean
      $id: ID!
      $date: DateTime
    ) {
      updateTodo(
        title: $title
        description: $description
        completed: $completed
        id: $id
        date: $date
      ) {
        title
        description
        id
        completed
        user {
          username
        }
        date
      }
    }
  `;
    it('rejects for bad user', function() {
      return chai
        .request(httpServer)
        .post('/')
        .set('authorization', token.token)
        .send({
          query: query,
          variables: {
            username: token.value.username + 'bad',
            description: 'Slow',
            title: 'Churn Butter',
            id: '2a268772-9ab3-471e-97c6-a1ffbad38ca6',
          },
        })
        .then(({ res }) => {
          expect(res.statusCode).to.equal(200);
          const data = JSON.parse(res.text);
          console.log(data);
          expect(data.data.updateTodo).to.equal(null);
          expect(data.errors[0].message).to.equal('Not Authorised!');
        });
    });
  });
});
