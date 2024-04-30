import request from 'supertest';
import { app } from '../../services/app';
import { response } from 'express';

it('fails when a email that does not exist supplied', async () => {
    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@tes.com',
        password: 'password'
    })
    .expect(400)
});

it('fails when a incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
        email: 'test@tes.com',
        password: 'password'
        })
        .expect(201)
    
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@tes.com',
            password: 'passwo'  
        })
        .expect(400)
});

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
    email: 'test@tes.com',
    password: 'password'
    })
    .expect(201)

const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@tes.com',
        password: 'password'  
    })
    .expect(200)

expect(response.get('Set-Cookie')).toBeDefined();
})

