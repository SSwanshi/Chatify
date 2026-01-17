import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/system';

const MenuOption = styled(MenuItem)`
    font-size: 14px;
    padding: 15px 60px 5px 34px;
    color: #f1f5f9;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
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
                PaperProps={{
                    sx: {
                        marginTop: 1, // slight offset
                        backgroundColor: '#1e293b', // Slate 800
                        color: 'white',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                    }
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
