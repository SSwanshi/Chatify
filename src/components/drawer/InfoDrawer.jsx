import { Drawer, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import Profile from './Profile';

const Header = styled(Box)`
    background: #E2E2B6;
    height: 100px;
    display: flex;
    & > svg, & > p {
        margin-top: auto;
        padding: 15px;
        font-weight: 600;
    }
`;

const Component = styled(Box)`
    background: #301E67;
    height: 100%;
`


const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '31%',
    boxShadow: 'none'
}

const StyledTypo = styled(Typography)`
    color: #000000;
`

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
        >
            <Header>
                <ArrowBack onClick={() => setOpen(false)} sx={{ color: '#000000', '&:hover': { color: '#f0f0f0' } }} />
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