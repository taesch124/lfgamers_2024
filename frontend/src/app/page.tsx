'use client'
import { useState, useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuth } from 'LFGamers/context/authContext';
import { useRouter } from 'next/navigation';

type User = {
  uuid: number;
  username: string;
  email: string;
  password: string;
  last_login: string;
}

type UserResponse = {
  users: Array<User>;
}

export default function Home() {
  const { push } = useRouter();
  const auth = useAuth();
  console.log(auth);
  if (!auth.isAuthenticated) {
    console.log('Not authenticated, redirecting');
    push('/auth/login');
  }

  const [testData, setTestData ] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request: AxiosRequestConfig = {
          url: 'http://localhost:8000/auth/login',
          method: 'GET',
          data: { username: 'user1', password: 'password1' },
        };

        const res: AxiosResponse<UserResponse, any> = await axios(request);
        if (res.status === 200) {
          console.log(res);
          const users = res.data.users;
          console.log(users);
          setTestData(users);
        } else {
          console.log(`Status ${res.status}, could not find user`);
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
        {testData.map((user: User) => (
          <Grid item key={user.uuid}>
            <Card>
              <Typography variant='h1'>{user.username}</Typography>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
