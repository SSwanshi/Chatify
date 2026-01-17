import { Box, styled } from '@mui/material';
import LoginDialog from './account/LoginDialog';
import ChatDialog from './chat/ChatDialog';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';

const Component = styled(Box)`
    height: 100vh;
    background-color: transparent; // Let body background show through
`;

const Messenger = () => {
    const { account } = useContext(AccountContext);

    return (
        <Component>
            {account ? <ChatDialog /> : <LoginDialog />}
        </Component>
    );
};

export default Messenger;
