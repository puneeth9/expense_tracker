import React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import logo from '../assets/centime-logo.png';
import { useTranslation } from 'react-i18next';
import { Toolbar, Typography, Box, MenuItem, Select } from '@mui/material';

const styles = {
    appBarStyles: {
        backgroundColor: '#004953',
        boxShadow: 'none'
    },
    logoStyles: {
        flexGrow: 1
    },
    titleBoxStyles: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    titleStyles: {
        color: 'white',
        fontFamily: 'Sans-serif',
        fontWeight: 'bold'
    },
    languageSelectStyles: {
        color: '#ffffff',
        flexGrow: 1
    },
}

const Header = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('en');
    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
        setLanguage(e.target.value);
    };
    return (
        <AppBar sx={styles.appBarStyles} >
            <Toolbar>
                <Typography variant="h2" sx={styles.logoStyles}>
                    <img src={logo} alt="Centime Logo" />
                </Typography>
                <Box sx={styles.titleBoxStyles}>
                    <Typography variant="h4" sx={styles.titleStyles}>
                        {t('title')}
                    </Typography>
                </Box>
                <Box>
                    <Select
                        value={language}
                        onChange={handleLanguageChange}
                        sx={styles.languageSelectStyles}
                        displayEmpty
                        disableUnderline={true}
                        variant='standard'
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="fr">Français</MenuItem>
                    </Select>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
