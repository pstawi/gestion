import axios from "axios";

const API = "http://localhost:3000/api";

export const registerUser = async (nom, prenom, email, password) => {
    try {
        const response = await axios.post(API+"/addUser", {
            nom,
            prenom,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    }
};  

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API+"/login", {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
    }
};

export const fetchAllUsers = async (token) => {

    try {
        const response = await axios.get(API+"/allUsers", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
};