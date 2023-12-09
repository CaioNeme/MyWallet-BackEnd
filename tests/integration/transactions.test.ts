import supertest from 'supertest';
import { dbClean } from '../helpers';
import app, { init, close } from '../../src/app';
import { faker } from '@faker-js/faker';
import { userFactory } from '../factories/users.factory';

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await dbClean();
});

afterAll(async () => {
  await close();
});

describe('GET /home', () => {
  it('should respond with status 200', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const response = await server.get('/home').set('Authorization', `Bearer ${session.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name,
      email,
      Transactions: expect.any(Array),
    });
  });
  it('should respond with status 401 when token is invalid', async () => {
    const response = await server.get('/home').set('Authorization', 'Bearer invalid');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid token',
    });
  });
  it('should respond with status 401 when token is not provided', async () => {
    const response = await server.get('/home');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'No token provided',
    });
  });
});

describe('POST /nova-transacao/:type', () => {
  it('should respond with status 200', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: 'test',
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: 'test',
      });

    expect(responseDeposit.status).toBe(201);
    expect(responseWithdraw.status).toBe(201);
  });
  it('should respond with status 401 when token is invalid', async () => {
    const responseDeposit = await server.post('/nova-transacao/entrada').set('Authorization', 'Bearer invalid').send({
      value: 100,
      description: 'test',
    });
    const responseWithdraw = await server.post('/nova-transacao/saida').set('Authorization', 'Bearer invalid').send({
      value: 100,
      description: 'test',
    });

    expect(responseDeposit.status).toBe(401);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid token',
    });
    expect(responseWithdraw.status).toBe(401);
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid token',
    });
  });
  it('should respond with status 401 when token is not provided', async () => {
    const responseDeposit = await server.post('/nova-transacao/entrada').send({
      value: 100,
      description: 'test',
    });
    const responseWithdraw = await server.post('/nova-transacao/saida').send({
      value: 100,
      description: 'test',
    });

    expect(responseDeposit.status).toBe(401);
    expect(responseDeposit.body).toEqual({
      message: 'No token provided',
    });
    expect(responseWithdraw.status).toBe(401);
    expect(responseWithdraw.body).toEqual({
      message: 'No token provided',
    });
  });
  it('should respond with status 400 when value is not provided', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        description: 'test',
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        description: 'test',
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: "value" is required ',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: "value" is required ',
    });
  });
  it('should respond with status 400 when description is not provided', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: "description" is required ',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: "description" is required ',
    });
  });
  it('should respond with status 400 when value is not a number', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 'test',
        description: 'test',
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 'test',
        description: 'test',
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: "value" must be a number ',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: "value" must be a number ',
    });
  });
  it('should respond with status 400 when description is not a string', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: true,
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: true,
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: "description" must be a string ',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: "description" must be a string ',
    });
  });
  it('should respond with status 400 when value is less than zero', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: -100,
        description: 'test',
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: -100,
        description: 'test',
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: "value" must be greater than or equal to 1 ',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: "value" must be greater than or equal to 1 ',
    });
  });
  it('should respond with status 400 when value is zero', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 0,
        description: 'test',
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 0,
        description: 'test',
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: "value" must be greater than or equal to 1 ',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: "value" must be greater than or equal to 1 ',
    });
  });
  it('should respond with status 400 when description is empty', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/entrada')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: '',
      });
    const responseWithdraw = await server
      .post('/nova-transacao/saida')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: '',
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);

    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: "description" is not allowed to be empty ',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: "description" is not allowed to be empty ',
    });
  });
  it('should respond with status 400 when type is not a valid value', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await userFactory.createUser(name, email, password);
    const session = await userFactory.createSession(user.id);
    const responseDeposit = await server
      .post('/nova-transacao/test')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: 'test',
      });
    const responseWithdraw = await server
      .post('/nova-transacao/test')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        value: 100,
        description: 'test',
      });

    expect(responseDeposit.status).toBe(400);
    expect(responseWithdraw.status).toBe(400);
    expect(responseDeposit.body).toEqual({
      message: 'Invalid data: Type must be credit or debit',
    });
    expect(responseWithdraw.body).toEqual({
      message: 'Invalid data: Type must be credit or debit',
    });
  });
});
