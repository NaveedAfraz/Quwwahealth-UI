import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Switch, FormControlLabel, styled } from '@mui/material';
import { Link } from 'react-router';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import quwwaLogo from '../assets/images/header.png';
import loginBg from '../assets/images/login.png'
// Custom styled switch
const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(18px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#00A99D',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#00A99D',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const GoogleIcon = () => (
    <Box component="svg" sx={{ width: 20, height: 20 }} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24V28H35.303C33.674 32.69 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z" />
        <path fill="#FF3D00" d="M6.306 14.691L12.062 19.238C13.674 14.593 18.334 11 24 11C27.059 11 29.842 12.154 31.961 14.039L37.618 8.382C34.046 5.053 29.268 3 24 3C16.218 3 9.475 8.088 6.306 14.691Z" />
        <path fill="#4CAF50" d="M24 45C35.045 45 44 36.045 44 25C44 23.659 43.862 22.35 43.611 21.083H24V29H35.303C33.674 33.69 29.223 37 24 37C18.334 37 13.674 33.407 12.062 28.762L6.306 33.309C9.475 39.912 16.218 45 24 45Z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24V28H35.303C34.51 30.244 33.021 32.078 31.06 33.309L36.717 38.966C41.139 35.151 44 29.827 44 24C44 22.659 43.862 21.35 43.611 20.083Z" />
    </Box>
);

const QuwwaLogo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component="img" src="./public/Group (1).svg" sx={{ width: 80, height: 80, mx: 1 }} />
        <Box component="img" src="./public/Group.svg" alt="Quwwa Logo" />
    </Box>
);

function Login() {
    return (
        <Box component="main" sx={{ fontFamily: 'sans-serif', bgcolor: '#F2D184', height: '100%' , overflow: 'hidden'}}>
            <Box sx={{
                minHeight: { xs: 'calc(100vh - 4rem)', md: 'calc(100vh - 5rem)' },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                height: '100%'
            }}>
                {/* Left Side: Image Panel - Hidden on small screens */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: { md: '60%', lg: '70%' },
                    height: '100%',
                    overflow: 'hidden',
                    background: 'url(/login.png) no-repeat center center',
                }}>
                    <Box
                        component="img"
                        src={loginBg}
                        alt="Login background"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    // bgcolor: '#1e3a8a',
                    width: { md: '40%', lg: '30%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: { xs: 8, md: 4 },
                    px: 4,
                    minHeight: { xs: 'calc(100vh - 0rem)', md: 'calc(100vh - 12%)' }
                }}>
                    <Box sx={{ width: '90%', height: '100%', backgroundColor: 'amber' }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: { xs: 'flex-start', md: 'flex-start' },
                            mb: 2,
                            backgroundColor: '#F2D184',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 0
                            }}>
                                <Box
                                    component="img"
                                    src={quwwaLogo}
                                    alt="Quwwa Health Logo"
                                    sx={{
                                        height: {
                                            xs: 48,
                                            sm: 40,
                                            md: 40,
                                            lg: 48,
                                            xl: 56
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Typography variant="h4" component="h3" sx={{ fontWeight: '600', color: '#F2937', mb: 1, fontSize: '1.5rem', bgcolor: "#F2D184", textAlign: { md: 'left' } }}>
                            Nice to see you again
                        </Typography>

                        <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
                            {/* Email/Phone Input */}
                            <Box sx={{ mb: 1 }}>
                                <Typography component="label" sx={{ fontWeight: '500', color: 'gray.700', display: 'block', mb: 1 }}>Login</Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    placeholder="Email or phone number"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'white',
                                            '& fieldset': { borderColor: '#D1D5DB' },
                                            '&:hover fieldset': { borderColor: '#9CA3AF' },
                                            '&.Mui-focused fieldset': { borderColor: '#00A99D' },
                                        },
                                    }}
                                />
                            </Box>

                            {/* Password Input */}
                            <Box sx={{ mb: 1 }}>
                                <Typography component="label" sx={{ fontWeight: '500', color: 'gray.700', display: 'block', mb: 1 }}>Password</Typography>
                                <TextField
                                    fullWidth
                                    name="password"
                                    placeholder="Enter password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'white',
                                            '& fieldset': { borderColor: '#D1D5DB' },
                                            '&:hover fieldset': { borderColor: '#9CA3AF' },
                                            '&.Mui-focused fieldset': { borderColor: '#00A99D' },
                                        },
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5, mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PersonOutlineIcon fontSize="small" sx={{ mr: 0.5, color: 'grey.600' }} />
                                    <FormControlLabel
                                        control={
                                            <CustomSwitch
                                                size="small"
                                                sx={{ ml: 1, mr: 1 }}
                                            />
                                        }
                                        label={
                                            <Typography component="span" sx={{ fontSize: '0.875rem', color: 'grey.700' }}>Remember me</Typography>
                                        }
                                        labelPlacement="end"
                                        sx={{ margin: 0, userSelect: 'none' }}
                                    />
                                </Box>
                                <Link href="#" variant="body2" sx={{ color: '#00A99D', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, fontSize: '0.875rem' }}>
                                    Forgot password?
                                </Link>
                            </Box>

                            {/* Sign In Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    backgroundColor: '#54BD95',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#54BD95',
                                        boxShadow: 'none',
                                    }
                                }}
                            >
                                Sign In
                            </Button>

                            {/* Google Sign In Button */}
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                sx={{
                                    py: 1.5,
                                    backgroundColor: '#333333',
                                    color: '#FFFFFF',
                                    borderColor: '#D1D5DB',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                        borderColor: '#9CA3AF'
                                    }
                                }}
                            >
                                Sign in with Google
                            </Button>
                        </Box>

                        {/* Sign Up Link */}
                        <Typography sx={{ color: '#4B5563', mt: 4, textAlign: 'center' }}>
                            Don't have an account?{' '}
                            <Link
                                to="/auth/register"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#00A99D',
                                    textDecoration: 'none',
                                    marginLeft: '4px'
                                }}
                            >
                                Sign up now
                            </Link>
                        </Typography>

                        {/* Footer */}
                        <Typography sx={{ color: '#6B7281', fontSize: '0.875rem', mt: 6, textAlign: 'center' }}>
                            &copy; Quwwa 2023
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
