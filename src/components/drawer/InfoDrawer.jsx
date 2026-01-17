import { Drawer, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import Profile from './Profile';

const Header = styled(Box)`
    background: #0f172a; // Slate 900
    height: 100px;
    display: flex;
    & > svg, & > p {
        margin-top: auto;
        padding: 15px;
        font-weight: 600;
        color: #f1f5f9;
        cursor: pointer;
    }
`;

const Component = styled(Box)`
    background: #0f172a;
    height: 100%;
    overflow-y: auto;
`;

const drawerStyle = {
    left: 0,
    top: 0,
    height: '100%',
    width: '450px', // Match standard sidebar width or close to it
    boxShadow: 'none',
    background: 'transparent' // We handle bg in children
};

const StyledTypo = styled(Typography)`
    color: #f1f5f9;
`;

const InfoDrawer = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
            anchor="left" // Ensure it comes from left
            hideBackdrop={false} // Maybe show backdrop or not, depending on preference. Let's keep it standard.
        >
            <Header>
                <ArrowBack onClick={() => setOpen(false)} />
                <StyledTypo>
                    Profile
                </StyledTypo>
            </Header>
            <Component>
                <Profile />
            </Component>
        </Drawer>
    )
}

export default InfoDrawer;