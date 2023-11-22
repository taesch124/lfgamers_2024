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
import axios, { AxiosRequestConfig } from 'axios';
import { FormValues } from './types';

export default function Login() {
    const { push } = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        const request: AxiosRequestConfig = {
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_NODE_API_BASE_URL}/auth/register`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        const res = await axios(request);

        if (res.status === 200) {
            console.log('Success', res.data);
            return;
        }

        console.error(`Error status ${res.status}`);
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
                        <Typography variant='h2'>Register</Typography>
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
                                        name='email'
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                placeholder='Email'
                                                type='email'
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
                                    <Controller
                                        control={control}
                                        name='confirmPassword'
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                placeholder='Confirm Password'
                                                type='password'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors.confirmPassword && <Typography variant='body2'>{errors.confirmPassword.message}</Typography>}
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
                                        title='Login'
                                        onClick={() => push('/auth/login')}
                                    >
                                        Login
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