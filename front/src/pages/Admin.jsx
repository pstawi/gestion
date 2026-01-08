import { useEffect, useState } from "react";
import {fetchAllUsers} from "../services/userService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Admin = () => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [users, setUsers] = useState([]);


    const fetchUsers = async () => {
        try {

            const response = await fetchAllUsers(token);
            console.log(response);
            setUsers(response);
            
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Prénom</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Email</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {users.map((user) => (
            <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {user.id}
                </TableCell>
                <TableCell align="right">{user.prenom}</TableCell>
                <TableCell align="right">{user.nom}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

    


    );
}
 
export default Admin;