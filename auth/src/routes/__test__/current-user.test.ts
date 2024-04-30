import request from 'supertest';
import { app } from '../../services/app';
import  Cookie  from 'cookie'

// it('response with details about current user', async () => {
//     const authResponse = await request(app)
//     .post('/api/users/signup')
//     .send({
//     email: 'test@tes.com',
//     password: 'password'
//     })
//     .expect(201);
//     const cookie = authResponse.get('Set-Cookie');

//     const response = await request(app)
//         .get('/api/users/currentuser')
//         .set('Cookie', cookie)
//         .send()
//         .expect(200)
    
//     console.log(response.body)
// }) 

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)
    console.log(response.body.currentuser);
})