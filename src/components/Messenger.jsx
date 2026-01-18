import { AppBar, Toolbar, styled, Box } from '@mui/material';
import LoginDialog from './account/LoginDialog';
import ChatDialog from './chat/ChatDialog';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';

const Component = styled(Box)`
    height: 100vh;
    background: #0f172a;
`;


const Header = styled(AppBar)`
    height: 120px;
    background-color: #0B0C10;
    box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
    height: 220px;
    background-color: #001F3F;
    box-shadow: none;
`;

const Messenger = () => {

    const { account } = useContext(AccountContext);
    return (
        <Component>
            {
                account ?
                    <ChatDialog />
                    :

                    <>
                        <LoginHeader>
                            <Toolbar>

                            </Toolbar>
                        </LoginHeader>
                        <LoginDialog />
                    </>
            }

        </Component>
    );
};

export default Messenger;
