import {Box} from '@mui/material';
import ChatHeader from './ChatHeader';
import Messeges from './Messeges';
import { useContext, useEffect } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from '../../../service/api';
import { useState } from 'react';

const ChatBox = () => {

    const {person, account} = useContext(AccountContext);

    const [conversation, setConversation] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({senderId:account.sub, receiverId: person.sub})
            setConversation(data);
        }
        getConversationDetails();
    }, [person.sub]);
    return(
        <Box style={{ height: '75%'}}>
            <ChatHeader person={person}/>
            <Messeges person={person} conversation={conversation} />
        </Box>
    )
}

export default ChatBox;