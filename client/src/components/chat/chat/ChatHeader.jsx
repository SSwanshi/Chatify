import { useContext, useState } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { Box, Typography, styled, Menu, MenuItem } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';
import { defaultProfilePicture } from '../../../constants/data';

const Header = styled(Box)`
    height: 44px;
    background: #070F2B;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    color: #ededed;
    border-radius: 11px;
    margin-top: 7px;
    margin-left: 5px;
`;

const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%',
});

const Name = styled(Typography)`
    margin-left: 12px !important;
    color: #ededed;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 22px;
        color: #ededed;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: #ededed;
    margin-left: 12px !important;
`;

const ChatHeader = ({ person }) => {
    const { activeUsers } = useContext(AccountContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleCloseMenu();
        // Refresh the page
        window.location.reload();
    };

    return (
        <Header>
            <Image src={person.picture} alt="display picture" />
            <Box>
                <Name>{person.name}</Name>
                <Status>
                    {activeUsers?.find((user) => user.sub === person.sub)
                        ? 'Online'
                        : 'Offline'}
                </Status>
            </Box>
            <RightContainer>
                <Search />
                <MoreVert onClick={handleMenuClick} />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
            </RightContainer>
        </Header>
    );
};

export default ChatHeader;
