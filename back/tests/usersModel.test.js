import { getUserById, loginUser, addUser, deleteUser } from "../models/usersModel";
import connexion from '../config/db.js';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

// description du test ( groupe de test )
describe('Test userModel => getUserbyId', () =>{


beforeAll(async () => {
    try {
        await connexion.getConnection();
        console.log('bdd test')
    } catch (error) {
        console.error('error', error)
    }
});

it('should return user info', async () => {
    //arrange
    const userId = 2;

    //act
    const result = await getUserById(userId);
    console.log(result);

    //assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('nom');
    expect(result[0]).toHaveProperty('prenom');
    expect(result[0]).toHaveProperty('email');
    expect(result[0]).toHaveProperty('role');
    console.log(result);
});

it('should return empty array for non-existing user', async () => {
    //arrange
    const userId = 0;

    //act
    const result = await getUserById(userId);
    console.log(result);

    //assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
});

// afterAll(async () => {
//     try {
//         await connexion.end();
//         console.log('fermeture bdd test')
//     } catch (error) {
//         console.error('error', error)
//     }


// });
});

describe('Test userModel => loginUser', () =>{
beforeAll(async () => {
    try {
        await connexion.getConnection();
        console.log('bdd test')
    } catch (error) {
        console.error('error', error)
    }
});

it('should return user login info', async () => {
    //arrange
    const email = 'test@example.com';

    //act
    const result = await loginUser(email);
    console.log(result);

    //assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);

});

// afterAll(async () => {
//     try {
//         await connexion.end();
//         console.log('fermeture bdd test')
//     } catch (error) {
//         console.error('error', error)
//     }
// });
});

// describe('Test userModel => addUser', () =>{
// beforeAll(async () => {
//     try {
//         await connexion.getConnection();
//         console.log('bdd test')
//     } catch (error) {
//         console.error('error', error)
//     }
// });

// it('should add a new user', async () => {
//     //arrange
//     const nom = 'Doe';
//     const prenom = 'John';
//     const email = 'john.doe@example.com';
//     const password = 'securepassword';

//     //act
//     const result = await addUser(nom, prenom, email, password);
//     console.log(result);

//     //assert
//     expect(result).toBeDefined();
//     expect(result).toHaveProperty('insertId');
// });

// afterAll(async () => {
//     try {
//         await connexion.end();
//         console.log('fermeture bdd test')
//     } catch (error) {
//         console.error('error', error)
//     }
// });
// });