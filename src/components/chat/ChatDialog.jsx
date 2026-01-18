import { Dialog, Box,styled } from "@mui/material";
import Menu from './menu/Menu';
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

const Component = styled(Box)`
    display: flex;
`

const LeftComponent = styled(Box)`
    margin: auto 0;
    min-width : 450px;
`
const RightComponent = styled(Box)`
    width: 75%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0,0,0,0.14)
`

const dialogStyle = {
    height: '95%',
    width: '98%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    backgroundColor: '#2D3250',
    overflow: 'hidden',
  };
const ChatDialog = () => {

    const {person} = useContext(AccountContext);
    return (
        <Dialog
            open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}
            maxWidth='md'
        >
            <Component>
                <LeftComponent>
                    <Menu />
                </LeftComponent>
                <RightComponent>
                    {Object.keys(person).length ? <ChatBox /> : <EmptyChat />} 
                </RightComponent>
            </Component>

        </Dialog>
    )
}

export default ChatDialog;