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

describe('POST /cadastro', () => {
  it('should respond with status 200', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const response = await server.post('/cadastro').send({
      name,
      email,
      password,
    });
    const user = await userFactory.getUserbyemail(email);

    expect(response.status).toBe(201);
    expect(user).toEqual({
      createdAt: expect.any(Date),
      id: expect.any(Number),
      name,
      email,
      password: expect.any(String),
      updatedAt: expect.any(Date),
    });
  });
  it('should respond with status 409 when email already exists', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await server.post('/cadastro').send({
      name,
      email,
      password,
    });

    const response = await server.post('/cadastro').send({
      name,
      email,
      password,
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: 'Email already exists',
    });
  });
  it('should respond with status 400 when name, email and password are not provided', async () => {
    const response = await server.post('/cadastro').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "name" is required "email" is required "password" is required ',
    });
  });
  it('should respond with status 400 when name is not provided', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const response = await server.post('/cadastro').send({
      email,
      password,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "name" is required ',
    });
  });
  it('should respond with status 400 when email is not provided', async () => {
    const name = faker.person.fullName();
    const password = faker.internet.password();

    const response = await server.post('/cadastro').send({
      name,
      password,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "email" is required ',
    });
  });
  it('should respond with status 400 when password is not provided', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();

    const response = await server.post('/cadastro').send({
      name,
      email,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "password" is required ',
    });
  });
});

describe('POST /', () => {
  it('should respond with status 200', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await userFactory.createUser(name, email, password);

    const response = await server.post('/').send({
      email: email,
      password: password,
    });

    expect(response.status).toBe(200);
  });
  it('should respond with status 401 when email or password is invalid', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await userFactory.createUser(name, email, password);

    const response = await server.post('/').send({
      email: email,
      password: 'invalid-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid email or password',
    });
  });
  it('should respond with status 401 when email or password is invalid', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await userFactory.createUser(name, email, password);

    const response = await server.post('/').send({
      email: 'invalid@email.com',
      password: password,
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid email or password',
    });
  });
  it('should respond with status 401 when email or password is invalid', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await userFactory.createUser(name, email, password);

    const response = await server.post('/').send({
      email: 'invalid@email.com',
      password: 'invalid-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid email or password',
    });
  });
});
