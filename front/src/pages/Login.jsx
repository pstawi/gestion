import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { loginUser } from "../services/userService";
import {jwtDecode}  from "jwt-decode";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            console.log("Utilisateur connecté avec succès :", response.token);

            localStorage.setItem("token", response.token);

            const tokenDecoded = jwtDecode(response.token);
            console.log("Token décodé :", tokenDecoded);

            localStorage.setItem("role", tokenDecoded.role);

        } catch (error) {
            console.error("Erreur loginPage handleSubmit", error);
        }
    };

    return ( 
        <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Mot de passe"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.5 }}
          >
            Se connecter
          </Button>
        </form>
      </Box>
    </Container>
     );
}
 
export default Login;