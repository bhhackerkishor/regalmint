import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import React from 'react';
import { QRCodePng, appStorePng, googlePlayPng, facebookPng, instagramPng, twitterPng, linkedinPng } from '../../assets';
import SendIcon from '@mui/icons-material/Send';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { selectLoggedInUser } from '../auth/AuthSlice';
import { useSelector } from 'react-redux';

export const Footer = () => {
    const theme = useTheme();
    const is700 = useMediaQuery(theme.breakpoints.down(700));
    const loggedInUser = useSelector(selectLoggedInUser);
    
    const labelStyles = {
        fontWeight: 300,
        cursor: 'pointer',
        textDecoration: 'none', // Ensures no default underline
        color: theme.palette.primary.light
    };

    return (
        <Stack
            sx={{
                backgroundColor: theme.palette.primary.main,
                paddingTop: "3rem",
                paddingLeft: is700 ? "1rem" : "3rem",
                paddingRight: is700 ? "1rem" : "3rem",
                paddingBottom: "1.5rem",
                rowGap: "5rem",
                color: theme.palette.primary.light,
                justifyContent: "space-around"
            }}
        >
            {/* Upper */}
            <Stack flexDirection={'row'} rowGap={'1rem'} justifyContent={is700 ? "" : 'space-around'} flexWrap={'wrap'}>
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' fontSize={'1.5rem'}>Exclusive</Typography>
                    <Typography variant='h6'>Subscribe</Typography>
                    <Typography sx={labelStyles}>Get 10% off your first order</Typography>
                    <TextField
                        placeholder='Enter your email'
                        sx={{ border: '1px solid white', borderRadius: "6px" }}
                        InputProps={{
                            endAdornment: <IconButton><SendIcon sx={{ color: theme.palette.primary.light }} /></IconButton>,
                            style: { color: "whitesmoke" }
                        }}
                    />
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Support</Typography>
                    <Typography sx={labelStyles}>Main Road, Marudur, Ariyalur, TamilNadu.</Typography>
                    <Typography sx={labelStyles}>Regalmints@gmail.com</Typography>
                    <Typography sx={labelStyles}>+918015603293</Typography>
                </Stack>

                {/* Account Links */}
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Account</Typography>
                    <Link to="/profile" style={labelStyles}><Typography sx={labelStyles}>My Account</Typography></Link>
                    {!loggedInUser && <Link to="/login" style={labelStyles}><Typography sx={labelStyles}>Login / Register</Typography></Link>}
                    <Link to="/cart" style={labelStyles}><Typography sx={labelStyles}>Cart</Typography></Link>
                    <Link to="/wishlist" style={labelStyles}><Typography sx={labelStyles}>Wishlist</Typography></Link>
                    <Link to="/" style={labelStyles}><Typography sx={labelStyles}>Shop</Typography></Link>
                </Stack>

                {/* Quick Links */}
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Quick Links</Typography>
                    <Link to="/privacy-policy" style={labelStyles}><Typography sx={labelStyles}>Privacy Policy</Typography></Link>
                    <Link to="/terms-conditions" style={labelStyles}><Typography sx={labelStyles}>Terms Of Use</Typography></Link>
                    <Link to="/ShippingDelivery" style={labelStyles}><Typography sx={labelStyles}>ShippingDelivery</Typography></Link>
                    <Link to="/faq" style={labelStyles}><Typography sx={labelStyles}>FAQ</Typography></Link>
                    <Link to="/contact" style={labelStyles}><Typography sx={labelStyles}>Contact</Typography></Link>
                    <Link to="/about-us" style={labelStyles}><Typography sx={labelStyles}>about-us</Typography></Link>
                </Stack>

                {/* Download App */}
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Download App</Typography>
                    <Typography sx={{ ...labelStyles, color: "graytext", fontWeight: 500 }}>
                        Get offers in app for New User Only
                    </Typography>
                    <Stack flexDirection={'row'} columnGap={'.5rem'}>
                        <Box width={'100px'} height={"100px"}>
                            <img src={QRCodePng} height={'100%'} width={'100%'} style={{ objectFit: 'contain' }} alt="QR Code" />
                        </Box>
                        <Stack justifyContent={'space-around'}>
                            <Stack>
                                <img style={{ width: "100%", height: "100%", cursor: "pointer" }} src={googlePlayPng} alt="Google Play" />
                            </Stack>
                            <Stack>
                                <img style={{ width: "100%", height: '100%', cursor: "pointer" }} src={appStorePng} alt="App Store" />
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* Social Links */}
                    <Stack mt={.6} flexDirection={'row'} columnGap={'2rem'}>
                        <MotionConfig whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
                            <Link to="https://www.facebook.com/regalmints" target="_blank">
                                <motion.img style={{ cursor: "pointer" }} src={facebookPng} alt="Facebook" />
                            </Link>
                            <Link to="https://www.twitter.com/regalmints" target="_blank">
                                <motion.img style={{ cursor: "pointer" }} src={twitterPng} alt="Twitter" />
                            </Link>
                            <Link to="https://www.instagram.com/regalmints" target="_blank">
                                <motion.img style={{ cursor: "pointer" }} src={instagramPng} alt="Instagram" />
                            </Link>
                            <Link to="https://www.linkedin.com/regalmints" target="_blank">
                                <motion.img style={{ cursor: "pointer" }} src={linkedinPng} alt="LinkedIn" />
                            </Link>
                        </MotionConfig>
                    </Stack>
                </Stack>
            </Stack>

            {/* Lower */}
            <Stack alignSelf={"center"}>
                <Typography color={'GrayText'}>&copy; RegalMints {new Date().getFullYear()}. All rights reserved</Typography>
            </Stack>
        </Stack>
    );
};
