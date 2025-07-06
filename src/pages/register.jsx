import React from 'react';
import { TextField, Button, Box, Typography, Link, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import quwwaLogo from '../assets/images/header.png';
import { useNavigate } from 'react-router';
// Google G icon SVG
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24V28H35.303C33.674 32.69 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z" />
        <path fill="#FF3D00" d="M6.306 14.691L12.062 19.238C13.674 14.593 18.334 11 24 11C27.059 11 29.842 12.154 31.961 14.039L37.618 8.382C34.046 5.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z" />
        <path fill="#4CAF50" d="M24 45C35.045 45 44 36.045 44 25C44 23.659 43.862 22.35 43.611 21.083H24V29H35.303C33.674 33.69 29.223 37 24 37C18.334 37 13.674 33.407 12.062 28.762L6.306 33.309C9.475 39.912 16.218 45 24 45Z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24V28H35.303C34.51 30.244 33.021 32.078 31.06 33.309L36.717 38.966C41.139 35.151 44 29.827 44 24C44 22.659 43.862 21.35 43.611 20.083Z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1DA1F2" d="M43.611 20.083H42V20H24V28H35.303C33.674 32.69 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z" />
    </svg>
);

const QuwwaLogo = () => (
    <div className="flex items-center justify-center">
        <img src="./public/Group (1).svg" className="w-20 h-20 mx-2" />
        <img src="./public/Group.svg" alt="Quwwa Logo" />
    </div>
);

