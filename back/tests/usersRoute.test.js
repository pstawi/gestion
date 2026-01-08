import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';


describe('userRoute => POST /login', () => {
    beforeAll(async () => {
        console.log('début test login')
    });


    it('should login with good credential', async () => {
        //arrange
        const credential = {
            email:'pierre.stawi@gmail.com',
            password: 'azerty'
        };

        //act
        const response = await request(app)
        .post('/api/login')
        .send(credential)

        // assert

        // console.log(response);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.token).toBeDefined();

    });

    it('should not login with bad credential', async () => {

        // arrange
        const badCredential = {
            email:'pierre.stawi@gmail.com',
            password: 'azerty1234'
        };

        // act

        const response = await request(app)
        .post('/api/login')
        .send(badCredential)

        // assert

        expect(response.status).toBe(401);


});



    afterAll(async () => {
        console.log('end test');
    });

});