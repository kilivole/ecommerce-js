import React, { useState } from 'react';
import { Button, Grid, Typography, CssBaseline, Paper, TextField}  from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'


import useStyles from '../CheckoutForm/Checkout/styles.js'

const RegisterForm = () => {
    const classes = useStyles()
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

      const { signup } = useAuth()
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)
      const history = useHistory()

      const onSubmit = async (data) => {

        console.log(data.password);
        if(data.password !== data.confirmPassword) {
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            await signup(data.email, data.password)
            history.push("/")
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
      }




    return (
        <>
        <CssBaseline />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>Registration Form</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <InputLabel htmlFor="userName">Username</InputLabel> */}
                    <TextField fullWidth label="Username"
                    placeholder="Bill"
                    {...register('userName', {
                        required: 'this is a required',
                        minLength: {
                        value: 2,
                        message: 'Min length is 2',
                        },
                    })}
                    />
                    <br />
                    {errors.userName && errors.userName.message}
                    <br />
                    {/* <InputLabel htmlFor="email">Email</InputLabel> */}
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
                        value: 4,
                        message: 'Min length is 4',
                        
                        },
                    })}
                    />
                    <br />
                    {errors.password && errors.password.message}
                    <br />
                    {/* <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel> */}
                    <TextField fullWidth label="Confirm Password"
                    type= "password"
                    placeholder="Confirm Password"
                    {...register('confirmPassword', {
                        required: 'this is required',
                        minLength: {
                        value: 4,
                        message: 'Min length is 4',
                        
                        },
                    })}
                    />
                    <br />
                    {errors.confirmPassword && errors.confirmPassword.message}
                    <br />
                    <Grid style={{ width:'100%', display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button disabled={loading} type="submit" variant="contained" color="primary" >Submit</Button>
                        <Button component={Link} to="/login" variant="outlined" type="button" justifyContent="flex-end" >Already got an account?</Button>
                    </Grid>

                </form>
                
                    {/* <form onSubmit={""}>
                        <Grid container spacing={6}>
                            <FormInput required name='firstName' label='First name' />
                            <FormInput required name='email' label='Email' />
                            <FormInput required type="password" name='password' label='Password' />                    
                        </Grid>

                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button component={Link} to=" " variant="outlined">Already got a account?</Button>
                                        <Button type="submit" variant="contained" color="primary"> Sign Up</Button>
                            </div>      
                    </form> */}
            </Paper>
        </main>
        </>
    )
}

export default RegisterForm;