function Register() {
    const [checked, setChecked] = React.useState(true);
    const navigate = useNavigate();
    return (
        <div className="bg-white font-sans">
            {/* <div className='md:block sm:hidden xs:hidden'>
                <nav className="w-full flex justify-center py-3">
                    <QuwwaLogo />
                </nav>  
            </div> */}
            <main className="min-h-[calc(100vh-80px)]   md:flex md:justify-center sm:flex sm:justify-start">
                {/* Left Side: Branding Panel */}
                <div className="w-full hidden md:block sm:block md:w-1/2 sm:w-1/2 bg-[#F2D184]  flex-col  md:items-start text-center md:text-left">
                    <Box className="w-full  bg-[#F2D184]">
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', mb: 1, width: '100%', pl: '0%', marginTop: '10%' }}>
                            <div className="flex items-center  mb-6 ml-10">
                                <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-10 sm:h-12 md:h-16 lg:h-15 xl:h-20" />
                            </div>

                            <Typography component="h1" sx={{ ml: 5, fontSize: '2rem', fontWeight: 'bold', color: '#866118', mb: 4 }}>
                                Building healthier futures together!
                            </Typography>
                        </Box>
                        <img
                            src='/d7699b9ac2b8af917bb156b67220e266c8fb9dd6.png'
                            alt="Children running joyfully"
                            className="w-full rounded-lg h-[400px]  object-cover"
                        />
                        <Typography sx={{ color: '#6B7281', fontSize: '0.875rem', mt: 'auto', pt: 4, textAlign: 'center' }}>
                            © Alpro 2025
                        </Typography>
                    </Box>
                </div>

                {/* Right Side: Sign-up Form Panel */}
                <div className="w-full md:w-2/3 sm:w-1/2 flex items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-md">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', flexDirection: 'column', mb: 4, width: '100%', pl: '10%', marginTop: '10%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}><span>Already a member? </span> <span onClick={() => navigate("/auth/login")} className="text-blue-600 cursor-pointer">Sign in</span></Box>
                        </Box>
                        <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937', mb: 3 }}>
                            Sign up
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<GoogleIcon />}
                                sx={{
                                    py: 1.25, backgroundColor: '#4285F4', color: 'white',
                                    borderRadius: '8px', textTransform: 'none', fontSize: '1rem',
                                    boxShadow: 'none', '&:hover': { backgroundColor: '#3367D6' }
                                }}
                            >
                                Sign up with Google
                            </Button>
                            <IconButton sx={{ border: '1px solid #D1D5DB', borderRadius: '8px', color: '#1DA1F2' }}>
                                <TwitterIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                            <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                            <Typography sx={{ mx: 2, color: '#6B7281' }}>Or</Typography>
                            <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                        </Box>

                        <Box component="form" noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-1">
                                <div>
                                    <Typography component="label" htmlFor="school-name" sx={{ fontWeight: 'bold', color: '#111827', fontSize: '0.75rem', display: 'block', mb: 0.5 }}>School Name</Typography>
                                    <TextField
                                        size="small"
                                        id="school-name"
                                        variant="filled"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                borderRadius: '6px',
                                                backgroundColor: '#F3F4F6',
                                                '& .MuiInputBase-input': {
                                                    py: '8px',
                                                    px: '12px',
                                                    fontSize: '0.875rem'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography component="label" htmlFor="user-id" sx={{ fontWeight: 'bold', color: '#111827', fontSize: '0.75rem', display: 'block', mb: 0.5 }}>User ID</Typography>
                                    <TextField
                                        size="small"
                                        id="user-id"
                                        variant="filled"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                borderRadius: '6px',
                                                backgroundColor: '#F3F4F6',
                                                '& .MuiInputBase-input': {
                                                    py: '8px',
                                                    px: '12px',
                                                    fontSize: '0.875rem'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography component="label" htmlFor="district" sx={{ fontWeight: 'bold', color: '#111827', fontSize: '0.75rem', display: 'block', mb: 0.5 }}>District</Typography>
                                    <TextField
                                        size="small"
                                        id="district"
                                        variant="filled"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                borderRadius: '6px',
                                                backgroundColor: '#F3F4F6',
                                                '& .MuiInputBase-input': {
                                                    py: '8px',
                                                    px: '12px',
                                                    fontSize: '0.875rem'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography component="label" htmlFor="state" sx={{ fontWeight: 'bold', color: '#111827', fontSize: '0.75rem', display: 'block', mb: 0.5 }}>State</Typography>
                                    <TextField
                                        size="small"
                                        id="state"
                                        variant="filled"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                borderRadius: '6px',
                                                backgroundColor: '#F3F4F6',
                                                '& .MuiInputBase-input': {
                                                    py: '8px',
                                                    px: '12px',
                                                    fontSize: '0.875rem'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Typography component="label" htmlFor="country" sx={{ fontWeight: 'bold', color: '#111827', fontSize: '0.75rem', display: 'block', mb: 0.5 }}>Country</Typography>
                                    <TextField
                                        size="small"
                                        id="country"
                                        variant="filled"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                borderRadius: '6px',
                                                backgroundColor: '#F3F4F6',
                                                '& .MuiInputBase-input': {
                                                    py: '8px',
                                                    px: '12px',
                                                    fontSize: '0.875rem'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Typography component="label" htmlFor="password" sx={{ fontWeight: 'bold', color: '#111827', fontSize: '0.75rem', display: 'block', mb: 0.5 }}>Password</Typography>
                                    <TextField
                                        size="small"
                                        id="password"
                                        type="password"
                                        helperText="6+ characters"
                                        variant="filled"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                borderRadius: '6px',
                                                backgroundColor: '#F3F4F6',
                                                '& .MuiInputBase-input': {
                                                    py: '8px',
                                                    px: '12px',
                                                    fontSize: '0.875rem'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" sx={{ color: '#9CA3AF', '&.Mui-checked': { color: '#EC4899' } }} />}
                                label={
                                    <Typography sx={{ fontSize: '0.875rem', color: '#4B5563' }}>
                                        Creating an account means you're okay with our{' '}
                                        <Link href="#" sx={{ color: '#EC4899' }}>Terms of Service</Link>,{' '}
                                        <Link href="#" sx={{ color: '#EC4899' }}>Privacy Policy</Link>, and our default{' '}
                                        <Link href="#" sx={{ color: '#EC4899' }}>Notification Settings</Link>.
                                    </Typography>
                                }
                                sx={{ mt: 2, alignItems: 'flex-start' }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 2, py: 1.5, backgroundColor: '#EC4899',
                                    borderRadius: '8px', textTransform: 'none', fontSize: '1rem',
                                    boxShadow: 'none', '&:hover': { backgroundColor: '#DB2777' }
                                }}
                            >
                                Create Account
                            </Button>
                            <Typography sx={{ color: '#6B7281', fontSize: '0.75rem', textAlign: 'center' }}>
                                This site is protected by reCAPTCHA and the Google <br />
                                <Link href="#" sx={{ color: '#00A99D' }}>Privacy Policy</Link> and{' '}
                                <Link href="#" sx={{ color: '#00A99D' }}>Terms of Service</Link> apply.
                            </Typography>
                        </Box>
                    </div>
                </div>
            </main >
        </div >
    );
}

export default Register;
