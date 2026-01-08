import connexion from '../config/db.js';

export const allUsers = async () => {
    const select = 'SELECT id, nom, prenom, email, role FROM users';
    const [results] = await connexion.query(select);
    return results;
};

export const addUser = async (nom, prenom, email, password) => {
    const insert = 'INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    const [result] = await connexion.query(insert, [nom, prenom, email, password]);
    return result;
};

export const deleteUser = async (id) => {
    const deleteU = 'DELETE FROM users WHERE id = ?';
    const [result] = await connexion.query(deleteU, [id]);
    return result;
};

export const updateUser = async (id, nom, prenom, email, role, password) => {
    const update = 'UPDATE users SET nom = ?, prenom = ?, email = ?, role = ?, password = ? WHERE id = ?';
    const [result] = await connexion.query(update, [nom, prenom, email, role, password, id]);
    return result;
};

export const getUserById = async (id) => {
    const select = 'SELECT id, nom, prenom, email, role FROM users WHERE id = ?';
    const [results] = await connexion.query(select, [id]);
    return results;
};

export const loginUser = async (email) => {
    const select = 'SELECT email, password, role, id FROM users WHERE email = ?';
    const [results] = await connexion.query(select, [email]);
    return results;
};