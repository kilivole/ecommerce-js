import React, { useState } from 'react';
import { Button, Grid, Typography, CssBaseline, Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext'

import useStyles from '../CheckoutForm/Checkout/styles.js'

const ForgotPassword = () => {
    const classes = useStyles()
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

      const { resetPassword } = useAuth()
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)
      const [message, setMessage] = useState('')

      const onSubmit = async (data) => {
        
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(data.email)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to recover password')
        }
        setLoading(false)
      }

    return (
        <>
        <CssBaseline />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>Recover Password</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}

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
                    <Grid style={{ width:'100%', display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button disabled={loading} type="submit" variant="contained" color="primary" >Submit</Button>
                        <Button component={Link} to="/signup" variant="outlined" type="button" justifyContent="flex-end" >Doesnt have account?</Button>
                    </Grid>
                    <Typography variant="subtitle1" gutterBottom>
                    <Link to="/login">Login</Link>
                    </Typography>
                </form>
            </Paper>
        </main>
        </>
    )
}

export default ForgotPassword;