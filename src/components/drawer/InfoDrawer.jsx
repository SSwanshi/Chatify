import { Drawer, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import Profile from './Profile';

const Header = styled(Box)`
    background: #0f172a;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    gap: 16px;
`;

const Component = styled(Box)`
    background: #0f172a;
    height: 100%;
`;

const StyledTypo = styled(Typography)`
    color: #f8fafc;
    font-weight: 600;
    font-size: 18px;
    font-family: 'Outfit', sans-serif;
`;

const drawerStyle = {
    left: 0,
    top: 0,
    height: '100%',
    width: '400px', // Matches LeftComponent width
    boxShadow: 'none',
    backgroundColor: '#0f172a',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
};

const InfoDrawer = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
            variant="persistent"
        >
            <Header>
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{ color: '#f8fafc', '&:hover': { background: 'rgba(255, 255, 255, 0.05)' } }}
                >
                    <ArrowBack />
                </IconButton>
                <StyledTypo>
                    Profile
                </StyledTypo>
            </Header>
            <Component>
                <Profile />
            </Component>
        </Drawer>
    );
};

export default InfoDrawer;
