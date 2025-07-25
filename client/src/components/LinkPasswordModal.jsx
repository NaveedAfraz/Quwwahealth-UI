import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';
import { config } from '../config/config';
import { useNavigate } from 'react-router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export default function LinkPasswordModal({ open, onClose, userEmail, onLinked }) {
  const { setLinkingPassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(userEmail);
  const handleClose = () => {
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
    setLinkingPassword(false); // Signal that the linking process is over
    onClose();
  };

  const handleLink = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // First, sign in with email/password
      // const { signInWithEmailAndPassword } = await import('firebase/auth');
      // await signInWithEmailAndPassword(auth, userEmail, password);
      // // If there is a pending Google credential, link it now
      // if (window.pendingGoogleCredential) {
      //   await linkWithCredential(auth.currentUser, window.pendingGoogleCredential);
      //   window.pendingGoogleCredential = null;
      //   setSuccess('Google account linked! You can now login with Google or email/password.');
      const addPassword = await axios.post(`${config.API_BASE_URL}/reset-password`, { email: userEmail, newPassword: password }, { withCredentials: true });
      console.log(addPassword);


      // setSuccess('Password linked successfully!');
      if (addPassword.data.success === true) {
        setPassword('');
        setConfirmPassword('');
        if (onLinked) onLinked();
        setTimeout(() => {
          setSuccess('');
          navigate('/');
          handleClose();
        }, 1200);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="link-password-modal-title">
      <Box sx={style} component="form" onSubmit={handleLink}>
        <Typography id="link-password-modal-title" variant="h6" fontWeight={600} mb={1}>
          Set a Password for Email Login
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your account is signed in with Google. Set a password to also enable email/password login for <b>{userEmail}</b>.
        </Typography>
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          required
          disabled={loading}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          margin="normal"
          required
          disabled={loading}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Link Password'}
        </Button>
      </Box>
    </Modal>
  );
}
