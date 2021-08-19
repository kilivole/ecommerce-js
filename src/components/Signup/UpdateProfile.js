import React, { useState } from 'react';
import { Button, Grid, Typography, CssBaseline, Paper, TextField}  from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'


import useStyles from '../CheckoutForm/Checkout/styles.js'

const UpdateProfile = () => {
    const classes = useStyles()
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

      const [error, setError] = useState('')
      const {currentUser, updateEmail, updatePassword} = useAuth()
      const [loading, setLoading] = useState(false)
      const history = useHistory()

      const onSubmit = (data) => {

        if(data.password !== data.confirmPassword) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        if(data.email !== currentUser.email){
            promises.push(updateEmail(data.email))
        }
        if(data.email) {
            promises.push(updatePassword(data.password))
        }

        Promise.all(promises).then(() =>{
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
      }




    return (
        <>
        <CssBaseline />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>Update Profile</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <InputLabel htmlFor="userName">Username</InputLabel> */}
                    <TextField fullWidth label="Username"
                    defaultValue={currentUser.username}
                    {...register('userName', {
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
                    defaultValue={currentUser.email}
                    type="text"
                    {...register('email', {
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
                    placeholder="Leave blank to keep the same"
                    {...register('password', {
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
                    placeholder="Leave blank to keep the same"
                    {...register('confirmPassword', {
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
                        <Button disabled={loading} type="submit" variant="contained" color="primary" >Update</Button>
                        <Button component={Link} to="/" variant="outlined" type="button" justifyContent="flex-end" >Cancel</Button>
                    </Grid>

                </form>

            </Paper>
        </main>
        </>
    )
}

export default UpdateProfile;
