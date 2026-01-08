import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../services/userService";



const Register = () => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser(nom, prenom, email, password);
            console.log("Utilisateur inscrit avec succès !");
            
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
        }
    };



    return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Inscription
        </Typography>
        <form onSubmit={handSubmit}>
          <TextField
            fullWidth
            label="Prénom"
            name="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Nom"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            margin="normal"
            required
          />
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
            S'inscrire
          </Button>
        </form>
      </Box>
    </Container>
  );
}
 
export default Register;