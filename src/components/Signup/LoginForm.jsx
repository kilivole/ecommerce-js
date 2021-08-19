import React, { useState } from 'react';
import { Button, Grid, Typography, CssBaseline, Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Commerce from '@chec/commerce.js';

import { commerce } from '../../lib/commerce';
import { useAuth } from '../../contexts/AuthContext'

import useStyles from '../CheckoutForm/Checkout/styles.js'

const LoginForm = () => {
    const classes = useStyles()
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

      const { login } = useAuth()
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)
      const history = useHistory()

      const onSubmit = async (data) => {
        
        try{
            setError('')
            setLoading(true)
            await login(data.email, data.password) 
            history.push("/")
            // commerce.customers.login(data.email, window.location.href).then((token) => console.log(token))
  
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
      }
      
    return (
        <>
        <CssBaseline />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>User Log In Form</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <InputLabel htmlFor="userName">Username</InputLabel> */}
                    <TextField fullWidth label="Email"
                    placeholder="bluebill1049@hotmail.com"
                    type="text"
                    {...register('email', {
                        required: 'this is required',
                        pattern: {
                        value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'Invalid email address',
                        },
                    })}
                    />
                    <br />
                    {errors.email && errors.email.message}
                    <br />
                    {/* <InputLabel htmlFor="password">Password</InputLabel> */}
                    <TextField fullWidth label="Password"
                    type= "password"
                    placeholder="password"
                    {...register('password', {
                        required: 'this is required',
                        minLength: {
                        value: 2,
                        message: 'Min length is 2',
                        
                        },
                    })}
                    />
                    <br />
                    {errors.Password && errors.Password.message}
                    <br />
                    <Typography variant="subtitle1" gutterBottom>
                    <Link to="/forgot-password">Forgot password ?</Link>
                    </Typography>
                    <Grid style={{ width:'100%', display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button disabled={loading} type="submit" variant="contained" color="primary" >LogIn</Button>
                        <Button component={Link} to="/signup" variant="outlined" type="button" justifyContent="flex-end" >Doesnt have account?</Button>
                    </Grid>
                </form>
            </Paper>
        </main>
        </>
    )
}

export default LoginForm;
