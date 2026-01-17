import { Box, styled } from "@mui/material";
import Menu from './menu/Menu';
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

const MainContainer = styled(Box)`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: transparent; // Background comes from body/Messenger
`;

const LeftPane = styled(Box)`
    min-width: 400px;
    max-width: 450px;
    height: 100%;
    background: rgba(15, 23, 42, 0.8); // Darker shade for sidebar
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;

    @media (max-width: 900px) {
        min-width: 320px;
    }
`;

const RightPane = styled(Box)`
    flex: 1;
    height: 100%;
    background: rgba(30, 41, 59, 0.3); // Lighter shade for chat area
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
`;

const ChatDialog = () => {
    const { person } = useContext(AccountContext);

    return (
        <MainContainer>
            <LeftPane>
                <Menu />
            </LeftPane>
            <RightPane>
                {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
            </RightPane>
        </MainContainer>
    )
}

export default ChatDialog;