import request from 'supertest';
import { app } from '../../services/app';
import { response } from 'express';

it('returns a 201 on succesful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@tesing.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an empty input', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: '',
            password: ''
        })
        .expect(400);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tesing@test',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testing@test.com',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('disallows duplicate email',async () => {
   await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test123@testin123.com',
                password: 'password'
            })
            .expect(201)
    
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test123@testin123.com',
                password: 'password'
            })
            .expect(400)
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@tesing.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});