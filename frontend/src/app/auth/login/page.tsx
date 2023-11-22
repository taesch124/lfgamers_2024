'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from './types';

export default function Login() {
    const { push } = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <Grid
            container
            spacing={4}
            justifyContent='center'
            alignItems='center'
            height={'100%'}
        >
            <Paper>
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    spacing={2}
                >
                    <Grid item>
                        <Typography variant='h2'>Login</Typography>
                    </Grid>
                    <Grid item>
                        <form>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                                spacing={2}
                            >
                                <Grid item>
                                    <Controller
                                        control={control}
                                        name='username'
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                placeholder='Username'
                                                type='text'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )}

                                    />
                                    {errors.username && <Typography variant='body2'>{errors.username.message}</Typography>}
                                </Grid>
                                <Grid item>
                                    <Controller
                                        control={control}
                                        name='password'
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                placeholder='Password'
                                                type='password'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.password && <Typography variant='body2'>{errors.password.message}</Typography>}
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant='text'
                                        title='Submit'
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant='text'
                                        title='Register'
                                        onClick={() => push('/auth/register')}
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};