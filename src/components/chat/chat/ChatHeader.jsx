import { useContext, useState } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { Box, Typography, styled, Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert, FiberManualRecord, ArrowBack } from '@mui/icons-material';

const Header = styled(Box)(({ theme }) => ({
    height: '70px',
    background: '#0f172a',
    display: 'flex',
    padding: '0 24px',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    [theme.breakpoints.down('sm')]: {
        padding: '0 12px'
    }
}));

const Image = styled('img')({
    width: 44,
    height: 44,
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
});

const Name = styled(Typography)`
    margin-left: 16px !important;
    color: #f8fafc;
    font-weight: 600;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    display: flex;
    gap: 8px;
`;

const Status = styled(Box)`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 16px;
`;

const StatusText = styled(Typography)`
    font-size: 12px;
    color: #64748b;
    font-family: 'Inter', sans-serif;
`;

const ChatHeader = ({ person }) => {
    const { activeUsers, setPerson } = useContext(AccountContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const isOnline = activeUsers?.find((user) => user.sub === person.sub);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleCloseMenu();
        window.location.reload();
    };

    return (
        <Header>
            <IconButton
                onClick={() => setPerson({})}
                sx={{
                    color: '#94a3b8',
                    display: { xs: 'block', md: 'none' },
                    mr: 1
                }}
            >
                <ArrowBack />
            </IconButton>
            <Image src={person.picture} alt="display picture" />
            <Box>
                <Name>{person.name}</Name>
                <Status>
                    <FiberManualRecord
                        sx={{
                            fontSize: 10,
                            color: isOnline ? '#10b981' : '#64748b'
                        }}
                    />
                    <StatusText>
                        {isOnline ? 'Active now' : 'Offline'}
                    </StatusText>
                </Status>
            </Box>
            <RightContainer>

                <IconButton
                    onClick={handleMenuClick}
                    sx={{ color: '#94a3b8' }}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        sx: {
                            bgcolor: '#1e293b',
                            color: '#f8fafc',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                        }
                    }}
                >
                    <MenuItem onClick={handleLogout} sx={{ fontSize: 14 }}>Log Out</MenuItem>
                </Menu>
            </RightContainer>
        </Header>
    );
};

export default ChatHeader;


