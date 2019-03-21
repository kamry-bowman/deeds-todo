require('dotenv').config();
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../server');
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
    it('creates a todo', function() {
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
      return chai
        .request(httpServer)
        .post('/')
        .send({
          query: query,
          variables: {
            username: 'kamry',
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
  });
});
