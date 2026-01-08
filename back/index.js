import express from 'express'
import cors from 'cors'
import connexion from './config/db.js'
import dotenv from 'dotenv'
import userRoute from './routes/usersRoute.js'

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api', userRoute);

app.listen(process.env.PORT, () => {
    console.log("server OK sur le port", process.env.PORT);
})