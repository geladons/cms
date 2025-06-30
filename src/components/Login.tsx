
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box, Divider } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [authSettings, setAuthSettings] = useState({
    emailPassword: true,
    google: false,
    apple: false,
    sms: false,
  });
  const [smsData, setSmsData] = useState({
    phoneNumber: '',
    otp: '',
    otpSent: false,
  });

  useEffect(() => {
    const fetchAuthSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings/auth');
        setAuthSettings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAuthSettings();
  }, []);

  const { email, password } = formData;
  const { phoneNumber, otp, otpSent } = smsData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSmsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSmsData({ ...smsData, [e.target.name]: e.target.value });

  const onEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      // Redirect or update UI
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleAppleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/apple';
  };

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/sms/send-otp', { phoneNumber });
      setSmsData({ ...smsData, otpSent: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/sms/verify-otp', { phoneNumber, otp });
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      // Redirect or update UI
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {authSettings.emailPassword && (
          <Box component="form" onSubmit={onEmailSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        )}
        {(authSettings.google || authSettings.apple || authSettings.sms) && <Divider sx={{ width: '100%', my: 2 }}>OR</Divider>}
        {authSettings.google && (
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{ mt: 1 }}
          >
            Sign in with Google
          </Button>
        )}
        {authSettings.apple && (
          <Button
            fullWidth
            variant="outlined"
            onClick={handleAppleLogin}
            sx={{ mt: 1 }}
          >
            Sign in with Apple
          </Button>
        )}
        {authSettings.sms && (
          <Box sx={{ width: '100%', mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="tel"
              value={phoneNumber}
              onChange={onSmsChange}
              disabled={otpSent}
            />
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSendOtp}
              disabled={otpSent}
            >
              Send Code
            </Button>
            {otpSent && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Verification Code"
                  name="otp"
                  value={otp}
                  onChange={onSmsChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyOtp}
                  sx={{ mt: 1 }}
                >
                  Verify & Sign In
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Login;
