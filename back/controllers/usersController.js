import * as usersModel from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import dotenv from 'dotenv/config';
import dotenv from 'dotenv';
// utilisation de dotenv
dotenv.config();

export const allUsers = async (req, res) => {
    try {
        const users = await usersModel.allUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addUser = async (req, res) => {

    const { nom, prenom, email, password } = req.body;

    console.log(nom, prenom,email, password);

    try {

        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);
        const addedUser = await usersModel.addUser(nom, prenom, email, hashPassword);
        res.status(201).json({message : "utilisateur créé", addedUser});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteUser = async (req,res) => {
    const id = req.params.id;

    try {
        const deletedUser = await usersModel.deleteUser(id);
        res.status(200).json({message : "utilisateur supprimé", deletedUser});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {

    const id = req.params.id;
    const { nom, prenom, email, role, password } = req.body;

    try {

        const hashPassword = bcrypt.hashSync(password, 10);
        const updatedUser = await usersModel.updateUser(id, nom, prenom, email, role, hashPassword);
        res.status(200).json({message : "utilisateur mis à jour", updatedUser});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await usersModel.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    console.log(email, password);

    try {

        // Récupérer l'utilisateur par email
        const user = await usersModel.loginUser(email);

        // Vérifier si l'utilisateur existe
        console.log(user[0].password);

        // Comparer les mots de passe
        const checkPassword = bcrypt.compareSync(password, user[0].password);

        // Répondre en fonction du résultat de la comparaison
        if (checkPassword === true) {

            // Générer un token JWT
            const token = jwt.sign({id: user[0].id, role: user[0].role}, process.env.SECRET, {expiresIn: '1h'});

            // Authentification réussie
            return res.status(200).json({ message: "Login successful", token });
        } else {
            // Authentification échouée
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};