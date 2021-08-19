import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Button, InputAdornment } from '@material-ui/core';
import { ShoppingCart,  AccountCircle, ExitToApp } from '@material-ui/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


import logo from '../../assets/commerce.png';
import useStyles from './styles';

const Navbar = ({ totalItems}) => {
    const classes= useStyles();
    const location = useLocation();

    const [error, setError] = useState("");
    const { currentUser} = useAuth();
    const { logout } = useAuth();
    const history = useHistory();

  const handleLogout = async () =>  {
        setError('')
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }


    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                        Commerce.js
                    </Typography>
                    <div className={classes.grow}/> 
                        {currentUser === null ? (
                    <Button component={Link} to="/signup" className={classes.navlink} color="primary">
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                        Sign Up
                    </Button> 
                    ) : ( 
                        <>
                            <Button component={Link} to="/profile" color="inherit" className={classes.menuItem}>Profile</Button>
                            <Button variant="contained" color="primary" onClick={handleLogout} >
                            <InputAdornment position="start">
                            <ExitToApp />
                            </InputAdornment>
                            Log Out
                            </Button>                             
                        </>
                       
                    )}
                    {location.pathname === '/' && (       
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>)} 
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
