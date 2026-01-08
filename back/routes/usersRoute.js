import * as userController from '../controllers/usersController.js';
import express from 'express';
import checkToken from '../middlewares/checkToken.js'

const router = express.Router();

router.get('/allUsers',checkToken, userController.allUsers);
router.post('/addUser', userController.addUser);
router.delete('/deleteUser/:id', checkToken, userController.deleteUser);
router.put('/updateUser/:id', checkToken, userController.updateUser);
router.get('/getUserById/:id', checkToken, userController.getUserById);
router.post('/login', userController.loginUser);

export default router;