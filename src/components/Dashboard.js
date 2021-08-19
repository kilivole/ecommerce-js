import React, { useState } from 'react'
import { Paper, Button, Card, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import useStyles from './Products/styles';



export default function Dashboard() {
    const classes = useStyles();

     const [error, setError] = useState("");
    const { currentUser} = useAuth();
    const { logout } = useAuth();
    const history = useHistory();

//   const handleLogout = async () =>  {
//         setError('')
//         try {
//             await logout()
//             history.pushState('/login')
//         } catch {
//             setError('Failed to log out')
//         }
//     }
    
    return (
        <><main className={classes.content}>
        <div className={classes.toolbar}/>
            <Card>
                <Typography variant="h5">Profile</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Button component={Link} to="/update-profile" variant="outlined" type="button" justifyContent="flex-end" >Update Profile</Button>
            </Card>
            <Paper>
                <strong>Email: </strong> {currentUser.email}   
            </Paper>
            </main> 
        </>
    )
}

