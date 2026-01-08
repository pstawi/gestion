import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config();

const connexion = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PWD,
    database:process.env.DATABASE
});

connexion.getConnection()
try {
    console.log("database OK");
} catch (error) {
    console.error("database KO", error);
}
export default connexion;