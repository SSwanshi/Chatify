import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/system';

const MenuOption = styled(MenuItem)`
    font-size: 14px;
    padding: 15px 60px 5px 34px;
    color: #4A4A4A;
    &:hover {
        background-color: #f0f0f0;
        color: #4A4A4A;  
    }
`;

const HeaderMenu = ({ setOpenDrawer }) => {
    const [open, setOpen] = useState(null);

    const handleClose = () => {
        setOpen(null);
    };

    const handleClick = (e) => {
        setOpen(e.currentTarget);  
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        sessionStorage.removeItem('userData'); 

        handleClose(); 
        window.location.reload(); 
    };

    return (
        <>
            <IconButton onClick={handleClick} sx={{ padding: 0 }}>
                <MoreVert sx={{ color: '#fff', '&:hover': { color: '#f0f0f0' } }} />  
            </IconButton>
            <Menu
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={() => { handleClose(); setOpenDrawer(true); }}>
                    Profile
                </MenuOption>
                <MenuOption onClick={handleLogout}>
                    Log Out
                </MenuOption>
            </Menu>
        </>
    );
};

export default HeaderMenu;
