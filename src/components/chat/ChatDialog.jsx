import { Dialog, Box, styled } from "@mui/material";
import Menu from './menu/Menu';
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

const Component = styled(Box)`
    display: flex;
    height: 100vh;
    background: #0f172a;
    overflow: hidden;
`;

const LeftComponent = styled(Box)(({ theme, person }) => ({
    minWidth: '400px',
    height: '100%',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    background: '#0f172a',
    display: 'block',
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        display: person && Object.keys(person).length ? 'none' : 'block'
    }
}));

const RightComponent = styled(Box)(({ theme, person }) => ({
    flex: 1,
    height: '100%',
    background: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
        display: person && Object.keys(person).length ? 'flex' : 'none'
    }
}));

const dialogStyle = {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    backgroundColor: '#0f172a',
    overflow: 'hidden',
    borderRadius: 0,
};

const ChatDialog = () => {
    const { person } = useContext(AccountContext);

    return (
        <Dialog
            open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}
            maxWidth={'xl'}
            fullScreen
        >
            <Component>
                <LeftComponent person={person}>
                    <Menu />
                </LeftComponent>
                <RightComponent person={person}>
                    {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
                </RightComponent>
            </Component>
        </Dialog>
    );
}


export default ChatDialog;
